@extends('layouts.home')

@section('main')

    <div class="pagetop">
        <img src="{{asset("$public/jpg/pagetop.jpg")}}" alt=""/>
        <div class="pagetop-inner">
            <div class="container">
                <h1>FAQ'S Page</h1>
                <ul class="breadcrumbs">
                    <li><a href="#" title=""><i class="fa fa-home"></i> Home</a></li>
                    <li>FAQ'S</li>
                </ul>
            </div>
        </div>
    </div><!-- PageTop -->



    <section>
        <div class="block gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="filter-faq">
                            <div class="row">
                                <div class="col-md-6">
                                    <h2>Hey there, how can we help?</h2>
                                    <p>Now you can have your own support center without paying monthly fees.</p>
                                </div>
                                <div class="col-md-6">
                                    <form class="edu-search">
                                        <input type="text" placeholder="Enter Your Keyword"/>
                                        <button><i class="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div><!-- Filter FAQ -->
                    </div>

                    <div class="col-md-8 col-md-offset-2">
                        <div class="edu-accordion toggle">
                            <div class="toggle-item">
                                <h2>How Do I Back Up My Database?</h2>
                                <div class="content">
                                    <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut lab ore et dolore
                                        magna aliquyam erat, sed diam Demo Label. Avero eos et accusam et justo duo
                                        dolores. At vero eos et accusam et justo duodolores et ea rebum. Lorem ipsum
                                        dolor sit amet conse ctuere colorado secrets Resorts & Spas offer adults. Fusce
                                        ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare
                                        vel sed velit.</p>
                                </div>
                            </div><!-- Toggle Item -->
                            <div class="toggle-item">
                                <h2>Predefined 20 color skins, many custom skin possibilities?</h2>
                                <div class="content">
                                    <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut lab ore et dolore
                                        magna aliquyam erat, sed diam Demo Label. Avero eos et accusam et justo duo
                                        dolores. At vero eos et accusam et justo duodolores et ea rebum. Lorem ipsum
                                        dolor sit amet conse ctuere colorado secrets Resorts & Spas offer adults. Fusce
                                        ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare
                                        vel sed velit.</p>
                                </div>
                            </div><!-- Toggle Item -->
                            <div class="toggle-item">
                                <h2>Live Search with many possibilities?</h2>
                                <div class="content">
                                    <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut lab ore et dolore
                                        magna aliquyam erat, sed diam Demo Label. Avero eos et accusam et justo duo
                                        dolores. At vero eos et accusam et justo duodolores et ea rebum. Lorem ipsum
                                        dolor sit amet conse ctuere colorado secrets Resorts & Spas offer adults. Fusce
                                        ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare
                                        vel sed velit.</p>
                                </div>
                            </div><!-- Toggle Item -->
                            <div class="toggle-item">
                                <h2>KnowledgeBase article custom post included?</h2>
                                <div class="content">
                                    <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut lab ore et dolore
                                        magna aliquyam erat, sed diam Demo Label. Avero eos et accusam et justo duo
                                        dolores. At vero eos et accusam et justo duodolores et ea rebum. Lorem ipsum
                                        dolor sit amet conse ctuere colorado secrets Resorts & Spas offer adults. Fusce
                                        ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare
                                        vel sed velit.</p>
                                </div>
                            </div><!-- Toggle Item -->
                            <div class="toggle-item">
                                <h2>BBPress forum & BuddyPress community plugins?</h2>
                                <div class="content">
                                    <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut lab ore et dolore
                                        magna aliquyam erat, sed diam Demo Label. Avero eos et accusam et justo duo
                                        dolores. At vero eos et accusam et justo duodolores et ea rebum. Lorem ipsum
                                        dolor sit amet conse ctuere colorado secrets Resorts & Spas offer adults. Fusce
                                        ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare
                                        vel sed velit.</p>
                                </div>
                            </div><!-- Toggle Item -->
                            <div class="toggle-item">
                                <h2>kBase articles statistics (views & Like, Dislike count)?</h2>
                                <div class="content">
                                    <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut lab ore et dolore
                                        magna aliquyam erat, sed diam Demo Label. Avero eos et accusam et justo duo
                                        dolores. At vero eos et accusam et justo duodolores et ea rebum. Lorem ipsum
                                        dolor sit amet conse ctuere colorado secrets Resorts & Spas offer adults. Fusce
                                        ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare
                                        vel sed velit.</p>
                                </div>
                            </div><!-- Toggle Item -->
                        </div><!-- Provide Accordion -->
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block blackish">
            <div class="fixed-bg bg6"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-5">
                        <div class="simple-mockup"><img src="png/mockup.png" alt=""/></div><!-- Simple Mockup -->
                    </div>

                    <div class="col-md-7">
                        <div class="simple-parallax-title">
                            <h2>Contact <span>Us</span></h2>
                            <p>If you Have Any Question Contact us.</p>
                        </div>
                        <form class="contact-form">
                            <div class="row">
                                <div class="col-md-6">
                                    <input placeholder="Full Name" type="text">
                                    <input placeholder="Email Address" type="email">
                                    <input placeholder="Subject" type="text">
                                </div>
                                <div class="col-md-6"><textarea placeholder="Detail"></textarea></div>
                                <div class="col-md-12">
                                    <button class="full-btn button style2 active">Send Message</button>
                                </div>
                            </div>
                        </form><!-- Contact Form -->
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="logos-carousel">
                            <a href="#" title=""><img src="png/logo1.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo2.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo3.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo4.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo5.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo1.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo2.png" alt=""/></a>
                        </div><!-- Logos Carousel -->
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection