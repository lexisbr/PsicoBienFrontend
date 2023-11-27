import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuscarProfesional } from '../interface/buscar-profesionales.interface';
import { UsuariosInterface } from '../interface/usuarios.interface';
import { Profesional } from '../interface/profesional.interface';
import { ProfesionalPagado } from '../interface/profesional.interface';
import { ClientesTop } from '../interface/usuarios.interface';
import { aN } from '@fullcalendar/core/internal-common';
import { DatosCitas } from '../interface/datosCita.Interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  private apiUrl: string = 'http://localhost:3000/profesionales';

  constructor(private http: HttpClient) {}

  obtener(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }
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

  obtenerMejorPagadoMes(mes: number){
    return this.http.get<ProfesionalPagado[]>(`${this.apiUrl}/pagadoMes/${mes}`);
  }
  obtenerMejorPagadoAnio(anio: number){
    return this.http.get<ProfesionalPagado[]>(`${this.apiUrl}/pagadoAnio/${anio}`);
  }
  obtenerMejorPagadoTop(mes: number){
    return this.http.get<ProfesionalPagado[]>(`${this.apiUrl}/pagadoMesTop/${mes}`);
  }
  obtenerMejorPagadoTopAnio(anio: number){
    return this.http.get<ProfesionalPagado[]>(`${this.apiUrl}/pagadoAnioTop/${anio}`);
  }
  obtenerClientesTop(limit: number){
    return this.http.get<ClientesTop[]>(`${this.apiUrl}/clientestop/${limit}`);
  }
  obtenerDatosCitas(colegiado: string){
    return this.http.get<DatosCitas[]>(`${this.apiUrl}/citasP/${colegiado}`);
  }

  obtenerDatosCitasPaciente(dni: string){
    return this.http.get<DatosCitas[]>(`${environment.usuariosUrl}/obtenerCitasPaciente/${dni}`);
  }
}
