import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { Select2Option } from 'ng-select2-component';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { BuscarProfesional } from 'src/app/interface/buscar-profesionales.interface';
import { SearchbarComponent } from '../complements/searchbar/searchbar.component';
import { Router } from '@angular/router';
import { ProfesionalPagado } from 'src/app/interface/profesional.interface';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./css/psicologos.component.css'],
})
export class PsicologosComponent {
  title: string = 'Psicologos';
  profesionales?: UsuariosInterface[];
  estados: Select2Option[] = [];
  especialidades: Select2Option[] = [];
  selectedIdEstado: number = null;
  selectedEspecialidades: string[] = [];
  mejorPagado: ProfesionalPagado[];
  mejorPagadoAnio: ProfesionalPagado[];


  @ViewChild('searchbar') searchbar: SearchbarComponent;

  constructor(
    private ubicacionesService: UbicacionesService,
    private profesionalesService: ProfesionalesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerMejorPagadoDelMes();
    this.obtenerMejorPagadoDelAnio();
    this.search();
    this.estados.push({ value: '', label: 'Seleccione un departamento' });
    this.ubicacionesService.obtenerEstados('1').subscribe({
      next: (estados) => {
        estados.forEach((estado) => {
          this.estados.push({
            value: estado.idEstado.toString(),
            label: estado.nombre,
          });
        });
      },
    });

    this.profesionalesService.obtenerEspecialidades().subscribe({
      next: (especialidades) => {
        especialidades.forEach((especialidad, index) => {
          this.especialidades.push({
            value: index,
            label: especialidad.especialidad,
          });
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateEstado($event) {
    console.log($event);
    this.selectedIdEstado = $event.value === '' ? null : +$event.value;
  }

  addEspecialidades($event) {
    const options = $event.options;
    console.log(options);
    const optionsList = options.map((option) => `'${option.label}'`);
    this.selectedEspecialidades = optionsList;
  }

  search() {
    console.log(this.selectedEspecialidades.join(','));
    const body: BuscarProfesional = {
      nombreCompleto: this.searchbar?.value ?? '',
      especialidades: this.selectedEspecialidades.join(','),
      idEstado: this.selectedIdEstado,
    };
    this.profesionalesService.buscarProfesionales(body).subscribe({
      next: (profesionales) => {
        console.log(profesionales);
        this.profesionales = profesionales;
      },
    });
  }

  openProfile(dni: string) {
    console.log(dni);
    this.router.navigate(['/profile', dni]);
  }

  obtenerMejorPagadoDelMes(){
    let fechaActual = new Date();
    let mes = fechaActual.getMonth()+1;
    this.profesionalesService.obtenerMejorPagadoMes(mes).subscribe({
      next: (data) => {
        console.log(`Este es el mejor pagado del mes ${mes} `,data)
        this.mejorPagado = data;
      },
    })
  }
  obtenerMejorPagadoDelAnio(){
    let fechaActual = new Date();
    let anio = fechaActual.getFullYear();
    this.profesionalesService.obtenerMejorPagadoAnio(anio).subscribe({
      next: (data) => {
        console.log(`Este es el mejor pagado del mes ${anio} `,data)
        this.mejorPagadoAnio = data;
      },
    })
  }

}