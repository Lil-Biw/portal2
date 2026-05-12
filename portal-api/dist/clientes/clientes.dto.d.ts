declare class DireccionDto {
    calle?: string;
    ciudad?: string;
    region?: string;
    pais?: string;
}
export declare class CreateClienteDto {
    razon_social: string;
    rut: string;
    email_contacto: string;
    telefono?: string;
    direccion?: DireccionDto;
}
declare const UpdateClienteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateClienteDto>>;
export declare class UpdateClienteDto extends UpdateClienteDto_base {
    activo?: boolean;
}
export {};
