import { Injectable } from '@angular/core';
import { ResponseI } from '../interface/response.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  DatosProfesional,
  ProfesionalEspecialidades,
} from '../interface/profesionales_idiomas.interface';
import {
  UserResponse,
  UsuarioEspecialidades,
  UsuariosInterface,
} from '../interface/usuarios.interface';
import { LoginInterface } from '../interface/login.interface';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url: string = 'http://localhost:3000/usuarios';
  currentUserData: BehaviorSubject<UsuariosInterface[]> = new BehaviorSubject<
    UsuariosInterface[]
  >([]);

  constructor(private http: HttpClient) {}
  login(form: UsuariosInterface): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.usuariosUrl}/login`, form)
      .pipe(
        map((res: UserResponse) => {
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  obtenerUsuario(DNI) {
    return this.http.get<UsuariosInterface>(`${this.url}/users/${DNI}`);
  }

  obtenerUsuarios() {
    return this.http.get<UsuariosInterface[]>(`${this.url}/users`).pipe(
      map((res: UsuariosInterface[]) => {
        return res;
      }),
      tap((userData) => {
        this.currentUserData.next(userData);
      }),
      catchError(this.handlerError)
    );
  }

  crearUsuario(form: UsuariosInterface): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.url}/registrar`, form);
  }

  buscarEspecialidad(dni: string) {
    return this.http.get<ProfesionalEspecialidades[]>(
      `${environment.usuariosUrl}/userEspecialidad/${dni}`
    );
  }

  datosProfesional(colegiado: string) {
    return this.http.get<DatosProfesional>(
      `${environment.profesionalesUrl}/datosProfesionales/${colegiado}`
    );
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
