import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import parse from "date-fns/parse";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import startOfWeek from "date-fns/startOfWeek";
import axios from "../api/axios";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const event = [
  {
    title: "First Event",
    allDay: true,
    start: new Date(2023, 0, 1),
    end: new Date(2023, 0, 1),
  },
  {
    title: "Second Event",
    allDay: true,
    start: new Date(2023, 0, 7),
    end: new Date(2023, 0, 10),
  },
  {
    title: "Third Event",
    allDay: true,
    start: new Date(2023, 0, 14),
    end: new Date(2023, 0, 14),
  },
];

const Schedule = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const res = await axios.get("/api/v1/order/schedule");
      setEvents(res.data);
    };
    getEvents();
  }, []);
  console.log(events);

  return (
    <div>
      <h1>My Busy Schedule</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Schedule;
