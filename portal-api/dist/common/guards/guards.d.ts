import { CanActivate } from '@nestjs/common';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: string[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const PERMISO_KEY = "permiso_requerido";
export declare const RequierePermiso: (tipo: "ver" | "editar") => import("@nestjs/common").CustomDecorator<string>;
export declare class JwtAuthGuard implements CanActivate {
    canActivate(): boolean;
}
export declare class RolesGuard implements CanActivate {
    canActivate(): boolean;
}
export declare class PermisosGuard implements CanActivate {
    canActivate(): boolean;
}
