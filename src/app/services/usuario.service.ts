import { Injectable } from '@angular/core';
import { UsuariosInterface } from '../interface/usuarios.interface';
import { ResponseI } from '../interface/response.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {

    }

    crearUsuario(form: UsuariosInterface): Observable<ResponseI> {
        return this.http.post<ResponseI>(`http://localhost:5000/usuarios/create`, form);
    }
}