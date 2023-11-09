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
    idTipoUsuario?: number;
    idPais?: number;
    especialidades?: string[];
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