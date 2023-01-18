import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
export const Footer = () => {
    //MAIN RETURN
    return (
        <>
            {/* footer */}
            <div id="footer">
                <h1 id="footerh1">
                    Give Appointlet a try, it's <span id="mainfooterspan">free </span>
                </h1>
                <h2>
                    We provide a generous set of features on the free plan, so it might be
                    all you need. There’s no obligation, signup takes less than 2 minutes
                    and you won’t need a credit card.
                </h2>
                <Link id="footerbutton1" to="/customerDashBoard">
                    Register now for free
                    <FaArrowRight id="arrowicon" />
                </Link>
            </div>

            <div id="footerdescription">
                <h3>Appointlet</h3>
                <p>Making scheduling and enrolling simple</p>
            </div>

            <div id="mainfooter">
                <h1>Quick to setup</h1>

                <div id="setups">
                    <div id="setup1">
                        <img
                            src="/asserts/images/setup1final.png"
                            height={200}
                            width={250}
                            alt=""
                        />
                        <h3>Set your availability</h3>
                    </div>

                    <div id="setup2">
                        <img src="/asserts/images/maindash.png" height={200} width={250} alt="" />
                        <h3>Watch your own bookings</h3>
                    </div>

                    <div id="setup3">
                        <img
                            src="asserts/images/setup3final.png"
                            height={200}
                            width={250}
                            alt=""
                        />
                        <h3>Watch the bookings fly in</h3>
                    </div>
                </div>
            </div>
            <div id="usesofapp">
                <h1>How teams use Appointlet in the workplace</h1>
                <div id="uses">
                    <p>
                        <strong>Sales & Maeketing</strong>
                        <br></br>
                        <br></br>Schedule time with qualified leads and smash your sales
                        quotes
                    </p>
                    <p>
                        <strong>Health & Wellness</strong>
                        <br></br>
                        <br></br>Delight your patients with stress freeappointment
                        scheduling service
                    </p>
                    <p>
                        <strong>Retail service</strong>
                        <br></br>
                        <br></br>Schedule business service and shoppping appointments for
                        your customers
                    </p>
                    <p>
                        <strong>Legal & Finance</strong>
                        <br></br>
                        <br></br>Co ordinate client consultationfor legal and financila
                        firms by online
                    </p>
                    <p>
                        <strong>HR & Interviewing</strong>
                        <br></br>
                        <br></br>Stream line your recruiting, hiring and onboarding process
                    </p>
                </div>
            </div>

            <div id="lowerfooter">
                <img src="/asserts/images/logo.png" id="footerlogo" alt="" />
                <h4 id="footerappName">Appointlet</h4>
                <h5>The simple and affordable way to book meetings online</h5>
                <h3>© 2022 Appointlet - All rights reserved</h3>
            </div>
        </>
    );
}

