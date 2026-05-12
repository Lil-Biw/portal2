"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const proyectos_schema_1 = require("./proyectos.schema");
const proyectos_controller_1 = require("./proyectos.controller");
const proyectos_service_1 = require("./proyectos.service");
const centros_costos_schema_1 = require("../centros-costos/centros-costos.schema");
let ProyectosModule = class ProyectosModule {
};
exports.ProyectosModule = ProyectosModule;
exports.ProyectosModule = ProyectosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Proyecto', schema: proyectos_schema_1.ProyectoSchema },
                { name: 'CentroCosto', schema: centros_costos_schema_1.CentroCostoSchema },
            ]),
        ],
        controllers: [proyectos_controller_1.ProyectosController],
        providers: [proyectos_service_1.ProyectosService],
        exports: [proyectos_service_1.ProyectosService],
    })
], ProyectosModule);
//# sourceMappingURL=proyectos.module.js.map