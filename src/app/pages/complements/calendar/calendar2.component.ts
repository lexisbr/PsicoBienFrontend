// import { Component } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import esLocale from '@fullcalendar/core/locales/es'
// @Component({
//     selector: 'app-calendar',
//     templateUrl: './calendar.component.html',
//     styleUrls: ['./css/calendar.component.css']
// })
// export class CalendarComponent {
//     public events: any[];
//     public options: any;
//     constructor() { }
//     ngOnInit() {

//         this.options = {
//             plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
//             defaultDate: new Date(),
//             locale: esLocale,
//             header: {
//                 left: 'prev,next',
//                 center: 'title',
//                 right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             },
//             editable: false
//         }

//         this.events = [
//             {
//                 title: "Evento 1",
//                 start: new Date(),
//                 description: "Evento 1"
//             },
//             {
//                 title: "Evento 2",
//                 start: new Date(new Date().getTime() + 86400000),
//                 description: "Evento 3"
//             },
//             {
//                 title: "Evento 3",
//                 start: new Date(new Date().getTime() + 86400000 * 8),
//                 end: new Date(new Date().getTime() + 86400000 * 8),
//                 description: "Evento 3"
//             },
//         ]
//     }
// }



// import { Component } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import esLocale from '@fullcalendar/core/locales/es'



// import listPlugin from '@fullcalendar/list';


// @Component({
//     selector: 'app-calendar',
//     templateUrl: './calendar.component.html',
//     styleUrls: ['./css/calendar.component.css']
// })
// export class CalendarComponent {
//   calendarVisible = true;
//   public events: any[];
//   calendarOptions: CalendarOptions = {
//     plugins: [
//       interactionPlugin,
//       dayGridPlugin,
//       timeGridPlugin,
//       listPlugin,
//     ],
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//     },
//     initialView: 'dayGridMonth',
//     // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
//     // weekends: true,
//     // editable: true,
//     // selectable: true,
//     // selectMirror: true,
//     // dayMaxEvents: true,
//     // select: this.handleDateSelect.bind(this),
//     // eventClick: this.handleEventClick.bind(this),
//     // eventsSet: this.handleEvents.bind(this)
//     /* you can update a remote database when these fire:
//     eventAdd:
//     eventChange:
//     eventRemove:
//     */
//   };
//   ngOnInit(){
//     this.events = [
//       {
//           title: "Evento 1",
//           start: new Date(),
//           description: "Evento 1"
//       },
//       {
//           title: "Evento 2",
//           start: new Date(new Date().getTime() + 86400000),
//           description: "Evento 3"
//       },
//       {
//           title: "Evento 3",
//           start: new Date(new Date().getTime() + 86400000 * 8),
//           end: new Date(new Date().getTime() + 86400000 * 8),
//           description: "Evento 3"
//       }
//     ]
//   }

//   // currentEvents: EventApi[] = [];

//   // constructor(private changeDetector: ChangeDetectorRef) {
//   // }

//   // handleCalendarToggle() {
//   //   this.calendarVisible = !this.calendarVisible;
//   // }

//   // handleWeekendsToggle() {
//   //   const { calendarOptions } = this;
//   //   calendarOptions.weekends = !calendarOptions.weekends;
//   // }

//   // handleDateSelect(selectInfo: DateSelectArg) {
//   //   const title = prompt('Please enter a new title for your event');
//   //   const calendarApi = selectInfo.view.calendar;

//   //   calendarApi.unselect(); // clear date selection

//   //   if (title) {
//   //     calendarApi.addEvent({
//   //       id: createEventId(),
//   //       title,
//   //       start: selectInfo.startStr,
//   //       end: selectInfo.endStr,
//   //       allDay: selectInfo.allDay
//   //     });
//   //   }
//   // }

//   // handleEventClick(clickInfo: EventClickArg) {
//   //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//   //     clickInfo.event.remove();
//   //   }
//   // }

//   // handleEvents(events: EventApi[]) {
//   //   this.currentEvents = events;
//   //   this.changeDetector.detectChanges();
//   // }
// }