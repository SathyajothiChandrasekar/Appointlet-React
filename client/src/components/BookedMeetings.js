import { React } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { FaRegUser, FaRegClock, FaMobileAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

export const BookedMeetings = ({ details }) => {
  //MAPPING BOOKING WITH ELEMENTS
  return (
    <div className="bookedBox">
      <div className="bookedEventsName">
        <h2 className="customerEvent">
          <GoPrimitiveDot className="customerEventIcon" />
          {details.eventName}
        </h2>
      </div>
      <hr className="customerHrTag"></hr>
      <div className="bookedEventsBody">
        <div className="columnOne">
          <h3 key={details.bookingid} className="customerName">
            <FaRegUser className="customerNameIcon" />
            {details.customerName}
          </h3>
          <h4 className="customerMobile">
            <FaMobileAlt className="customerMobileIcon" />
            {details.customerMobile}
          </h4>
        </div>

        <div className="columnTwo">
          <h4 className="customerDate">
            <BsCalendarDate className="customerDateIcon" />
            {details.bookeddate}
          </h4>

          <h4 className="customerDuration">
            <FaRegClock className="customerDurationIcon" />
            {details.bookedtime}
          </h4>
        </div>
      </div>
    </div>
  );
};
