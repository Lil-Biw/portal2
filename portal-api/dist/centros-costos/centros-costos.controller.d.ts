import { CentrosCostosService } from './centros-costos.service';
import { CreateCentroCostoDto, UpdateCentroCostoDto, AgregarDocumentoDto } from './centros-costos.dto';
export declare class CentrosCostosController {
    private readonly centrosCostosService;
    constructor(centrosCostosService: CentrosCostosService);
    create(dto: CreateCentroCostoDto): Promise<import("mongoose").Document<unknown, {}, import("./centros-costos.schema").CentroCostoDocument, {}, {}> & import("./centros-costos.schema").CentroCosto & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: string, limit?: string): Promise<{
        data: (import("mongoose").FlattenMaps<import("./centros-costos.schema").CentroCostoDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./centros-costos.schema").CentroCostoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateCentroCostoDto): Promise<import("mongoose").FlattenMaps<import("./centros-costos.schema").CentroCostoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
    agregarDocumento(id: string, dto: AgregarDocumentoDto): Promise<import("mongoose").FlattenMaps<{
        nombre: string;
        url: string;
        tipo_mime: string;
        tamano_bytes?: number;
        subido_por: import("mongoose").Types.ObjectId;
        subido_en: Date;
    }>>;
    eliminarDocumento(centroCostoId: string, docId: string): Promise<{
        message: string;
        docId: string;
    }>;
}
