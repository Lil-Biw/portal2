"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const permisos_service_1 = require("../permisos/permisos.service");
const SALT_ROUNDS = 10;
let UsuariosService = class UsuariosService {
    constructor(usuarioModel, permisosService) {
        this.usuarioModel = usuarioModel;
        this.permisosService = permisosService;
    }
    async create(dto) {
        const existe = await this.usuarioModel.findOne({ email: dto.email });
        if (existe)
            throw new common_1.ConflictException(`El email ${dto.email} ya está registrado`);
        const { password, permisos, permiso_acceso, ...rest } = dto;
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        const permisoPorDefecto = permiso_acceso || (rest.rol === 'admin_cliente' ? 'editar' : 'ver');
        const usuario = new this.usuarioModel({ ...rest, permiso_acceso: permisoPorDefecto, password_hash });
        const saved = await usuario.save();
        if (permisos && permisos.length > 0) {
            for (const permiso of permisos) {
                await this.permisosService.asignar({ usuario_id: saved._id.toString(), centro_costo_id: permiso.centro_costo_id, tipo: permiso.tipo }, saved._id.toString(), rest.cliente_id.toString());
            }
        }
        const { password_hash: _, ...result } = saved.toObject();
        return result;
    }
    async findAll(page = 1, limit = 20) {
        const filter = { activo: true };
        const [data, total] = await Promise.all([
            this.usuarioModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.usuarioModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findAllByCliente(cliente_id, page = 1, limit = 20) {
        const filter = { cliente_id: new mongoose_2.Types.ObjectId(cliente_id), activo: true };
        const [data, total] = await Promise.all([
            this.usuarioModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.usuarioModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const usuario = await this.usuarioModel.findById(id).lean();
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${id} no encontrado`);
        return usuario;
    }
    async update(id, dto) {
        const usuario = await this.usuarioModel
            .findByIdAndUpdate(id, dto, { new: true })
            .lean();
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${id} no encontrado`);
        return usuario;
    }
    async remove(id) {
        const usuario = await this.usuarioModel
            .findByIdAndUpdate(id, { activo: false }, { new: true })
            .lean();
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${id} no encontrado`);
        return { message: 'Usuario desactivado', id };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Usuario')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        permisos_service_1.PermisosService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map