import { Document, Types } from 'mongoose';
export type UsuarioDocument = Usuario & Document;
export declare class Usuario {
    cliente_id: Types.ObjectId;
    nombre: string;
    email: string;
    password_hash: string;
    rol: string;
    permiso_acceso: string;
    activo: boolean;
    ultimo_acceso?: Date;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, Document<unknown, any, Usuario, any, {}> & Usuario & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, Document<unknown, {}, import("mongoose").FlatRecord<Usuario>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Usuario> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
