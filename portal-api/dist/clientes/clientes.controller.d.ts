import { ClientesService } from './clientes.service';
import { CreateClienteDto, UpdateClienteDto } from './clientes.dto';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(dto: CreateClienteDto): Promise<import("mongoose").Document<unknown, {}, import("./clientes.schema").ClienteDocument, {}, {}> & import("./clientes.schema").Cliente & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: string, limit?: string, activos?: string): Promise<{
        data: (import("mongoose").FlattenMaps<import("./clientes.schema").ClienteDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./clientes.schema").ClienteDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateClienteDto): Promise<import("mongoose").FlattenMaps<import("./clientes.schema").ClienteDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
