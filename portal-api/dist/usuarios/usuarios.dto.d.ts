export declare class PermisoUsuarioDto {
    centro_costo_id: string;
    tipo: 'ver' | 'editar';
}
export declare class CreateUsuarioDto {
    cliente_id: string;
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    permiso_acceso?: 'ver' | 'editar';
    permisos?: PermisoUsuarioDto[];
}
declare const UpdateUsuarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateUsuarioDto, "cliente_id" | "password">>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    activo?: boolean;
}
export declare class CambiarPasswordDto {
    password_actual: string;
    password_nueva: string;
}
export {};
