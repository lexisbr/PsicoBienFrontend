import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerarCita } from '../interface/profesional.interface';
import { DatosCitas, DatosCitasEspera } from '../interface/datosCita.Interface';

@Injectable({
    providedIn: 'root'
})
export class CitaService {

    private apiUrl = 'http://localhost:3000/citas/';

    constructor(
        private http: HttpClient
    ) { }


    agendarCita(formData: GenerarCita) {
        // const headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json');
        // console.log("Datos en FormData:");
        // formData.forEach((value, key) => {
        //   console.log(key, value);
        // });
        return this.http.post<GenerarCita>(`${this.apiUrl}create`, formData);
        
    }
    obtenerCitasEnEspera(colegiado: string){
        return this.http.get<DatosCitasEspera[]>(`${this.apiUrl}citasEnEspera/${colegiado}`);
    }
    aceptarSolicitud(idEvento: number){
        return this.http.post<any>(`${this.apiUrl}aceptar`, {idEvento});
    }
    rechazarSolicitud(idEvento: number){
        return this.http.post<any>(`${this.apiUrl}rechazar`, {idEvento});
    }
}