import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/admin/'; 

  constructor(
    private http: HttpClient
  ) {}

  obtenerSolicitudes(){
    return this.http.get<any[]>(`${this.apiUrl}solicitudes`);
  }

  aceptarSolicitud(colegiado: number){
    return this.http.post<any>(`${this.apiUrl}aceptar-solicitud`, {colegiado});
  }

  rechazarSolicitud(colegiado: number){
    return this.http.post<any>(`${this.apiUrl}rechazar-solicitud`, {colegiado});
  }
}