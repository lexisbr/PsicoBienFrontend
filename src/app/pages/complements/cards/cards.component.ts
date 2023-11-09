import { Component, Input } from '@angular/core';
import { Pais } from 'src/app/interface/pais.interface';
import {
  ProfesionalEspecialidades,
  IdiomasProfesional,
} from 'src/app/interface/profesionales_idiomas.interface';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
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

  constructor(
    private ubicasionesServices: UbicacionesService,
    private usuariosServices: UsuarioService,
    private idiomasService: IdiomasService
  ) {}
  ngOnInit() {
    this.findPais();
    this.findEspecialidades();
    this.findIdiomas();
  }
  findPais() {
    this.ubicasionesServices.obtenerPais(this.userData.dni).subscribe({
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
