import { Component } from '@angular/core';
import { Pais } from 'src/app/interface/pais.interface';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./css/home.component.css'],
})
export class HomeComponent {
  userLoginOn: boolean = false;
  userData?: UsuariosInterface;
  usersData?: UsuariosInterface[];
  pais: Pais;
  constructor(
    private profesionalesService: ProfesionalesService
  ) {}

  ngOnInit() {
    this.fillCard();
  }

  fillCard() {
    this.profesionalesService.obtenerProfesionales().subscribe({
      next: (usersData) => {
        this.usersData = usersData;
        console.log(usersData)
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
