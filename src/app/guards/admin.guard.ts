import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { LoginService } from '../services/auth/login.service';
import { TipoUsuario } from '../enum/tipos-usuario.enum';
import { LoginGuard } from './login.guard';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private loginGuard: LoginGuard
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const canActivate = await this.loginGuard.canActivate(route, state);

    if (canActivate) {
      return new Promise<boolean>((resolve) => {
        this.loginService.currentUserData.subscribe({
          next: (userData) => {
            resolve(userData.idTipoUsuario == TipoUsuario.ADMINISTRADOR);
          },
        });
      });
    }

    return false;
  }
}
