import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoUsuario } from 'src/app/enum/tipos-usuario.enum';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { IdiomasService } from 'src/app/services/idiomas.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dating-patient',
  templateUrl: './dating-patient.component.html',
  styleUrls: ['./css/dating-patient.component.css']
})
export class DatingPatientComponent implements OnInit {
  userData: UsuariosInterface;
  userLoginOn: boolean = false;
  canEditProfile: boolean = true;
  canDataProfile: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private idiomasService: IdiomasService,
    private profesionalesService: ProfesionalesService
  ) {

   }

  ngOnInit() {

    const dniUser = this.route.snapshot.paramMap.get('dni');

    if (dniUser) {
      this.usuarioService.obtenerUsuario(dniUser).subscribe({
        next: (userData) => {
          this.userData = userData;
          this.canEditProfile = false;
          this.canDataProfile = true;
        //  this.loadData();
          console.log("datos de usuario ", userData)
        },
      });
    } else {
      this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        },
      });
      this.loginService.currentUserData.subscribe({
        next: (userData) => {
          console.log("Datos de la cuenta actual ",userData)
          if (userData.dni !== '') {
            this.userData = userData;
            if (this.userData.idTipoUsuario == TipoUsuario.PROFESIONAL) {
              console.log(this.userData.colegiadoProfesional);
              this.canDataProfile = true;
              this.profesionalesService
                .obtenerDatosProfesional(this.userData.colegiadoProfesional)
                .subscribe({
                  next: (data) => {
                    const dataProfesional = data[0];
                    if (dataProfesional.estado == 2) {
                      this.canEditProfile = false;
                      
                      Swal.fire({
                        icon: 'info',
                        title:
                          'Por el momento no podrás editar tu perfil, debes esperar a que el administrador aprueba tu solicitud de registro',
                        showConfirmButton: true,
                      });
                    }
                  },
                });
            }
           // this.loadData();
          }
        },
      });
    }
   }

}

