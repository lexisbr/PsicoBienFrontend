export interface DatosCitas {
    idEvento?: number;
    publicId: number;
    title: string;
    start: Date;
    end: Date;
    description: string;
    color: string;
}

export interface DatosCitasEspera {
    idEvento?: number;
    nombre?: string;
    publicId: number;
    apellido?: string;
    email?:string;
    dni?: string;
    title: string;
    horaInicial: Date;
    horaFinal: Date;
    fechaEvento: Date;
    description: string;
    color: string;
}