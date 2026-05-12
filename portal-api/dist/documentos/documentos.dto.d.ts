export declare class SubirDocumentoDto {
    cliente_id: string;
    tipo: 'empresa' | 'centro' | 'proyecto';
    centro_id?: string;
    proyecto_id?: string;
    empresa_nombre?: string;
    centro_nombre?: string;
    proyecto_nombre?: string;
}
