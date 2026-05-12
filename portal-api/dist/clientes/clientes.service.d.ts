import { Model } from 'mongoose';
import { Cliente, ClienteDocument } from './clientes.schema';
import { CreateClienteDto, UpdateClienteDto } from './clientes.dto';
export declare class ClientesService {
    private clienteModel;
    constructor(clienteModel: Model<ClienteDocument>);
    create(dto: CreateClienteDto): Promise<import("mongoose").Document<unknown, {}, ClienteDocument, {}, {}> & Cliente & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: number, limit?: number, soloActivos?: boolean): Promise<{
        data: (import("mongoose").FlattenMaps<ClienteDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<ClienteDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateClienteDto): Promise<import("mongoose").FlattenMaps<ClienteDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
