export declare class CreateCentroCostoDto {
    cliente_id: string;
    codigo: string;
    nombre: string;
    descripcion?: string;
    ubicacion_direccion?: string;
    ubicacion_ciudad?: string;
    ubicacion_region?: string;
    ubicacion_pais?: string;
}
declare const UpdateCentroCostoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCentroCostoDto>>;
export declare class UpdateCentroCostoDto extends UpdateCentroCostoDto_base {
    activo?: boolean;
}
export declare class AgregarDocumentoDto {
    nombre: string;
    url: string;
    tipo_mime: string;
    tamano_bytes?: number;
}
export {};
