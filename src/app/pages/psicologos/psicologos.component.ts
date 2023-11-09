import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { Select2Option } from 'ng-select2-component';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

@Component({
  selector: 'app-psicologos',
  templateUrl: './psicologos.component.html',
  styleUrls: ['./css/psicologos.component.css'],
})
export class PsicologosComponent {
  title: string = 'Psicologos';
  userData?: UsuariosInterface[];
  estados: Select2Option[] = [];
  especialidades: Select2Option[] = [];
  selectedIdEstado: number;
  
  constructor(
    private usuarioServices: UsuarioService,
    private ubicacionesService: UbicacionesService,
    private profesionalesService: ProfesionalesService
  ) {}

  ngOnInit() {
    this.fillCard();
    this.ubicacionesService.obtenerEstados('1').subscribe({
      next: (estados) => {
        console.log(estados);
        estados.forEach((estado) => {
          this.estados.push({
            value: estado.idEstado.toString(),
            label: estado.nombre,
          });
        });
        
      }
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
      }
    }); 
  }

  fillCard() {
    console.log('LLamar a la peticion llenar');
    this.usuarioServices.obtenerUsuarios().subscribe({
      next: (userData) => {
        console.log(userData);
        this.userData = userData;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('Request Complet');
      },
    });
  }

  updateEstado($event){
    console.log($event);
    this.selectedIdEstado = $event.value;
  }

  search() {
    console.log("Especialidades", this.especialidades);
  }
}
