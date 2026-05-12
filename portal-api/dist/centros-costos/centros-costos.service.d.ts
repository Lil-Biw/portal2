import { Model, Types } from 'mongoose';
import { CentroCostoDocument } from './centros-costos.schema';
import { CreateCentroCostoDto, UpdateCentroCostoDto, AgregarDocumentoDto } from './centros-costos.dto';
export declare class CentrosCostosService {
    private centroCostoModel;
    constructor(centroCostoModel: Model<CentroCostoDocument>);
    create(dto: CreateCentroCostoDto): Promise<import("mongoose").Document<unknown, {}, CentroCostoDocument, {}, {}> & import("./centros-costos.schema").CentroCosto & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<CentroCostoDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findAllByCliente(cliente_id: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<CentroCostoDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findByIds(ids: string[]): Promise<(import("mongoose").FlattenMaps<CentroCostoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<CentroCostoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateCentroCostoDto): Promise<import("mongoose").FlattenMaps<CentroCostoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
    agregarDocumento(id: string, dto: AgregarDocumentoDto, usuarioId?: string): Promise<import("mongoose").FlattenMaps<{
        nombre: string;
        url: string;
        tipo_mime: string;
        tamano_bytes?: number;
        subido_por: Types.ObjectId;
        subido_en: Date;
    }>>;
    eliminarDocumento(centroId: string, docId: string): Promise<{
        message: string;
        docId: string;
    }>;
}
