import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Pais } from "../interface/pais.interface";
import { Estado } from "../interface/estado.interface";
import { Ciudad } from "../interface/ciudad.interface";

@Injectable({
    providedIn: 'root',
})
export class UbicacionesService {

    url: string = 'http://localhost:3000/ubicaciones';

    constructor(private httpClient: HttpClient){}

    obtenerPaises(){
        return this.httpClient.get<Pais[]>(`${this.url}/paises`);
    }

    obtenerEstados(idPais: string){
        return this.httpClient.get<Estado[]>(`${this.url}/estados/${idPais}`);
    }

    obtenerCiudades(idEstado: string){
        return this.httpClient.get<Ciudad[]>(`${this.url}/ciudades/${idEstado}`);
    }
}