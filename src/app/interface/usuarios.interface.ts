import { TipoUsuario } from "../enum/tipos-usuario.enum";

export type Roles = 'SUSCRIPTOR' | 'ADMIN'

export interface UsuariosInterface{
    dni: string;
    nombre?: string;
    apellido?: string;
    email: string;
    fechaNacimiento?: string;
    genero?: string;
    telefono?: string;
    password?: string;
    paswordVal?: string;
    urlFotoPerfil?: string;
    urlFotoPortada?: string;
    direccion?: string;
    estado?:boolean;
    colegiadoProfesional?: string;
    idTipoUsuario?: TipoUsuario;
    especialidades?: string[];
    idCiudad?: number;
}

export interface UserResponse{
    message: string;
    token: string;
    userId: number;
    role: Roles;
}

export interface UsuarioEspecialidades{
    especialidad: string;
}
export interface ClientesTop{

    dni: string;
    paciente: string;
    total_citas: number;
    urlFotoPerfil?: string;
}