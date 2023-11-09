import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuscarProfesional } from '../interface/buscar-profesionales.interface';
import { UsuariosInterface } from '../interface/usuarios.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  private apiUrl: string = 'http://localhost:3000/profesionales';

  constructor(private http: HttpClient) {}

  obtenerEspecialidades(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`);
  }

  buscarProfesionales(body : BuscarProfesional){
    return this.http.post<UsuariosInterface[]>(`${this.apiUrl}/buscar`,body);
  }
}
