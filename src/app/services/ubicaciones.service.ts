import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Pais } from "../interface/pais.interface";
import { Estado } from "../interface/estado.interface";
import { Ciudad } from "../interface/ciudad.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class UbicacionesService {

    constructor(private http: HttpClient){}

    obtenerPaises(){
        return this.http.get<Pais[]>(`${environment.ubicacionesUrl}/paises`);
    }
    obtenerPais(dni: string){
        return this.http.get<Pais[]>(`${environment.ubicacionesUrl}/paises/${dni}`);
    }

    obtenerEstados(idPais: string){
        return this.http.get<Estado[]>(`${environment.ubicacionesUrl}/estados/${idPais}`);
    }

    obtenerCiudades(idEstado: string){
        return this.http.get<Ciudad[]>(`${environment.ubicacionesUrl}/ciudades/${idEstado}`);
    }
    buscarPais(dni: string){
        return this.http.get<Pais[]>(`${environment.usuariosUrl}/userPais/${dni}`);
    }
}