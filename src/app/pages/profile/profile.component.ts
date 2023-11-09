import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  UsuarioEspecialidades,
  UsuariosInterface,
} from 'src/app/interface/usuarios.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { ClinicasProfesional, DatosProfesional, ProfesionalEspecialidades } from 'src/app/interface/profesionales_idiomas.interface';
import { IdiomasProfesional, Profesionales_idiomasInterface } from 'src/app/interface/profesionales_idiomas.interface';
import { IdiomasService } from 'src/app/services/idiomas.service';
import { cl, dE } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./css/profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() usuario: UsuariosInterface;
  updateDataComponent: boolean = true;
  private fileTmp: any;
  userLoginOn: boolean = false;
  userData?: UsuariosInterface;
  //Datos basicos del profesional
  datosProfesional?: DatosProfesional[];
  //Clinicas del profesional
  clinicasProfesiona?: ClinicasProfesional[];
  UserDataIdiomas: IdiomasProfesional[];
  especialidades: ProfesionalEspecialidades[];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private idiomasService: IdiomasService
  ) {}

  ngOnInit() {

    const dniUser = this.route.snapshot.paramMap.get('dni');

    if(dniUser){
      this.usuarioService.obtenerUsuario(dniUser).subscribe({
        next: (userData) => {
          this.userData = userData;
        },
      });

    }else{
      this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        },
      });
      this.loginService.currentUserData.subscribe({
        next: (userData) => {
          console.log('Profile(profile)', userData);
          this.userData = userData;
        },
      });
    }
   
    this.idiomasService.obtenerIdiomasProfesional(this.userData.dni).subscribe({
      next: (idiomasData) => {
        // console.log("Estos son los idiomas xd: ", idiomasData)
        this.UserDataIdiomas = idiomasData;
      },
    });
    this.usuarioService.buscarEspecialidad(this.userData.dni).subscribe({
      next: (especialidades) => {
        // console.log("Estas son las especialidades",especialidades);
        this.especialidades = especialidades;
      },
    });
    this.usuarioService
      .datosProfesional(this.userData.colegiadoProfesional)
      .subscribe({
        next: (datosProfesional) => {
          // console.log('datos que vienen de descripcion ', datosProfesional);
          this.datosProfesional = datosProfesional;
        },
      });
  }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
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
