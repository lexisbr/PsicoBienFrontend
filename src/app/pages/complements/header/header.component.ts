import { Component, OnInit } from '@angular/core';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./css/header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  userData?: UsuariosInterface;
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
          console.log("Profile(header)",userData)
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
