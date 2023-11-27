import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { DatosCitas } from 'src/app/interface/datosCita.Interface';
import Swal from 'sweetalert2';
import { CitaService } from 'src/app/services/cita.service';
import { GenerarCita } from 'src/app/interface/profesional.interface';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./css/calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarVisible = true;
  public events: any;
  // public options: any;
  public options: CalendarOptions = {
    editable: true,
    eventResize: this.handleEventResize.bind(this), // Asocia el evento de redimensionamiento con tu función
    
  };
  nuevoTituloCita: string = '';
  dataCalendar: DatosCitas[];
  userData: UsuariosInterface;
  @Input() userDataC: UsuariosInterface;
  constructor(
    private loginService: LoginService,
    private profesionalesServices: ProfesionalesService,
    private citasService: CitaService,
    private router: Router
  ) { }
  handleEventResize(info: any) {
    const event = info.event;
    const newStartTime = event.start;
    event.setStart(newStartTime);
  }

  ngOnInit() {
    this.loginService.currentUserData.subscribe(
      {
        next: (userData) => {
          this.userData = userData;
          // console.log("Datos del loginService ", this.userData)
          this.loadCalendarData();
        }
      }
    )

    this.options = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrap5Plugin
      ],
      themeSystem: 'bootstrap5',
      locale: esLocale,
      headerToolbar: {
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      editable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this)
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        this.calendarVisible = true;
      } else {
        this.calendarVisible = false;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userDataC'] && !changes['userDataC'].firstChange) {
      this.loadCalendarData();
    }
  }
  loadCalendarData() {
    if(this.userDataC.idTipoUsuario == 2 || this.userData.idTipoUsuario == 2){
      this.profesionalesServices.obtenerDatosCitas(this.userDataC.colegiadoProfesional).subscribe({
        next: (datos) => {
          console.log(datos);
          console.log("Este es el DNI del profesional ", this.userDataC.idTipoUsuario)
          console.log("Este es el DNI del paciente", this.userData.idTipoUsuario)
          this.dataCalendar = datos;
          this.events = datos;
        }
      });
    }else if(this.userDataC.idTipoUsuario == 1 || this.userData.idTipoUsuario == 1){
      this.profesionalesServices.obtenerDatosCitasPaciente(this.userDataC.dni).subscribe({
        next: (datos) => {
          console.log(datos);
          console.log("Este es el DNI del profesional ", this.userDataC.idTipoUsuario)
          console.log("Este es el DNI del paciente", this.userData.idTipoUsuario)
          this.dataCalendar = datos;
          this.events = datos;
        }
      });
    }

  }


  handleDateClick(selectInfo: any) {
    Swal.fire({
      title: 'Ingrese el título, la hora de inicio y la hora de fin de la cita:',
      html: '<input id="titulo" class="swal2-input" placeholder="Título de la cita">' +
        '<input id="horaInicio" class="swal2-input" placeholder="Inicio (formato HH:mm:ss)">' +
        '<input id="horaFin" class="swal2-input" placeholder="Fin (formato HH:mm:ss)">',
      showCancelButton: true,
      confirmButtonText: 'Solicitar',
      cancelButtonText: 'Cancelar',

      preConfirm: () => {
        const title = (document.getElementById('titulo') as HTMLInputElement).value;
        const startTime = (document.getElementById('horaInicio') as HTMLInputElement).value;
        const endTime = (document.getElementById('horaFin') as HTMLInputElement).value;

        if (!title || !startTime || !endTime) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
        }

        return { title, startTime, endTime };
      }
    }).then((result) => {
      if (result.value) {
        const nuevoTituloCita = result.value.title;
        const startTime = result.value.startTime;
        const endTime = result.value.endTime;
        this.abrirModalParaAgregarCita(selectInfo.dateStr, nuevoTituloCita, startTime, endTime);
      }
    });
  }

  abrirModalParaAgregarCita(fechaSeleccionada: string, nuevoTituloCita: string, startTime: string, endTime: string) {
    Swal.fire({
      title: `Solicitando cita con título: ${nuevoTituloCita}`,
      icon: 'success'
    });

    const nuevaCita: GenerarCita = {
      colegiadoProfesional: this.userDataC.colegiadoProfesional,
      descripcion: nuevoTituloCita,
      horaInicial: startTime,
      horaFinal: endTime,
      fechaEvento: fechaSeleccionada,
      pacienteDni: this.userData.dni
    };
    if (nuevaCita.colegiadoProfesional) {
      this.citasService.agendarCita(nuevaCita).subscribe({
        next: (cita) => {
          console.log("datos creados ", cita)
          this.loadCalendarData();
        },
        error: (err) => {
          console.log(err)
        }
      });
    } else {
      console.error('El valor de colegiadoProfesional es undefined.');
    }
  }
  handleEventClick(info: any) {
    const event = info.event;
    console.log("datos ", event)
    const tituloEvento = event.publicId;
    console.log(`Título del evento: ${tituloEvento}`);
    this.openProfile(10000002);

}

openProfile(dni: number) {
  console.log(dni);
  this.router.navigate(['/dating', dni]);
}
}