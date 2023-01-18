//IMPORTING FILES
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

var newdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
//MAIN FUNCTION
export const CreateMeetForm = () => {
  //IMPORT FROM LOCAL STORAGE
  let username = window.localStorage.getItem("currentuser");
  let currentmail = window.localStorage.getItem("currentmail");

  //STATES
  const [formerror, setformerror] = useState(""); //state for error
  const [loader, setLoader] = useState(false);
  const [formInput, setformInput] = useState({
    meettype: "",
    durationOfMeet: "60",
    day: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    time: {
      MONDAY: { start: "9", end: "18" },
      TUESDAY: { start: "9", end: "18" },
      WEDNESDAY: { start: "9", end: "18" },
      THURSDAY: { start: "9", end: "18" },
      FRIDAY: { start: "9", end: "18" },
    },
  });

  //NAVIGATION
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormDetails();
  }, []);

  //FUNCTION FOR FORM VALIDATION
  const validation = () => {
    let err = {};
    if (formInput.meettype === "") err.meettype = "*MeetType required";
    if (formInput.day.length < 1) err.day = "*Select a day";
    setformerror({ ...err });
    return Object.keys(err).length < 1;
  };

  //notifiacation
  const notifySuccess = () => {
    Store.addNotification({
      title: "Success",
      message: "Events were created successfully",
      type: "success",
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

  const currentTime = new Date().getTime();

  //FUNCTION FOR FORM SUBMIT
  const submitforminput = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      validation();
      let isvalidated = validation();
      if (isvalidated) {
        let eventId = window.localStorage.getItem("eventid");
        if (eventId === null) {
          await axios.post("/dynamo/v1/events/", {
            eventname: formInput.meettype,
            duration: formInput.durationOfMeet,
            day: formInput.day,
            time: formInput.time,
            usermail: currentmail,
            username: username,
            createdOn: currentTime,
          });
        } else {
          console.log("edited");
          await axios.put(`/dynamo/v1/events/${eventId}`, {
            eventname: formInput.meettype,
            duration: formInput.durationOfMeet,
            day: formInput.day,
            time: formInput.time,
            usermail: currentmail,
            username: username,
          });
        }
        notifySuccess();
        setTimeout(() => {
          formCancel();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  //FETCHING OWNER DETAILS FOR EDITING
  const fetchFormDetails = () => {
    var eventId = localStorage.getItem("eventid");
    if (eventId !== null) {
      var eventName = localStorage.getItem("eventname");
      var eventDuration = localStorage.getItem("eventduration");
      var eventDays = localStorage.getItem("days");
      var eventTime = JSON.parse(localStorage.getItem("eventTime"));

      if (eventName !== null && eventDuration !== null) {
        setformInput((prev) => ({
          meettype: eventName,
          durationOfMeet: eventDuration,
          day: eventDays,
          time: eventTime,
        }));
      }
    }
  };

  //FUNCTION FOR HANDLING FORM INPUT
  const handleforminput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "meettype") {
      setformerror((prev) => {
        delete prev.meettype;
        return prev;
      });
    }

    //DAYS IN A WEEK
    if (name === "day") {
      const checked = e.target.checked;
      if (checked) {
        newdays = [...newdays, value];
        setformInput((prev) => ({
          ...prev,
          time: {
            ...prev.time,
            [value]: {
              start: "9",
              end: "18",
            },
          },
        }));
      } else {
        newdays = newdays.filter((e) => e !== value);
      }
      setformInput((prev) => ({ ...prev, day: newdays }));
    } else if (name.includes("start") || name.includes("end")) {
      if (name.includes("start")) {
        const start = name.split("s")[0];
        setformInput((prev) => ({
          ...prev,
          time: {
            ...prev.time,
            [start]: {
              ...prev.time[start],
              start: value,
            },
          },
        }));
      } else {
        const end = name.split("e")[0];
        console.log(end);
        setformInput((prev) => ({
          ...prev,
          time: {
            ...prev.time,
            [end]: {
              ...prev.time[end],
              end: value,
            },
          },
        }));
      }
    } else {
      setformInput({ ...formInput, [name]: value });
    }
  };

  //BACK TO DASHBOARD
  const formCancel = () => {
    navigate("/ownerDashboard");
    localStorage.removeItem("eventid");
    localStorage.removeItem("eventname");
    localStorage.removeItem("eventTime");
    localStorage.removeItem("eventduration");
    localStorage.removeItem("days");
  };

  //MAIN RETURN FUNCTION
  return (
    <>
      <ReactNotifications />
      <div id="createmeetbackground">
        <div id="creatmeetcontainer">
          <img
            id="createmeetimage"
            src="/asserts/images/owner.png"
            height="140px"
            width="120px"
            alt=""
          />
          <RiCloseFill className="backforform" onClick={formCancel} />

          {/* FORM */}
          <form id="ownercreatemeetform" onSubmit={submitforminput}>
            <div id="meetnamediv">
              <label id="labelmeettype" htmlFor="meettype">
                <b>Meeting Type</b>
              </label>

              <input
                type="text"
                id="meettype"
                name="meettype"
                placeholder="EX: Business Meet"
                onChange={handleforminput}
                value={formInput.meettype || ""}
              />
            </div>
            <span className="meettypespan">{formerror.meettype}</span>

            <div id="durationdiv">
              <label id="durationofmeet" htmlFor="durationOfMeet">
                <b>Duration of Meet</b>
              </label>
              <select
                name="durationOfMeet"
                id="durationOfMeet"
                value={formInput.durationOfMeet || ""}
                onChange={handleforminput}
              >
                <option value={60}>60minutes</option>
                <option value={45}>45minutes</option>
                <option value={30}>30minutes</option>
              </select>
            </div>

            <label className="dy" id="Availabledayslabel" htmlFor="days">
              <b>Available days</b>
            </label>
            <small>*Time in 24hr format</small>
            <span className="meettypespan">{formerror.day}</span>

            <div className="week" id="weeks">
              <input
                type="checkbox"
                id="SUNDAY-check"
                name="day"
                defaultValue="SUNDAY"
                checked={formInput.day.includes("SUNDAY")}
                onChange={handleforminput}
              />

              <label id="dayslabel" htmlFor="SUNDAY-check">
                SUNDAY
              </label>

              {formInput.day.includes("SUNDAY") ? (
                <div className="daysofweek" id="sunday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="SUNDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.SUNDAY.start || "9"}
                    onChange={handleforminput}
                    required
                  />

                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="SUNDAYend"
                    id="days"
                    placeholder="End By"
                    defaultValue={formInput.time.SUNDAY.end || "18"}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}

              <input
                type="checkbox"
                id="MONDAY-check"
                name="day"
                defaultValue="MONDAY"
                checked={formInput.day.includes("MONDAY")}
                onChange={handleforminput}
              />
              <label id="dayslabel" htmlFor="MONDAY-check">
                MONDAY
              </label>
              {formInput.day.includes("MONDAY") ? (
                <div className="daysofweek" id="monday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="MONDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.MONDAY.start || "9"}
                    onChange={handleforminput}
                    required
                  />
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="MONDAYend"
                    id="days"
                    placeholder="End By"
                    defaultValue={formInput.time.MONDAY.end || "18"}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}

              <input
                type="checkbox"
                id="TUESDAY-check"
                name="day"
                defaultValue="TUESDAY"
                checked={formInput.day.includes("TUESDAY")}
                onChange={handleforminput}
              />
              <label id="dayslabel" htmlFor="TUESDAY-check">
                TUESDAY
              </label>
              {formInput.day.includes("TUESDAY") ? (
                <div className="daysofweek" id="tuesday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="TUESDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.TUESDAY.start || "9"}
                    onChange={handleforminput}
                    required
                  />
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="TUESDAYend"
                    id="days"
                    placeholder="End By"
                    defaultValue={formInput.time.TUESDAY.end || "18"}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}

              <input
                type="checkbox"
                id="WEDNESDAY-check"
                name="day"
                defaultValue="WEDNESDAY"
                checked={formInput.day.includes("WEDNESDAY")}
                onChange={handleforminput}
              />
              <label id="dayslabel" htmlFor="WEDNESDAY-check">
                WEDNESDAY
              </label>
              {formInput.day.includes("WEDNESDAY") ? (
                <div className="daysofweek" id="wednesday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="WEDNESDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.WEDNESDAY.start || "9"}
                    onChange={handleforminput}
                    required
                  />
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="WEDNESDAYend"
                    id="days"
                    placeholder="End By"
                    defaultValue={formInput.time.WEDNESDAY.end || "18"}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}

              <input
                type="checkbox"
                id="THURSDAY-check"
                name="day"
                defaultValue="THURSDAY"
                checked={formInput.day.includes("THURSDAY")}
                onChange={handleforminput}
              />
              <label id="dayslabel" htmlFor="THURSDAY-check">
                THURSDAY
              </label>
              {formInput.day.includes("THURSDAY") ? (
                <div className="daysofweek" id="thursday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="THURSDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.THURSDAY.start || "9"}
                    onChange={handleforminput}
                    required
                  />
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="THURSDAYend"
                    id="days"
                    placeholder="End By"
                    defaultValue={formInput.time.THURSDAY.end || "18"}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}

              <input
                type="checkbox"
                id="FRIDAY-check"
                name="day"
                defaultValue="FRIDAY"
                checked={formInput.day.includes("FRIDAY")}
                onChange={handleforminput}
              />
              <label id="dayslabel" htmlFor="FRIDAY-check">
                FRIDAY
              </label>
              {formInput.day.includes("FRIDAY") ? (
                <div className="daysofweek" id="friday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="FRIDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.FRIDAY.start || "9"}
                    onChange={handleforminput}
                    required
                  />
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="FRIDAYend"
                    id="days"
                    placeholder="End By"
                    defaultValue={formInput.time.FRIDAY.end || "18"}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}
              <input
                type="checkbox"
                id="SATURDAY-check"
                name="day"
                defaultValue="SATURDAY"
                checked={formInput.day.includes("SATURDAY")}
                onChange={handleforminput}
              />
              <label id="dayslabel" htmlFor="SATURDAY-check">
                SATURDAY
              </label>
              {formInput.day.includes("SATURDAY") ? (
                <div className="daysofweek" id="saturday">
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="SATURDAYstart"
                    id="days"
                    placeholder="Start At"
                    defaultValue={formInput.time.SATURDAY.start || " "}
                    onChange={handleforminput}
                    required
                  />
                  <input
                    className="time"
                    min={1}
                    max={24}
                    type="number"
                    name="SATURDAYend"
                    id="days"
                    placeholder="End By"
                    value={formInput.time.SATURDAY.end || " "}
                    onChange={handleforminput}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <button type="submit" id="saveButtonForStoring">
              {loader ? (
                <ThreeDots
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              ) : (
                "SAVE"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
