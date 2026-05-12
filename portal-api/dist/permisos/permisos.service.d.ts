import { Model, Types } from 'mongoose';
import { PermisoDocument } from './permisos.schema';
import { AsignarPermisoDto } from './permisos.dto';
export declare class PermisosService {
    private permisoModel;
    constructor(permisoModel: Model<PermisoDocument>);
    asignar(dto: AsignarPermisoDto, asignadoPor?: string, clienteId?: string): Promise<(import("mongoose").Document<unknown, {}, PermisoDocument, {}, {}> & import("./permisos.schema").Permiso & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | (import("mongoose").FlattenMaps<PermisoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })>;
    findByUsuario(usuario_id: string): Promise<(import("mongoose").FlattenMaps<PermisoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByCentro(centro_costo_id: string): Promise<(import("mongoose").FlattenMaps<PermisoDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    revocar(usuario_id: string, centro_costo_id: string): Promise<{
        message: string;
    }>;
}
