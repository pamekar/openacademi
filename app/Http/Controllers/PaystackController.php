<?php

namespace App\Http\Controllers;

use App\Course;
use App\Payment;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PaystackController extends Controller
{
    //
    public function calcTransactionCharge($amount)
    {

        $waiver = 100;
        $siteCommision = 0;
        $gatewayCommission = 1;

        for (
            $charge = 0.015; $siteCommision < $gatewayCommission;
            $charge += 0.0000005
        ) {
            if ($amount < 2500) {
                $siteCommision = $amount * $charge;
                $gatewayCommission = ($siteCommision + $amount) * 0.015;
            } else {
                $siteCommision = $amount * $charge + $waiver;
                $gatewayCommission = ($siteCommision + $amount) * 0.015
                    + $waiver;
            }
            if ($siteCommision > 2500) {
                $siteCommision = 2500;
                break;
            }
        }

        return $siteCommision;
    }

    public function initializePayment($slug)
    {
        $result = array();

        $client = new Client();

        $isCourse = Course::where('slug', $slug)->first();

        if ($isCourse) {
            if (!$this->isDoublePayment($isCourse->id)) {
                $data = session('userData');
                $email = Auth::user()->email ?: "null@null.null";
                $amount = $isCourse->price * 100;
                $charge = $this->calcTransactionCharge($amount);
                $reference = md5(Auth::user()->name . $isCourse->slug
                    . date('YmdHis') . str_random());
                $metadata = [
                    'user'   => Auth::user()->id,
                    'amount' => $amount,
                    'charge' => $charge,
                    'course' => $isCourse->id,
                    'slug'   => $slug
                ];

                $postdata = [
                    'first_name'   => Auth::user()->first_name,
                    'last_name'    => Auth::user()->last_name,
                    'email'        => $email,
                    'amount'       => $amount + $charge,
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
        }

        return redirect()->back();
    }

    public function isDoublePayment($course)
    {
        $payment = is_array($course)
            ? Payment::where('user_id', Auth::user()->name)
                ->whereIn('course_id', $course)
                ->first()
            : Payment::where('user_id', Auth::user()->name)
                ->where('course_id', $course)
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

        $course_slug = '';

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
                        $amount = $result['data']['metadata']['amount'];
                        $charge = $result['data']['metadata']['charge'];
                        $user = $result['data']['metadata']['user'];
                        $course = $result['data']['metadata']['course'];
                        $course_slug = $result['data']['metadata']['slug'];

                        DB::table('payments')->insert([
                            'reference' => $reference,
                            'user_id'   => $user,
                            'course_id' => $course,
                            'amount'    => $amount,
                            'charge'    => $charge,
                            'status'    => 'successful'
                        ]);
                        $courseTransaction = new CoursesController();
                        $courseTransaction->payment($course);
                    }
                    $status = [
                        'type'    => 'success',
                        'message' => 'Your payment has been processed successfully'
                    ];

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

        return redirect("/user#/course/$course_slug")->with('notification',
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
