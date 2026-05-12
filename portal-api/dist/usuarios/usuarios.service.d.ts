import { Model, Types } from 'mongoose';
import { UsuarioDocument } from './usuarios.schema';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuarios.dto';
import { PermisosService } from '../permisos/permisos.service';
export declare class UsuariosService {
    private usuarioModel;
    private permisosService;
    constructor(usuarioModel: Model<UsuarioDocument>, permisosService: PermisosService);
    create(dto: CreateUsuarioDto): Promise<{
        cliente_id: Types.ObjectId;
        nombre: string;
        email: string;
        rol: string;
        permiso_acceso: string;
        activo: boolean;
        ultimo_acceso?: Date;
        _id: Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<UsuarioDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findAllByCliente(cliente_id: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").FlattenMaps<UsuarioDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<UsuarioDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateUsuarioDto): Promise<import("mongoose").FlattenMaps<UsuarioDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
