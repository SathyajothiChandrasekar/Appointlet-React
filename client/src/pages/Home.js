import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Footer } from "../components/Footer";

export const Home = () => {
  //RETURN MAIN
  return (
    <div>
      {/* login and signip buttons */}
      <div id="routing">
        <Link to="/login">Business account</Link>
      </div>

      {/* header content */}
      <img src="/asserts/images/logo.png" id="logo" alt="" />
      <h4 id="appName">Appointlet</h4>

      {/* main container     */}
      <main id="maincontent">
        <div id="contentContainer">
          <h4>
            Flow through your <span>meeting </span>with ease
          </h4>
          <h3 id="description">
            Appointlet makes online scheduling simple,so you
            <br /> can stay focused at work.Because booking a time
            <br /> shouldn't be difficult.
          </h3>
          <Link id="bookingSlotsButton" to="/customerDashBoard">
            Start your free trial
            <FaArrowRight id="arrowicon" />
          </Link>
        </div>

        {/* index image */}
        <div id="picture">
          <img src="/asserts/images/index.png" alt="" />
        </div>
      </main>

      {/* cloud image container */}
      <div id="cloud">
        <img id="cloud" src="/asserts/images/new-clouds-2.svg" alt="" />
      </div>

      <Footer />
    </div>
  );
};
