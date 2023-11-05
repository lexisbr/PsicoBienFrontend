import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private loginService: LoginService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userDni = sessionStorage.getItem('usuario');

    if(userDni == null){
      return false;
    }

    return new Promise<boolean>((resolve) => {
      this.usuarioService.obtenerUsuario(userDni).subscribe({
        next: (userData) => {
          this.loginService.currentUserLoginOn.next(true);
          this.loginService.currentUserData.next(userData);
          resolve(true);
        },
        error: (err) => {
          console.error(err);
          resolve(false);
        },
      });
    });
  }
}
