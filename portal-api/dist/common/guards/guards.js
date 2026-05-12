"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisosGuard = exports.RolesGuard = exports.JwtAuthGuard = exports.RequierePermiso = exports.PERMISO_KEY = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
exports.PERMISO_KEY = 'permiso_requerido';
const RequierePermiso = (tipo) => (0, common_1.SetMetadata)(exports.PERMISO_KEY, tipo);
exports.RequierePermiso = RequierePermiso;
let JwtAuthGuard = class JwtAuthGuard {
    canActivate() {
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
let RolesGuard = class RolesGuard {
    canActivate() {
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)()
], RolesGuard);
let PermisosGuard = class PermisosGuard {
    canActivate() {
        return true;
    }
};
exports.PermisosGuard = PermisosGuard;
exports.PermisosGuard = PermisosGuard = __decorate([
    (0, common_1.Injectable)()
], PermisosGuard);
//# sourceMappingURL=guards.js.map