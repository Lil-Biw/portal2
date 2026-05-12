import { Document, Types } from 'mongoose';
export type CentroCostoDocument = CentroCosto & Document;
declare class Documento {
    nombre: string;
    url: string;
    tipo_mime: string;
    tamano_bytes?: number;
    subido_por: Types.ObjectId;
    subido_en: Date;
}
export declare class CentroCosto {
    cliente_id: Types.ObjectId;
    codigo: string;
    nombre: string;
    descripcion?: string;
    ubicacion_direccion?: string;
    ubicacion_ciudad?: string;
    ubicacion_region?: string;
    ubicacion_pais?: string;
    activo: boolean;
    documentos: Documento[];
}
export declare const CentroCostoSchema: import("mongoose").Schema<CentroCosto, import("mongoose").Model<CentroCosto, any, any, any, Document<unknown, any, CentroCosto, any, {}> & CentroCosto & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CentroCosto, Document<unknown, {}, import("mongoose").FlatRecord<CentroCosto>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<CentroCosto> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
