import { Time } from "@angular/common";

export interface Profesional {
    colegiado: number;
    dni: string;
    urlFoto: string;
    estado: number;
}

export interface ProfesionalPagado{
    psicologo: string;
    colegiado: number;
    ganancias_al_mes?: number;
    ganancias_al_anio?: number;
    urlFotoPerfil: string;
}

export interface GenerarCita{
    colegiadoProfesional: string;
    descripcion: string;
    horaInicial: string;
    horaFinal: string;
    fechaEvento: string;
    pacienteDni: string;

}