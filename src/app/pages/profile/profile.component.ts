import { Component, Input, OnInit } from '@angular/core';
import {
  UsuariosInterface,
} from 'src/app/interface/usuarios.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/auth/login.service';
import {
  ClinicasProfesional,
  DatosProfesional,
  ProfesionalEspecialidades,
} from 'src/app/interface/profesionales_idiomas.interface';
import { IdiomasProfesional } from 'src/app/interface/profesionales_idiomas.interface';
import { IdiomasService } from 'src/app/services/idiomas.service';
import { TipoUsuario } from 'src/app/enum/tipos-usuario.enum';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./css/profile.component.css'],
})
export class ProfileComponent implements OnInit {
  updateDataComponent: boolean = true;
  private fileTmp: any;
  userLoginOn: boolean = false;
  userData: UsuariosInterface;
  //Datos basicos del profesional
  datosProfesional?: DatosProfesional[];
  //Clinicas del profesional
  clinicasProfesiona?: ClinicasProfesional[];
  UserDataIdiomas: IdiomasProfesional[];
  especialidades: ProfesionalEspecialidades[];

  canEditProfile: boolean = true;
  canDataProfile: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private idiomasService: IdiomasService,
    private profesionalesService: ProfesionalesService
  ) {}

  ngOnInit() {
    const dniUser = this.route.snapshot.paramMap.get('dni');

    if (dniUser) {
      this.usuarioService.obtenerUsuario(dniUser).subscribe({
        next: (userData) => {
          this.userData = userData;
          this.canEditProfile = false;
          this.canDataProfile = true;
          this.loadData();
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
            this.loadData();
          }
        },
      });
    }
  }

  loadData() {
    this.idiomasService.obtenerIdiomasProfesional(this.userData.dni).subscribe({
      next: (idiomasData) => {
        this.UserDataIdiomas = idiomasData;
      },
    });
    this.usuarioService.buscarEspecialidad(this.userData.dni).subscribe({
      next: (especialidades) => {
        this.especialidades = especialidades;
      },
    });
    this.usuarioService
      .datosProfesional(this.userData.colegiadoProfesional)
      .subscribe({
        next: (datosProfesional) => {
          this.datosProfesional = datosProfesional;

        }
      });
      this.usuarioService.obtenerClinicas(this.userData.colegiadoProfesional).subscribe(
        {
          next: (clinicas)=>{
            this.clinicasProfesiona = clinicas;
          }
        }
      ) 
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL;
    }
  }

  actualizarPerfilEnPadre(datos: boolean) {
    this.updateDataComponent = datos;
  }

  onSubmit() {}
  getFile($event: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    };
  }
}