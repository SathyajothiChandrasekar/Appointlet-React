import axios from "axios";
import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Meet } from "../components/Meet";
import { FaAngleLeft } from "react-icons/fa";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

import { CustomerDetailsForm } from "../components/CustomerDetailsForm";

var eventid = localStorage.getItem("eventid");

const notifyAlert = () => {
  Store.addNotification({
    title: "Alert !",
    message: "Book the slot timings",
    type: "warning",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

//MAIN FUNCTION
export const CustomerCalendar = () => {
  //STATES
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [Time, setTime] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [emptySlot, setEmptySlot] = useState(true);
  const [event, setEvent] = useState([]);

  //HIDE AND SHOW CUSTOMER FORM
  const hideandshow = () => {
    if (selectedTime === "") {
      notifyAlert();
    } else {
      setShow(!show);
    }
  };

  //SELECTED DATE
  var currentDate = date;
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var yyyy = currentDate.getFullYear();
  var bookeddate = dd + "-" + mm + "-" + yyyy;

  //today
  var today = new Date();

  //ONCHANGE FOR INPUTS
  const onchange = async (date) => {
    var eventid = localStorage.getItem("eventid");
    var eventDetail = await axios.get(`/dynamo/v1/events/${eventid}`);
    setDate(date);
    var time = eventDetail.data.data.Item.time;
    var duration = eventDetail.data.data.Item.duration;
    var day = date.getDay();
    console.log(time);
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    day = days[day];
    if (day in time) {
      setEmptySlot(false);
      slot(time[day].start, time[day].end, duration);
    } else {
      setEmptySlot(true);
    }
  };

  //USE EFFECT FOR PAGE LOAD
  useEffect(() => {
    console.log(eventid);
    eventDetails();
  }, []);

  //SEGREGATION OF SLOTS
  const slot = async (starttime, endtime, duration) => {
    var start = parseInt(starttime) * 60;
    var end = parseInt(endtime) * 60;
    duration = parseInt(duration);
    var arrayOfTime = [];
    for (let i = start; i < end; i += duration) {
      var hour = Math.trunc(i / 60);
      var minutes = i % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var time = hour + ":" + minutes;
      arrayOfTime.push(time);
    }
    setTime(arrayOfTime);
  };
  console.log(Time);

  const eventDetails = () => {
    var eventid = localStorage.getItem("eventid");
    axios
      .get(`/dynamo/v1/events/${eventid}`)
      .then((res) => {
        setEvent(res.data.data.Item);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var slotTimings = Time.map((timings) => {
    return (
      <li
        className="list"
        key={timings}
        onClick={() => {
          setSelectedTime(timings);
        }}
        style={
          selectedTime === timings
            ? { backgroundColor: "lightblue" }
            : { backgroundColor: "white" }
        }
      >
        {" "}
        {timings}
      </li>
    );
  });

  //RETURN FOR FUNCTION
  return (
    <>
      <ReactNotifications />
      <div className="customerDashBoardcontainer">
        <div className="customerVerticalContainer">
          <div id="backbuttoncontainer">
            <FaAngleLeft id="backicon" />
            <Link id="back" to="/customerDashBoard">
              BACK
            </Link>
          </div>

          <img
            className="customerPageLogo"
            src="/asserts/images/logo.png"
            alt=""
          />
        </div>

        <div className="calendarContainer">
          <div className="availabilityHeader">
            <h2>Available date and time</h2>
            <div className="guidelines">
              <h4>Guidelines</h4>
              <h5>1.Select date to view slots</h5>
              <h5>2.Pick meet timing</h5>
            </div>
          </div>
          <div className="calendarContainerBody">
            <div className="meetDetailsContainer">
              <Meet
                eventName={event.eventname}
                createdBy={event.username}
                durationOfMeet={event.duration}
              />
            </div>
            <Calendar
              className="calendar"
              onClickDay={onchange}
              value={date}
              minDate={today}
            />

            {emptySlot ? (
              <div className="slotTimings">
                <h3 className="noSlotsAvailable">Select date to pick slots</h3>
              </div>
            ) : (
              <div className="slotTimings">{slotTimings}</div>
            )}

            <button className="CustomerDetailsSaveButton" onClick={hideandshow}>
              Book Now
            </button>
          </div>
        </div>
        {show && (
          <CustomerDetailsForm
            selectedTime={selectedTime}
            bookeddate={bookeddate}
          />
        )}
      </div>
    </>
  );
};
