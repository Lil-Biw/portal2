import { Model, Types } from 'mongoose';
import { ProyectoDocument } from './proyectos.schema';
import { CreateProyectoDto, UpdateProyectoDto, AgregarDocumentoProyectoDto } from './proyectos.dto';
export declare class ProyectosService {
    private proyectoModel;
    private centroCostoModel;
    constructor(proyectoModel: Model<ProyectoDocument>, centroCostoModel: Model<any>);
    private validarCentroEnCliente;
    create(dto: CreateProyectoDto, creadoPor?: string): Promise<import("mongoose").Document<unknown, {}, ProyectoDocument, {}, {}> & import("./proyectos.schema").Proyecto & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<ProyectoDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findAllByCentro(centro_costo_id: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<ProyectoDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<ProyectoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateProyectoDto): Promise<import("mongoose").FlattenMaps<ProyectoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
    agregarDocumento(id: string, dto: AgregarDocumentoProyectoDto, usuarioId?: string): Promise<import("mongoose").FlattenMaps<{
        nombre: string;
        url: string;
        tipo_mime: string;
        tamano_bytes?: number;
        subido_por?: Types.ObjectId;
        subido_en: Date;
    }>>;
    eliminarDocumento(proyectoId: string, docId: string): Promise<{
        message: string;
        docId: string;
    }>;
}
