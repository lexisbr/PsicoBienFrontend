import { Component, Input } from '@angular/core';
import { Pais } from 'src/app/interface/pais.interface';
import {
  ProfesionalEspecialidades,
  IdiomasProfesional,
} from 'src/app/interface/profesionales_idiomas.interface';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { IdiomasService } from 'src/app/services/idiomas.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./css/cards.component.css'],
})
export class CardsComponent {
  pais: Pais[];
  userDataIdiomas: IdiomasProfesional[];
  especialidades: ProfesionalEspecialidades[];
  @Input() userData: UsuariosInterface;
  userLoginOn: boolean = false;
  
  constructor(
    private ubicacionesService: UbicacionesService,
    private usuariosServices: UsuarioService,
    private idiomasService: IdiomasService,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.findPais();
    this.findEspecialidades();
    this.findIdiomas();
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  findPais() {
    this.ubicacionesService.obtenerPais(this.userData.dni).subscribe({
      next: (data) => {
        this.pais = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  findEspecialidades() {
    this.usuariosServices.buscarEspecialidad(this.userData.dni).subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('Request Complet');
      },
    });
  }
  findIdiomas() {
    this.idiomasService.obtenerIdiomasProfesional(this.userData.dni).subscribe({
      next: (idiomasData) => {
        this.userDataIdiomas = idiomasData;
      },
    });
  }
}
