import { React, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { CustomerMeetings } from "../components/CustomerMeetings";

export const CustomerDashBoard = () => {
    //STATE
    const [cusevents, setcusEvents] = useState([]);
    const [searchBox, setSearchBox] = useState([]);

    //USE EFFECT
    useEffect(() => {
        displayevents();
    }, []);

    //GETTING THE EVENTS ON PAGE LOAD FUNCTION
    const displayevents = () => {
        axios
            .get("/dynamo/v1/events")
            .then((res) => {
                setcusEvents(res.data.data.Items);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //GENERATION OF LIST
    var Events = cusevents.map((event) => {
        return (
            <CustomerMeetings
                key={event.eventid}
                eventid={event.eventid}
                eventname={event.eventname}
                eventby={event.username}
                eventdays={event.day}
                eventduration={event.duration}
            />
        );
    });

    //MAIN RETURN
    return (
        <>
            <div className="customerDashBoardcontainer">
                <div className="customerVerticalContainer">
                    <div id="backbuttoncontainer">
                        <FaAngleLeft id="backicon" />
                        <Link id="back" to="/">
                            BACK
                        </Link>
                    </div>

                    <img
                        className="customerPageLogo"
                        src="/asserts/images/logo.png"
                        alt=""
                    />
                </div>
                <div className="customerMainContainer">
                    <div className="availableMeetText">Available Meetings</div>
                    <div className="meetingContainer">
                        <div className="helpTextMain">
                            <h3>Pick the meetings to book slots</h3>
                        </div>
                        <div className="meetContainer">{Events}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
