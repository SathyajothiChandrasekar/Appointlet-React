import { React } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export const LogOut = ({ show, setShow }) => {

    //NAVIGATION
    const navigate = useNavigate();
    const log = () => {
        navigate("/");
    };


    //HIDE AND SHOW STATE FUNCTION
    const hide = () => {
        setShow((current) => !current);
    };

    //FUNCTION FOR LOGOUT
    const loggedout = () => {
        log();
        localStorage.removeItem("currentmail");
        localStorage.removeItem("currentuser");
        localStorage.removeItem("eventid");
        localStorage.removeItem("eventname");
        localStorage.removeItem("eventTime");
        localStorage.removeItem("eventduration");
        localStorage.removeItem("days");
    };


    //MAIN RETURN
    return (
        <>
            {show && (
                <div className="logOutBackgroundBlur">
                    <div className="LogOutContainer">
                        <RxCross2 className="logoutCancel" onClick={hide} />
                        <FiLogOut className="logoutIcon" />
                        <h3 className="logouth3">Are you sure, you want to logout?</h3>
                        <button className="logoutButton" onClick={loggedout}>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
