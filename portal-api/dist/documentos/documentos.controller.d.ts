import * as multer from 'multer';
import { DocumentosService } from './documentos.service';
import { SubirDocumentoDto } from './documentos.dto';
export declare class DocumentosController {
    private readonly documentosService;
    constructor(documentosService: DocumentosService);
    subirDocumento(archivo: multer.File, dto: SubirDocumentoDto): Promise<{
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
    eliminarDocumento(filename: string, tipo: 'empresa' | 'centro' | 'proyecto', empresa_nombre?: string, centro_nombre?: string, proyecto_nombre?: string): {
        eliminado: boolean;
        filename: string;
    };
}
