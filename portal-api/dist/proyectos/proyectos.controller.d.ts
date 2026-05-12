import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto, UpdateProyectoDto, AgregarDocumentoProyectoDto } from './proyectos.dto';
export declare class ProyectosController {
    private readonly proyectosService;
    constructor(proyectosService: ProyectosService);
    create(dto: CreateProyectoDto): Promise<import("mongoose").Document<unknown, {}, import("./proyectos.schema").ProyectoDocument, {}, {}> & import("./proyectos.schema").Proyecto & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: string, limit?: string): Promise<{
        data: (import("mongoose").FlattenMaps<import("./proyectos.schema").ProyectoDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./proyectos.schema").ProyectoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateProyectoDto): Promise<import("mongoose").FlattenMaps<import("./proyectos.schema").ProyectoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
    agregarDocumento(id: string, dto: AgregarDocumentoProyectoDto): Promise<import("mongoose").FlattenMaps<{
        nombre: string;
        url: string;
        tipo_mime: string;
        tamano_bytes?: number;
        subido_por?: import("mongoose").Types.ObjectId;
        subido_en: Date;
    }>>;
    eliminarDocumento(id: string, docId: string): Promise<{
        message: string;
        docId: string;
    }>;
}
