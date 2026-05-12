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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ClientesService = class ClientesService {
    constructor(clienteModel) {
        this.clienteModel = clienteModel;
    }
    async create(dto) {
        const existe = await this.clienteModel.findOne({ rut: dto.rut });
        if (existe)
            throw new common_1.ConflictException(`Ya existe un cliente con RUT ${dto.rut}`);
        const cliente = new this.clienteModel(dto);
        return cliente.save();
    }
    async findAll(page = 1, limit = 20, soloActivos = true) {
        const filter = soloActivos ? { activo: true } : {};
        const [data, total] = await Promise.all([
            this.clienteModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.clienteModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const cliente = await this.clienteModel.findById(id).lean();
        if (!cliente)
            throw new common_1.NotFoundException(`Cliente ${id} no encontrado`);
        return cliente;
    }
    async update(id, dto) {
        const cliente = await this.clienteModel
            .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            .lean();
        if (!cliente)
            throw new common_1.NotFoundException(`Cliente ${id} no encontrado`);
        return cliente;
    }
    async remove(id) {
        const cliente = await this.clienteModel
            .findByIdAndUpdate(id, { activo: false }, { new: true })
            .lean();
        if (!cliente)
            throw new common_1.NotFoundException(`Cliente ${id} no encontrado`);
        return { message: 'Cliente desactivado correctamente', id };
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Cliente')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map