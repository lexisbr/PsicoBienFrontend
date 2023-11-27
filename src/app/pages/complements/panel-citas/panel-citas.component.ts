import { Component } from '@angular/core';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { TipoUsuario } from 'src/app/enum/tipos-usuario.enum';
import Swal from 'sweetalert2';
import { CitaService } from 'src/app/services/cita.service';
import { dA } from '@fullcalendar/core/internal-common';
import {  DatosCitasEspera } from 'src/app/interface/datosCita.Interface';
@Component({
  selector: 'app-panel-citas',
  templateUrl: './panel-citas.component.html',
  styleUrls: ['./css/panel-citas.component.css']
})
export class PanelCitasComponent {
  userData: UsuariosInterface;
  canDataProfile: boolean = false;
  canEditProfile: boolean = true;
  DataCitaEnEspera: DatosCitasEspera[];
  constructor(
    private profesionalesService: ProfesionalesService,
    private loginService: LoginService,
    private citasService: CitaService
    ){}


  ngOnInit(){

    this.loginService.currentUserData.subscribe(
      {
        next:(userData)=>{
          this.userData= userData;
          console.log(userData)
        }
      }
    )
    this.citasService.obtenerCitasEnEspera(this.userData.colegiadoProfesional).subscribe({

      next: (data)=>{
        console.log(data)
        this.DataCitaEnEspera = data;
      }
    })
  }
  setImageUrl(url: string) {

  }
  acceptRequest(idEvento: number) {
    this.citasService.aceptarSolicitud(idEvento).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Solicitud aceptada',
          text: `Cita numero ${idEvento}`,
          confirmButtonText: 'Aceptar',
        });
        this.citasService.obtenerCitasEnEspera(this.userData.colegiadoProfesional).subscribe({
          next: (requests) => {
            this.DataCitaEnEspera = requests;
            console.log(requests);
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  rejectRequest(idEvento: number) {
    this.citasService.rechazarSolicitud(idEvento).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Solicitud rechazada',
          confirmButtonText: 'Aceptar',
        });
        this.citasService.obtenerCitasEnEspera(this.userData.colegiadoProfesional).subscribe({
          next: (requests) => {
            this.DataCitaEnEspera = requests;
            console.log(requests);
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
