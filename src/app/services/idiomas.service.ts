import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  IdiomasProfesional, Idiomas } from '../interface/profesionales_idiomas.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  constructor(private http: HttpClient) { }

  // obtenerIdiomas
  obtenerIdiomas() {
    return this.http.get<IdiomasProfesional[]>(`${environment.idiomasUrl}/find`)
  }

  obtenerIdiomasProfesional(dni: string) {
    return this.http.get<IdiomasProfesional[]>(`${environment.idiomasUrl}/buscarIdiomas/${dni}`)
  }

}
