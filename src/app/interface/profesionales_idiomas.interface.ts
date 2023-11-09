import { DecimalPipe } from "@angular/common";

export interface Profesionales_idiomasInterface{
    idProfesionalIdiomas: number;
    idIdioma: number;
    estado?: boolean;
    colegiadoProfesional:string;
}

export interface Idiomas{
    idIdiomas:number;
    nombre: string;
}
export interface IdiomasProfesional{
    
    idIdiomas:number;
    idProfesionalIdiomas: number;
    nombre: string;

}
export interface Foto{
    url: File
}

export interface ProfesionalEspecialidades{
    idProfesionalEspecialidad: number;
    especialidad: string;
}
export interface DatosProfesional{
    nombre: string;
    descripcion: string;
    precioPorHora: number;
}

export interface ClinicasProfesional{
    idClinica: number;
    zona: number;
    calle: string;
    numero: string;
    piso: number;
    referencias_direccion: string;
    telefono: string;
    nombre: string;
    terminosDeAtencion: string;
    ciudad:string;
    estado: string
}