import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./css/calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarVisible = true;
  public events: any;
  public options: any;

  constructor() { }

  ngOnInit() {

    this.options = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrap5Plugin 
      ],
      themeSystem: 'bootstrap5',
      defaultDate: new Date(),
      locale: esLocale,
      headerToolbar: {
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      editable: false
    }

    this.events = [
      {
        title: "Cita confirmada",
        start: new Date("2023-10-04T10:30:00"),
        end: new Date("2023-10-04T11:30:00"),
        description: "Evento 1",
        url: 'http://google.com/',
        color: '#127d42'
      },
      {
        title: "Cita confirmada",
        start: new Date("2023-10-04T11:30:00"),
        end: new Date("2023-10-04T12:30:00"),
        description: "Evento 2",
        color: '#127d42'
      },
      {
        title: "Cita confirmada",
        start: new Date("2023-10-04T12:30:00"),
        end: new Date("2023-10-04T13:30:00"),
        description: "Evento 1",
        color: '#127d42'
      },
      {
        title: "Cita confirmada",
        start: new Date("2023-10-04T14:30:00"),
        end: new Date("2023-10-04T15:30:00"),
        description: "Evento 1",
        color: '#127d42'
      },
      {
        title: "Cita confirmada",
        start: new Date("2023-10-06T10:30:00"),
        end: new Date("2023-10-06T11:30:00"),
        description: "Alberto Ulin",
        color: '#127d42'
      },
      {
        start: new Date("2023-10-06T11:30:00"),
        end: new Date("2023-10-06T12:30:00"),
        title: "Evento 3",
        description: "Evento 2",
        color: '#127d42'
      },
      {
        title: "Evento 4",
        start: new Date(),
        description: "Evento 3",
        color: '#127d42'
      },
      {
        title: "Evento 5",
        start: new Date(new Date().getTime() + 86400000),
        description: "Evento 5",
        color: '#127d42'
      },
      {
        title: "Evento 6",
        start: new Date(new Date().getTime() + 86400000 * 8),
        end: new Date(new Date().getTime() + 86400000 * 8),
        description: "Evento 6",
        color: '#127d42'
      },
    ]

    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        this.calendarVisible = true;
      } else {
        this.calendarVisible = false;
      }
    });
  }
}