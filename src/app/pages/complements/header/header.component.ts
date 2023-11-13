import { Component, OnInit } from '@angular/core';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/enum/tipos-usuario.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./css/header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  userData?: UsuariosInterface;

  get isPaciente(): boolean {
    return this.userData.idTipoUsuario == TipoUsuario.PACIENTE;
  }

  get isProfesional(): boolean {
    return this.userData.idTipoUsuario == TipoUsuario.PROFESIONAL;
  }

  constructor(
    private usuariosServices: UsuarioService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    );
    this.loginService.currentUserData.subscribe(
      {
        next:(userData)=>{
          this.userData= userData;
        }
      }
    )
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/home');
  }
}
