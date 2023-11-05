import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuariosInterface } from 'src/app/interface/usuarios.interface';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<UsuariosInterface> =
    new BehaviorSubject<UsuariosInterface>({ dni: '', email: '' });

  get userData(): Observable<UsuariosInterface> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<UsuariosInterface> {
    return this.http
      .post<UsuariosInterface>(`${environment.usuariosUrl}/login`, credentials)
      .pipe(
        map((res: UsuariosInterface) => {
          console.log('Res =>', res);
          return res;
        }),
        tap((userData) => {
          this.currentUserData.next(userData);
          this.currentUserLoginOn.next(true);
        }),
        catchError(this.handlerError)
      );
  }

  logout(): void {
    sessionStorage.removeItem('usuario');
    this.currentUserLoginOn.next(false);
    this.currentUserData.next({ dni: '', email: '' });
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('algo falló. Por favor intente nuevamente')
    );
  }
}
