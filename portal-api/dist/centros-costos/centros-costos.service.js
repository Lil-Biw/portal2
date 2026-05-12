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
exports.CentrosCostosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CentrosCostosService = class CentrosCostosService {
    constructor(centroCostoModel) {
        this.centroCostoModel = centroCostoModel;
    }
    async create(dto) {
        const existe = await this.centroCostoModel.findOne({
            cliente_id: dto.cliente_id,
            codigo: dto.codigo,
        });
        if (existe)
            throw new common_1.ConflictException(`Ya existe el código ${dto.codigo} en este cliente`);
        return new this.centroCostoModel(dto).save();
    }
    async findAll(page = 1, limit = 20) {
        const filter = { activo: true };
        const [data, total] = await Promise.all([
            this.centroCostoModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.centroCostoModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findAllByCliente(cliente_id, page = 1, limit = 20) {
        const filter = { cliente_id: new mongoose_2.Types.ObjectId(cliente_id), activo: true };
        const [data, total] = await Promise.all([
            this.centroCostoModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.centroCostoModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findByIds(ids) {
        return this.centroCostoModel
            .find({ _id: { $in: ids.map(id => new mongoose_2.Types.ObjectId(id)) }, activo: true })
            .lean();
    }
    async findOne(id) {
        const centro = await this.centroCostoModel.findById(id).lean();
        if (!centro)
            throw new common_1.NotFoundException(`Centro de costos ${id} no encontrado`);
        return centro;
    }
    async update(id, dto) {
        const centro = await this.centroCostoModel
            .findByIdAndUpdate(id, dto, { new: true })
            .lean();
        if (!centro)
            throw new common_1.NotFoundException(`Centro de costos ${id} no encontrado`);
        return centro;
    }
    async remove(id) {
        const centro = await this.centroCostoModel
            .findByIdAndUpdate(id, { activo: false }, { new: true })
            .lean();
        if (!centro)
            throw new common_1.NotFoundException(`Centro de costos ${id} no encontrado`);
        return { message: 'Centro desactivado', id };
    }
    async agregarDocumento(id, dto, usuarioId) {
        const nuevoDoc = { ...dto, subido_en: new Date() };
        if (usuarioId)
            nuevoDoc.subido_por = new mongoose_2.Types.ObjectId(usuarioId);
        const centro = await this.centroCostoModel
            .findByIdAndUpdate(id, { $push: { documentos: nuevoDoc } }, { new: true })
            .lean();
        if (!centro)
            throw new common_1.NotFoundException(`Centro de costos ${id} no encontrado`);
        return centro.documentos[centro.documentos.length - 1];
    }
    async eliminarDocumento(centroId, docId) {
        const centro = await this.centroCostoModel
            .findByIdAndUpdate(centroId, { $pull: { documentos: { _id: new mongoose_2.Types.ObjectId(docId) } } }, { new: true })
            .lean();
        if (!centro)
            throw new common_1.NotFoundException(`Centro de costos ${centroId} no encontrado`);
        return { message: 'Documento eliminado', docId };
    }
};
exports.CentrosCostosService = CentrosCostosService;
exports.CentrosCostosService = CentrosCostosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CentroCosto')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CentrosCostosService);
//# sourceMappingURL=centros-costos.service.js.map