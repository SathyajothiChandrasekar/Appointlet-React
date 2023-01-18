import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaRegClock } from "react-icons/fa";
import { IoTodayOutline } from "react-icons/io5";
import { GoPrimitiveDot } from "react-icons/go";
import { DeleteEvents } from "../components/DeleteEvents";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

export const EventsOnDashboard = ({
  eventid,
  eventname,
  eventby,
  eventdays,
  eventduration,
  displayevents,
}) => {
  var days = eventdays.map((day) => {
    return <li key={day}>{day}</li>;
  });

  //NAVIGATION
  const navigate = useNavigate();
  const [isdelShown, setIsdelShown] = useState(false);

  //FUNCTION FOR HIDE AND SHOW DELETE BOX
  const delhideandshown = () => {
    setIsdelShown((current) => !current);
  };

  // //DELETE EVENTS FUNCTION
  const deleteevents = async () => {
    try {
      var event = await axios.get(`/dynamo/v1/events/`);
      event = event.data.data.Items;
      console.log(event.length);
      for (let i = 0; i < event.length; i++) {
        if (eventid === event[i].eventid) {
          var even = event[i].eventid;
        }
      }

      await axios.delete(`/dynamo/v1/events/${even}`);
      delhideandshown();
      displayevents();
    } catch (error) {
      console.log(error);
    }
  };

  // //EDIT EVENT FUNCTION
  const editevent = async (e) => {
    try {
      var event = await axios.get(`/dynamo/v1/events/`);
      event = event.data.data.Items;
      console.log(event);
      for (let i = 0; i < event.length; i++) {
        if (eventid === event[i].eventid) {
          var eventId = event[i].eventid;
          var eventnam = event[i].eventname;
          var eventdur = event[i].duration;
          var day = event[i].day;
          var time = event[i].time;
        }
      }
      await axios.get(`/dynamo/v1/events/${eventId}`);
      localStorage.setItem("eventid", eventId);
      localStorage.setItem("eventname", eventnam);
      localStorage.setItem("eventduration", eventdur);
      localStorage.setItem("days", day);
      localStorage.setItem("eventTime", JSON.stringify(time));

      console.log();

      displayevents();
    } catch (error) {
      console.log(error);
    }
  };

  //EDIT BUTTON FUNCTION
  const editbutton = () => {
    editevent().then(() => navigate("/createMeeting"));
  };

  //MAIN RETURN
  return (
    <>
      <div className="eventsSlots">
        {/* event type */}
        <h2 className="dashboardEventName">
          <GoPrimitiveDot className="dashboardEventNameIcon" />
          {eventname}
        </h2>

        {/*ownername from login*/}
        <h3 className="dashboardEventBy">
          <FaRegUser className="dashboardEventByIcon" /> {eventby}
        </h3>

        {/* duration */}
        <h4 className="dashboardEventDuration">
          <FaRegClock className="dashboardEventDurationIcon" />
          {eventduration} minutes
        </h4>
        <IoTodayOutline className="daysIcon" />
        {days}
        <hr></hr>

        <div className="editDelete">
          <button className="editButton" onClick={editbutton}>
            <FiEdit />
          </button>
          <button className="deleteButton" onClick={delhideandshown}>
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>

      {isdelShown && (
        <DeleteEvents
          deleteevents={deleteevents}
          delhideandshown={delhideandshown}
        />
      )}
    </>
  );
};
