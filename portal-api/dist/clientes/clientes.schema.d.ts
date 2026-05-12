import { Document } from 'mongoose';
export type ClienteDocument = Cliente & Document;
export declare class Cliente {
    razon_social: string;
    rut: string;
    email_contacto: string;
    telefono?: string;
    direccion?: {
        calle?: string;
        ciudad?: string;
        region?: string;
        pais?: string;
    };
    activo: boolean;
}
export declare const ClienteSchema: import("mongoose").Schema<Cliente, import("mongoose").Model<Cliente, any, any, any, Document<unknown, any, Cliente, any, {}> & Cliente & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cliente, Document<unknown, {}, import("mongoose").FlatRecord<Cliente>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Cliente> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
