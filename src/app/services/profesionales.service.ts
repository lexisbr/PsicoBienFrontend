import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuscarProfesional } from '../interface/buscar-profesionales.interface';
import { UsuariosInterface } from '../interface/usuarios.interface';
import { Profesional } from '../interface/profesional.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  private apiUrl: string = 'http://localhost:3000/profesionales';

  constructor(private http: HttpClient) {}

  obtenerEspecialidades(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`);
  }

  buscarProfesionales(body: BuscarProfesional) {
    return this.http.post<UsuariosInterface[]>(`${this.apiUrl}/buscar`, body);
  }

  enviarSolicitudRegistro(body: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.apiUrl}/registrar-solicitud`, body, {
      headers,
    });
  }

  obtenerDatosProfesional(colegiado: string) {
    return this.http.get<Profesional>(`${this.apiUrl}/${colegiado}`);
  }

  obtenerProfesionales() {
    return this.http.get<UsuariosInterface[]>(`${this.apiUrl}`);
  }
}
