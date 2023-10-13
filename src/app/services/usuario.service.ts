import { Injectable } from '@angular/core';
import { ResponseI } from '../interface/response.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { UsuariosInterface } from '../interface/usuarios.interface';
import { LoginInterface } from '../interface/login.interface';
@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {

    }

    crearUsuario(form: UsuariosInterface): Observable<ResponseI> {
        return this.http.post<ResponseI>(`http://localhost:3000/usuarios/registrar`, form);
    }
    loginUsuario(form: LoginInterface): Observable<ResponseI>{
        return this.http.post<ResponseI>(``, form);
    }
}