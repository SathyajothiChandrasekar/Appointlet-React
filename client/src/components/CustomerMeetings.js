import { React, useState } from "react";
import { FaRegUser, FaRegClock } from "react-icons/fa";
import { IoTodayOutline } from "react-icons/io5";
import { GoPrimitiveDot } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export const CustomerMeetings = ({
  eventid,
  eventname,
  eventby,
  eventdays,
  eventduration,
}) => {
  const [loader, setLoader] = useState(false);
  console.log(eventdays);

  var days = eventdays.map((day) => {
    return <li key={day}>{day}</li>;
  });

  //NAVIGATION
  const navigate = useNavigate();
  const nav = () => {
    setLoader(true);
    setTimeout(() => {
      navigate("/customerCalendar");
      setLoader(false);
    }, 1000);

    localStorage.setItem("eventid", eventid);
  };

  return (
    <>
      <div className="customerEventsSlots" id={eventid} onClick={nav}>
        {loader ? (
          <div className="customerEventsSlotsTail">
          <ThreeDots
            height="50"
            width="50"
            color="black"
            radius="1"
            className="customerDashBoardTail"
          />
          </div>
        ) : (
          <>
            {/* event type */}
            <h2 className="CustomerDashboardEventName">
              <GoPrimitiveDot className="CustomerDashboardEventNameIcon" />
              {eventname}
            </h2>

            {/*ownername from login*/}
            <h3 className="CustomerDashboardEventBy">
              <FaRegUser className="CustomerDashboardEventByIcon" /> {eventby}
            </h3>

            {/* duration */}
            <h4 className="CustomerDashboardEventDuration">
              <FaRegClock className="CustomerDashboardEventDurationIcon" />
              {eventduration} minutes
            </h4>
            <IoTodayOutline className="CustomerDaysIcon" />
            {days}
          </>
        )}
      </div>
    </>
  );
};
