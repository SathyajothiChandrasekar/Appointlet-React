import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import { ThreeDots } from "react-loader-spinner";

export const CustomerDetailsForm = ({ selectedTime, bookeddate }) => {
  //STATES
  const [customerFormError, setcustomerFormError] = useState(""); //ERROR HANDLING STATE
  const [show, setshow] = useState(true); //STATE FOR SHOW AND HIDE COMPONENT
  const [loader, setLoader] = useState(false);
  const [customerInput, setcustomerInput] = useState({
    //STATE FOR INPUT HANDLING
    customerName: "",
    customerMail: "",
    customerMobile: "",
  });

  //NOTIFICATION
  const notifySuccess = () => {
    Store.addNotification({
      title: "Success",
      message: "Your slot is booked successfully..!",
      type: "success",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true,
      },
    });
  };

  //NAVIGATION HOOK
  const navigate = useNavigate();

  //CANCEL ICON FOR FORM
  const cancel = () => {
    setshow(!show);
  };

  //INPUT HANDLING FUNCTION
  const handleInput = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    if (name === "customerName") {
      setcustomerFormError((prev) => {
        delete prev.customerName;
        return prev;
      });
    }

    if (name === "customerMail") {
      setcustomerFormError((prev) => {
        delete prev.customerMail;
        return prev;
      });
    }

    if (name === "customerMobile") {
      setcustomerFormError((prev) => {
        delete prev.customerMobile;
        return prev;
      });
    }
    setcustomerInput({ ...customerInput, [name]: value });
  };

  // var booked = new Date(bookeddate);
  // booked = booked.getTime();

  const currentTime = new Date().getTime();

  //FUNCTION FOR SUBMIT CUSTOMER FORM INPUT
  const submitCustomerFormInput = async (e) => {
    e.preventDefault();
    setcustomerFormError("");
    try {
      let isvalid = validation();
      if (isvalid) {
        setLoader(true);
        var eventId = localStorage.getItem("eventid");
        let eventdetails = await axios.get(`/dynamo/v1/events/${eventId}`);
        eventdetails = eventdetails.data.data.Item;
        notifySuccess();

        //STORING BOOKING DETAILS OF CUSTOMER TO BACKEND
        await axios.put("/dynamo/v1/bookings", {
          customerName: customerInput.customerName,
          customerMail: customerInput.customerMail,
          customerMobile: customerInput.customerMobile,
          eventId: eventId,
          ownermail: eventdetails.usermail,
          bookedtime: selectedTime,
          bookeddate: bookeddate,
          eventName: eventdetails.eventname,
          createdOn: currentTime,
        });
        setTimeout(() => {
          navigate("/customerDashBoard");
        }, 2000);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  //FUNCTION FOR FORM VALIDATION
  const validation = () => {
    let err = {};
    if (customerInput.customerName === "") {
      err.customerName = "*Name required";
    } else {
      delete err.customerName;
    }

    if (customerInput.customerMail === "") {
      err.customerMail = "*Mail id required";
    } else {
      delete err.customerMail;
    }

    if (customerInput.customerMobile === "") {
      err.customerMobile = "*Mobile Number required";
    } else {
      delete err.customerMobile;
    }
    setcustomerFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  //MAIN RETURN
  return (
    <>
      <ReactNotifications className="bookedNotification" />
      {show && (
        <div className="customerForm">
          <div id="detailsForm">
            <RiCloseFill className="cancelForm" onClick={cancel} />

            <img
              id="customerImage"
              height="90px"
              width="90px"
              src="/asserts/images/owner.png"
              alt=""
            />
            <br />

            <form id="formContainer" onSubmit={submitCustomerFormInput}>
              <label id="nameLabel" htmlFor="name">
                Your Name
              </label>
              <br />
              <input
                autoComplete="off"
                type="text"
                id="customerName"
                name="customerName"
                placeholder="Ex:John"
                onChange={handleInput}
              />
              <br />
              <span className="customerNameSpan">
                {customerFormError.customerName || ""}
              </span>

              <label htmlFor="mail">Mail ID</label>
              <input
                autoComplete="off"
                type="email"
                id="customerMail"
                name="customerMail"
                placeholder="john123@gmail.com"
                onChange={handleInput}
              />
              <br />
              <span className="customerMailSpan">
                {customerFormError.customerMail || ""}
              </span>

              <label htmlFor="mobilenumber">Mobile Number</label>
              <input
                type="tel"
                id="customerMobile"
                name="customerMobile"
                placeholder="8889898774"
                maxLength={10}
                minLength={10}
                onChange={handleInput}
              />
              <span className="customerMobileSpan">
                {customerFormError.customerMobile || ""}
              </span>

              <button type="submit" id="customerDetailSaveButton">
                {loader ? (
                  <ThreeDots
                    height="25"
                    width="25"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  />
                ) : (
                  "BOOK"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
