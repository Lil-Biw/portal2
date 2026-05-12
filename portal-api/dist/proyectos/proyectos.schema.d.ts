import { Document, Types } from 'mongoose';
export type ProyectoDocument = Proyecto & Document;
declare class Documento {
    nombre: string;
    url: string;
    tipo_mime: string;
    tamano_bytes?: number;
    subido_por?: Types.ObjectId;
    subido_en: Date;
}
export declare class Proyecto {
    centro_costo_id: Types.ObjectId;
    cliente_id: Types.ObjectId;
    codigo: string;
    nombre: string;
    descripcion?: string;
    estado: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    documentos: Documento[];
    creado_por?: Types.ObjectId;
}
export declare const ProyectoSchema: import("mongoose").Schema<Proyecto, import("mongoose").Model<Proyecto, any, any, any, Document<unknown, any, Proyecto, any, {}> & Proyecto & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Proyecto, Document<unknown, {}, import("mongoose").FlatRecord<Proyecto>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Proyecto> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
