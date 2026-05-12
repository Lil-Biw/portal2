"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentrosCostosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const centros_costos_schema_1 = require("./centros-costos.schema");
const centros_costos_controller_1 = require("./centros-costos.controller");
const centros_costos_service_1 = require("./centros-costos.service");
const permisos_schema_1 = require("../permisos/permisos.schema");
let CentrosCostosModule = class CentrosCostosModule {
};
exports.CentrosCostosModule = CentrosCostosModule;
exports.CentrosCostosModule = CentrosCostosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'CentroCosto', schema: centros_costos_schema_1.CentroCostoSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Permiso', schema: permisos_schema_1.PermisoSchema }]),
        ],
        controllers: [centros_costos_controller_1.CentrosCostosController],
        providers: [centros_costos_service_1.CentrosCostosService],
        exports: [centros_costos_service_1.CentrosCostosService],
    })
], CentrosCostosModule);
//# sourceMappingURL=centros-costos.module.js.map