import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useSession } from "@supabase/auth-helpers-react";

const happy = () => {
  const session = useSession();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  async function createCalEvent() {
    const event = {
      summary: eventName,
      description: eventDesc,
      start: {
        dateTime: start.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    console.log(event, session);

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log("data: ", data);
        alert("Event Created!");
      });
  }

  async function getCalEvent() {
    console.log("get cal events");

    // await fetch(
    //   "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    //   {
    //     method: "GET",
    //     headers: {
    //       'Authorization':'Bearer ' + session.provider_token // Access token for google
    //     }
    //   }
    // )
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((data) => {
    //     console.log("data: ", data);
    //     // alert("Event Created!");
    //   });
  }

  return (
    <div>
      <p>start event:</p>
      <DateTimePicker value={start} onChange={setStart} />
      <br />

      <p>end event:</p>
      <DateTimePicker value={end} onChange={setEnd} />
      <br />

      <p>event name: </p>
      <input
        type="text"
        name=""
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        id=""
      />

      <p>event desc:</p>
      <input
        type="text"
        name=""
        id=""
        value={eventDesc}
        onChange={(e) => setEventDesc(e.target.value)}
      />
      <br />
      <button onClick={createCalEvent}>create event</button>
      <br />
      <button onClick={getCalEvent}>get all events</button>
    </div>
  );
};

export default happy;
