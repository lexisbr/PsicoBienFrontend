import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  requests: any[];
  modalOpen: boolean = false;
  modalImageUrl: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.obtenerSolicitudes().subscribe({
      next: (requests) => {
        this.requests = requests;
        console.log(requests);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openModal() {
    this.modalOpen = true;
  }

  setImageUrl(url: string) {
    this.modalImageUrl = url;
    this.openModal();
  }

  acceptRequest(colegiado: number) {
    this.adminService.aceptarSolicitud(colegiado).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Solicitud aceptada',
          text: 'El profesional ya puede iniciar sesión',
          confirmButtonText: 'Aceptar',
        });
        this.adminService.obtenerSolicitudes().subscribe({
          next: (requests) => {
            this.requests = requests;
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

  rejectRequest(colegiado: number) {
    this.adminService.rechazarSolicitud(colegiado).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Solicitud rechazada',
          confirmButtonText: 'Aceptar',
        });
        this.adminService.obtenerSolicitudes().subscribe({
          next: (requests) => {
            this.requests = requests;
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
