import { Document, Types } from 'mongoose';
export type PermisoDocument = Permiso & Document;
export declare class Permiso {
    usuario_id: Types.ObjectId;
    centro_costo_id: Types.ObjectId;
    cliente_id: Types.ObjectId;
    tipo: string;
    asignado_por: Types.ObjectId;
}
export declare const PermisoSchema: import("mongoose").Schema<Permiso, import("mongoose").Model<Permiso, any, any, any, Document<unknown, any, Permiso, any, {}> & Permiso & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Permiso, Document<unknown, {}, import("mongoose").FlatRecord<Permiso>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Permiso> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
