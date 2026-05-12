import * as multer from 'multer';
export declare class DocumentosService {
    private readonly baseDir;
    constructor();
    private getContextPath;
    subirDocumento(tipo: 'empresa' | 'centro' | 'proyecto', archivo: multer.File, empresa_nombre?: string, centro_nombre?: string, proyecto_nombre?: string): Promise<{
        url: string;
        filename: string;
        size: number;
        tipo_mime: string;
    }>;
    listarDocumentos(tipo: 'empresa' | 'centro' | 'proyecto', empresa_nombre?: string, centro_nombre?: string, proyecto_nombre?: string): {
        filename: string;
        url: string;
        size: number;
    }[];
    eliminarDocumento(tipo: 'empresa' | 'centro' | 'proyecto', filename: string, empresa_nombre?: string, centro_nombre?: string, proyecto_nombre?: string): boolean;
}
