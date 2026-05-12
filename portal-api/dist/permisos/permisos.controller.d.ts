import { AsignarPermisoDto } from './permisos.dto';
import { PermisosService } from './permisos.service';
export declare class PermisosController {
    private readonly permisosService;
    constructor(permisosService: PermisosService);
    asignar(dto: AsignarPermisoDto): Promise<(import("mongoose").Document<unknown, {}, import("./permisos.schema").PermisoDocument, {}, {}> & import("./permisos.schema").Permiso & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | (import("mongoose").FlattenMaps<import("./permisos.schema").PermisoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })>;
    findByUsuario(usuarioId: string): Promise<(import("mongoose").FlattenMaps<import("./permisos.schema").PermisoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByCentro(centroId: string): Promise<(import("mongoose").FlattenMaps<import("./permisos.schema").PermisoDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    revocar(usuarioId: string, centroId: string): Promise<{
        message: string;
    }>;
}
