import { Component } from '@angular/core';
import { ProfesionalPagado } from 'src/app/interface/profesional.interface';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

@Component({
  selector: 'app-top-five2',
  templateUrl: './top-five2.component.html',
  styleUrls: ['./css/top-five2.component.css']
})
export class TopFive2Component {
  mejorPagadoAnio: ProfesionalPagado[];
  constructor(private profesionalesServices: ProfesionalesService) { }
  ngOnInit() {
    this.obtenerMejorPagadoAnio();
  }
  obtenerMejorPagadoAnio(){
    let fechaActual = new Date();
    let mes = fechaActual.getFullYear() ;

    this.profesionalesServices.obtenerMejorPagadoTopAnio(mes).subscribe({
      next: (data) => {
        console.log("año ", data)
        this.mejorPagadoAnio = data;
      },
    })

  }
}
