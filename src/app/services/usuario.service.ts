import { Injectable } from '@angular/core';
import { ResponseI } from '../interface/response.interface';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs'

import { UsuariosInterface } from '../interface/usuarios.interface';
import { LoginInterface } from '../interface/login.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    url: string = 'http://localhost:3000/usuarios';
    constructor(private http: HttpClient) { }

    obtenerUsuarios() {
        return this.http.get<UsuariosInterface[]>(`${this.url}/users`);
    }
    crearUsuario(form: UsuariosInterface): Observable<ResponseI> {
        return this.http.post<ResponseI>(`${this.url}/registrar`, form);
    }
    loginUsuario(form: LoginInterface): Observable<ResponseI | void> {
        return this.http
            .post<ResponseI>(`${this.url}/login`, form)
            .pipe(
                map((res: ResponseI) => {
                    console.log('Res =>', res)
                }),
                catchError((err) => this.handlerError(err))
            );
    }

    private handlerError(err): Observable<never> {
        let errorMessage = 'An errror occured retrienving data'
        if (err) {
            if (err.message == "404") {

                errorMessage = `Usuario no encontrado`;
            }
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}