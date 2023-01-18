import { React, useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { EventsOnDashboard } from "../components/EventsOnDashboard";
import { BookedMeetings } from "../components/BookedMeetings";
import axios from "axios";
import { LogOut } from "../components/LogOut";

export const OwnerDashBoard = () => {
  //states
  const [toggle, setToggle] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  //use effect
  useEffect(() => {
    displayevents();
    displayBookings();
  }, []);

  //navigate
  const navigate = useNavigate();

  //toggle function
  const toggling = (i) => {
    setToggle(i);
  };

  //onpage loade display events
  const displayevents = () => {
    axios
      .get("/dynamo/v1/events")
      .then((res) => {
        filterEvents(res.data.data.Items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //filtering meeting events
  const filterEvents = (value) => {
    let currentmail = window.localStorage.getItem("currentmail");
    var events = value.filter((item) => item.usermail === currentmail);
    if (events.length === 0) {
      setShowWelcome(true);
    } else {
      setEvents(events);
      setShowWelcome(false);
    }
  };

  //DISPLAY BOOKINGS FUNCTION
  const displayBookings = () => {
    axios
      .get("/dynamo/v1/bookings") //GETTING BOOKING DETAILS FROM BACKEND
      .then((res) => {
        filterBookings(res.data.data.Items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //FUNCTION FOR FILTERING
  var filterBookings = (value) => {
    var currentmail = localStorage.getItem("currentmail");
    var bookings = value.filter((items) => items.ownermail === currentmail);
    if (bookings.length === 0) {
      setShowWelcome(false);
    } else {
      setBookings(bookings);
      setShowWelcome(false);
    }
  };

  //search box
  const handleSearch = (e) => {
    var keyword = e.target.value;
    if (keyword !== "") {
      var temp = bookings.filter(
        (item) =>
          item.eventName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          item.eventName.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResult(temp);
    } else {
      setSearchResult([]);
    }
  };

  //GENERATING EVENTS
  var Events = events.map((event) => {
    return (
      <EventsOnDashboard
        key={event.eventid}
        eventid={event.eventid}
        eventname={event.eventname}
        eventduration={event.duration}
        eventby={event.username}
        eventdays={event.day}
        displayevents={displayevents}
      />
    );
  });

  //
  const Bookings =
    searchResult.length > 0
      ? searchResult.map((item) => {
          return <BookedMeetings details={item} key={item.bookingid} />;
        })
      : bookings.map((item) => {
          return <BookedMeetings details={item} key={item.bookingid} />;
        });

  //create new meet function
  const createNewMeet = () => {
    navigate("/createMeeting");
  };

  //SHOW LOGOUT ONCLICK LOGOUT ICON
  const showLogout = () => {
    setShow((current) => !current);
  };

  return (
    <div className="dashBoardcontainer">
      <div className="verticalContainer">
        <img className="ownerPageLogo" src="/asserts/images/logo.png" alt="" />
        <div
          className={toggle === 1 ? "ownerSlotsActive" : "ownerSlots"}
          onClick={() => toggling(1)}
        >
          <FaCalendarAlt className="ownerSlotsIcon" />
          <span className="ownerSlotsText">Meetings</span>
        </div>

        <div
          className={toggle === 2 ? "bookedSlotsActive" : "bookedSlots"}
          onClick={() => toggling(2)}
        >
          <FaCalendarCheck className="bookedSlotsIcon" />
          <span className="bookedSlotsText">Booked</span>
        </div>

        <FiLogOut className="logOutIcon" onClick={showLogout} />
      </div>

      <div className="mainContainer">
        <div className="mainHeader">
          <h1 className="meetingHeader">Meetings</h1>
          <button className="createNewMeetButton" onClick={createNewMeet}>
            <MdAdd className="createIcon" />
            Create New Meeting
          </button>
        </div>

        {/* main container */}
        <div className="slotContainer">
          {toggle === 1 ? (
            showWelcome ? (
              <div className="noMeetingsFoundContainer">
                <img src="/asserts/images/createnewmeetimage.png" alt="" />
                <h3 className="noMeetingsFoundText">
                  no meets found<br></br>create new meet
                </h3>
              </div>
            ) : (
              <div className="scheduledMeetings">
                <div className="scheduledMeetingsText">Scheduled Meetings</div>
                <div className="scheduledMeetingsContainer">{Events}</div>
              </div>
            )
          ) : (
            <div></div>
          )}

          {toggle === 2 ? (
            showWelcome ? (
              <div className="noBookingsFoundContainer">
                <img src="/asserts/images/empty.png" alt="" />
                <h3 className="noBookingsFoundText">No Bookings</h3>
              </div>
            ) : (
              <div className="bookedMeetings">
                <div className="bookedMeetingsText">
                  <span>Booked Meetings</span>
                  <div className="searchBox">
                    <div className="searchIcon">
                      <CiSearch />
                    </div>
                    <input
                      type="search"
                      name="searchBox"
                      className="searchBoxInput"
                      placeholder="Search For Bookings"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="bookedMeetingsContainer">{Bookings}</div>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* {show &&  */}
      <LogOut show={show} setShow={setShow} />
      {/* } */}
    </div>
  );
};
