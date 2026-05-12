"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisosController = void 0;
const common_1 = require("@nestjs/common");
const permisos_dto_1 = require("./permisos.dto");
const permisos_service_1 = require("./permisos.service");
let PermisosController = class PermisosController {
    constructor(permisosService) {
        this.permisosService = permisosService;
    }
    asignar(dto) {
        return this.permisosService.asignar(dto);
    }
    findByUsuario(usuarioId) {
        return this.permisosService.findByUsuario(usuarioId);
    }
    findByCentro(centroId) {
        return this.permisosService.findByCentro(centroId);
    }
    revocar(usuarioId, centroId) {
        return this.permisosService.revocar(usuarioId, centroId);
    }
};
exports.PermisosController = PermisosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permisos_dto_1.AsignarPermisoDto]),
    __metadata("design:returntype", void 0)
], PermisosController.prototype, "asignar", null);
__decorate([
    (0, common_1.Get)('usuario/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermisosController.prototype, "findByUsuario", null);
__decorate([
    (0, common_1.Get)('centro/:centroId'),
    __param(0, (0, common_1.Param)('centroId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermisosController.prototype, "findByCentro", null);
__decorate([
    (0, common_1.Delete)('usuario/:usuarioId/centro/:centroId'),
    __param(0, (0, common_1.Param)('usuarioId')),
    __param(1, (0, common_1.Param)('centroId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PermisosController.prototype, "revocar", null);
exports.PermisosController = PermisosController = __decorate([
    (0, common_1.Controller)('permisos'),
    __metadata("design:paramtypes", [permisos_service_1.PermisosService])
], PermisosController);
//# sourceMappingURL=permisos.controller.js.map