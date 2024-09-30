import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Needed for dateClick


const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Sample Event',
      start: '2023-09-28T10:00:00',
      end: '2023-09-28T12:00:00'
    }
  ]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter Event Title:');
    if (title) {
      const newEvent = {
        title,
        start: arg.date,
        end: arg.date.setHours(arg.date.getHours() + 1) // 1 hour duration
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      dateClick={handleDateClick}
    />
  );
};

export default MyCalendar;
