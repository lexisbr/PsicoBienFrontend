import { Component } from '@angular/core';
import { Profesional, ProfesionalPagado } from 'src/app/interface/profesional.interface';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./css/top-five.component.css']
})
export class TopFiveComponent {
  userLoginOn: boolean = false;
  userData?: UsuariosInterface[];
  mejorPagadoTop: ProfesionalPagado[];
  constructor(private profesionalesServices: ProfesionalesService) { }
  ngOnInit() {
    this.fillCard();
    this.obtenerMejorPagadoDelMesTop();
  }
  fillCard() {
    this.profesionalesServices.obtener().subscribe({
      next: (usersData) => {
        this.userData = usersData;
      },
      error: (err) => {
        console.error(err);
      },
    })
  }

  obtenerMejorPagadoDelMesTop() {
    let fechaActual = new Date();
    let mes = fechaActual.getMonth() + 1;
    this.profesionalesServices.obtenerMejorPagadoTop(mes).subscribe({
      next: (data) => {
        console.log("asdgkjasdng ", data)
        this.mejorPagadoTop = data;
      },
    })
  }



}
