"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const clientes_module_1 = require("./clientes/clientes.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const centros_costos_module_1 = require("./centros-costos/centros-costos.module");
const proyectos_module_1 = require("./proyectos/proyectos.module");
const permisos_module_1 = require("./permisos/permisos.module");
const documentos_module_1 = require("./documentos/documentos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            platform_express_1.MulterModule.register({
                limits: { fileSize: 10 * 1024 * 1024 },
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/portal_clientes'),
            clientes_module_1.ClientesModule,
            usuarios_module_1.UsuariosModule,
            centros_costos_module_1.CentrosCostosModule,
            proyectos_module_1.ProyectosModule,
            permisos_module_1.PermisosModule,
            documentos_module_1.DocumentosModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map