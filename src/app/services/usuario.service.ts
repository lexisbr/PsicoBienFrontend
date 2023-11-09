import { Injectable } from '@angular/core';
import { ResponseI } from '../interface/response.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, throwError } from 'rxjs'

import { UserResponse, UsuariosInterface } from '../interface/usuarios.interface';
import { LoginInterface } from '../interface/login.interface';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    url: string = 'http://localhost:3000/usuarios';
    currentUserData: BehaviorSubject<UsuariosInterface[]> = new BehaviorSubject<UsuariosInterface[]>([])

    constructor(private http: HttpClient) { }
    login(form: UsuariosInterface): Observable<UserResponse | void> {
        return this.http
            .post<UserResponse>(`${environment.usuariosUrl}/login`, form)
            .pipe(
                map((res: UserResponse) => {
                    console.log('Res =>', res)

                }),
                catchError((err) => this.handlerError(err))
            );
    }
    
    private readToken(): void { }

    private saveToken(token: string): void {
        localStorage.setItem('token', token)
    }


    obtenerUsuario(DNI) {
        return this.http.get<UsuariosInterface>(`${this.url}/users/${DNI}`);
    }
    obtenerUsuarios() {
        return this.http.get<UsuariosInterface[]>(`${this.url}/users`).pipe(
            map((res: UsuariosInterface[]) => {
                console.log('Res =>', res)
                return res
            }),
            tap(userData => {
                this.currentUserData.next(userData);
            }),
            catchError(this.handlerError)
        );;
    }
    crearUsuario(form: UsuariosInterface): Observable<ResponseI> {
        return this.http.post<ResponseI>(`${this.url}/registrar`, form);
    }
    loginUsuario(form: LoginInterface): Observable<UsuariosInterface | void> {
        return this.http
            .post<UsuariosInterface>(`${this.url}/login`, form)
            .pipe(
                map((res: UsuariosInterface) => {
                    console.log('Res =>', res)
                    return res
                }),
                catchError((err) => this.handlerError(err))
            );
    }
    get userData():Observable<UsuariosInterface[]>{
        return this.currentUserData.asObservable();
    }
    private handlerError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Se ha producido un error ', error.error)
        }
        else {
            console.error('Backend retornó el código de estado ', error.status, error.error)
        }
        return throwError(() => new Error('algo falló. Por favor intente nuevamente'))
    }
}