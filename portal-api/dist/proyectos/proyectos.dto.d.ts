export declare class CreateProyectoDto {
    cliente_id: string;
    centro_costo_id: string;
    codigo: string;
    nombre: string;
    descripcion?: string;
    estado?: 'borrador' | 'activo' | 'cerrado';
    fecha_inicio?: string;
    fecha_fin?: string;
}
declare const UpdateProyectoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProyectoDto>>;
export declare class UpdateProyectoDto extends UpdateProyectoDto_base {
    activo?: boolean;
}
export declare class AgregarDocumentoProyectoDto {
    nombre: string;
    url: string;
    tipo_mime: string;
    tamano_bytes?: number;
}
export {};
