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
exports.CentrosCostosController = void 0;
const common_1 = require("@nestjs/common");
const centros_costos_service_1 = require("./centros-costos.service");
const centros_costos_dto_1 = require("./centros-costos.dto");
let CentrosCostosController = class CentrosCostosController {
    constructor(centrosCostosService) {
        this.centrosCostosService = centrosCostosService;
    }
    create(dto) {
        return this.centrosCostosService.create(dto);
    }
    findAll(page = '1', limit = '20') {
        return this.centrosCostosService.findAll(+page, +limit);
    }
    findOne(id) {
        return this.centrosCostosService.findOne(id);
    }
    update(id, dto) {
        return this.centrosCostosService.update(id, dto);
    }
    remove(id) {
        return this.centrosCostosService.remove(id);
    }
    agregarDocumento(id, dto) {
        return this.centrosCostosService.agregarDocumento(id, dto);
    }
    eliminarDocumento(centroCostoId, docId) {
        return this.centrosCostosService.eliminarDocumento(centroCostoId, docId);
    }
};
exports.CentrosCostosController = CentrosCostosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [centros_costos_dto_1.CreateCentroCostoDto]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, centros_costos_dto_1.UpdateCentroCostoDto]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':centroCostoId/documentos'),
    __param(0, (0, common_1.Param)('centroCostoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, centros_costos_dto_1.AgregarDocumentoDto]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "agregarDocumento", null);
__decorate([
    (0, common_1.Delete)(':centroCostoId/documentos/:docId'),
    __param(0, (0, common_1.Param)('centroCostoId')),
    __param(1, (0, common_1.Param)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CentrosCostosController.prototype, "eliminarDocumento", null);
exports.CentrosCostosController = CentrosCostosController = __decorate([
    (0, common_1.Controller)('centros-costos'),
    __metadata("design:paramtypes", [centros_costos_service_1.CentrosCostosService])
], CentrosCostosController);
//# sourceMappingURL=centros-costos.controller.js.map