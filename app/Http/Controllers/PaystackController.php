<?php

namespace App\Http\Controllers;

use App\Invoice_line;
use App\Payment;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PaystackController extends Controller
{
    //
    public function initializePayment(Request $request)
    {
        $result = array();

        $client = new Client();
        $invoice = session('invoice');

        if (!$this->isDoublePayment($invoice->invoices)) {
            $data = session('userData');
            $email = Auth::user()->email ?: "null@null.null";
            $reference = md5(Auth::user()->name . date('YmdHis')
                . str_random());
            $metadata = [
                'student'  => $invoice->student,
                'amount'   => $invoice->amount,
                'charge'   => $invoice->charge,
                'invoices' => $invoice->invoices
            ];

            $postdata = [
                'first_name'   => $data->user_meta->first_name,
                'last_name'    => $data->user_meta->last_name,
                'email'        => $email,
                'amount'       => $invoice->amount + $invoice->charge,
                "reference"    => $reference,
                "callback_url" => url(config('paystack.callbackUrl')),
                "metadata"     => (object)$metadata
            ];

            $url = config('paystack.paymentUrl') . "transaction/initialize";

            $headers = [
                'Authorization' => 'Bearer ' . config('paystack.secretKey'),
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json'
            ];

            $result = $client->post($url, [
                'body'    => json_encode($postdata),
                'headers' => $headers,
            ]);

            $response = json_decode($result->getBody(), true);
            $authorization_url = $response['data']['authorization_url'];

            return redirect($authorization_url);
        }

        $status = [
            'type'    => 'danger',
            'message' => "Oops! We couldn't initiate a payment. We detected that a payment has already been made."
        ];
        $request->session()->flash('notification', (object)$status);
        return redirect()->back();
    }

    public function isDoublePayment($invoices)
    {
        $payment = is_array($invoices)
            ? Payment::where('user_id', Auth::user()->name)
                ->whereIn('invoice_id', $invoices)
                ->first()
            : Payment::where('user_id', Auth::user()->name)
                ->where('invoice_id', $invoices)
                ->first();

        return $payment;
    }

    public function verifyPayment(Request $request)
    {
        $status = [];

        $client = new Client();
//The parameter after verify/ is the transaction reference to be verified
        $reference = $request->reference;
        $url = config('paystack.paymentUrl') . "transaction/verify/$reference";


        $headers = [
            'Authorization' => 'Bearer ' . config('paystack.secretKey'),
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json'
        ];

        $response = $client->get($url, [
            'headers' => $headers,
        ]);

        if ($response) {
            $result = json_decode($response->getBody(), true);

            if ($result) {
                if ($result['data']) {
                    //something came in
                    if ($result['data']['status'] == 'success') {
                        $invoices = $result['data']['metadata']['invoices'];
                        $amount = $result['data']['metadata']['amount'];
                        $charge = $result['data']['metadata']['charge'];
                        $student = $result['data']['metadata']['student'];

                        if (!$this->isDoublePayment($invoices)) {
                            $total = $this->totalInvoice($invoices);
                            if ($total == $amount / 100) {
                                foreach ($invoices as $invoice) {
                                    DB::table('payments')->insert([
                                        'payment_id' => $reference,
                                        'invoice_id' => $invoice,
                                        'user_id'    => $student,
                                        'gateway'    => 'paystack',
                                        'amount'     => $this->totalInvoice($invoice)
                                            * 100,
                                        'status'     => 'successful'
                                    ]);
                                }
                                $status = [
                                    'type'    => 'success',
                                    'message' => 'Your payment has been processed successfully'
                                ];
                            }
                        } else {
                            $status = [
                                'type'    => 'danger',
                                'message' => "Oops! We couldn't initiate a payment. We detected that a payment has already been made."
                            ];
                        }

                    } else {
                        // the transaction was not successful, do not deliver value'
                        // print_r($result);  //uncomment this line to inspect the result, to check why it failed.
                        $status = [
                            'type'    => 'success',
                            'message' => "Transaction was not successful: Last gateway response was: "
                                . $result['data']['gateway_response']
                        ];
                    }
                } else {
                    $status = [
                        'type'    => 'success',
                        'message' => $result['message']
                    ];

                }

            } else {
                //print_r($result);
                die("Something went wrong while trying to convert the request variable to json. Uncomment the print_r command to see what is in the result variable.");
            }
        } else {
            //var_dump($request);
            die("Something went wrong while executing curl. Uncomment the var_dump line above this line to see what the issue is. Please check your CURL command to make sure everything is ok");
        }

        $redirectUrl = Auth::user()->user_type == 'undergraduate'
            ? 'undergraduate/fees/history' : 'home';
        return redirect($redirectUrl)->with('notification',
            (object)$status);
    }
    function totalInvoice($invoices)
    {
        $invoiceLines = is_array($invoices)
            ? Invoice_line::whereIn('invoice_id',
                $invoices)->get()
            : Invoice_line::where('invoice_id',
                $invoices)->get();
        $total = 0;

        foreach ($invoiceLines as $line) {
            $total += $line->amount * $line->quantity;
        }
        return $total / 100;

    }
}
