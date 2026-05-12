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
exports.ProyectosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProyectosService = class ProyectosService {
    constructor(proyectoModel) {
        this.proyectoModel = proyectoModel;
    }
    async create(dto, creadoPor) {
        const existe = await this.proyectoModel.findOne({
            centro_costo_id: dto.centro_costo_id,
            codigo: dto.codigo,
        });
        if (existe)
            throw new common_1.ConflictException(`Ya existe el código ${dto.codigo} en este centro de costos`);
        const doc = {
            ...dto,
            fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : undefined,
            fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : undefined,
        };
        if (creadoPor)
            doc.creado_por = new mongoose_2.Types.ObjectId(creadoPor);
        return new this.proyectoModel(doc).save();
    }
    async findAll(page = 1, limit = 20) {
        const filter = { estado: { $ne: 'cerrado' } };
        const [data, total] = await Promise.all([
            this.proyectoModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.proyectoModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findAllByCentro(centro_costo_id, page = 1, limit = 20) {
        const filter = {
            centro_costo_id: new mongoose_2.Types.ObjectId(centro_costo_id),
            estado: { $ne: 'cerrado' },
        };
        const [data, total] = await Promise.all([
            this.proyectoModel.find(filter).skip((page - 1) * limit).limit(limit).lean(),
            this.proyectoModel.countDocuments(filter),
        ]);
        return { data, total, page, pages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const proyecto = await this.proyectoModel.findById(id).lean();
        if (!proyecto)
            throw new common_1.NotFoundException(`Proyecto ${id} no encontrado`);
        return proyecto;
    }
    async update(id, dto) {
        const proyecto = await this.proyectoModel
            .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            .lean();
        if (!proyecto)
            throw new common_1.NotFoundException(`Proyecto ${id} no encontrado`);
        return proyecto;
    }
    async remove(id) {
        const proyecto = await this.proyectoModel
            .findByIdAndUpdate(id, { estado: 'cerrado' }, { new: true })
            .lean();
        if (!proyecto)
            throw new common_1.NotFoundException(`Proyecto ${id} no encontrado`);
        return { message: 'Proyecto cerrado', id };
    }
    async agregarDocumento(id, dto, usuarioId) {
        const nuevoDoc = { ...dto, subido_en: new Date() };
        if (usuarioId)
            nuevoDoc.subido_por = new mongoose_2.Types.ObjectId(usuarioId);
        const proyecto = await this.proyectoModel
            .findByIdAndUpdate(id, { $push: { documentos: nuevoDoc } }, { new: true })
            .lean();
        if (!proyecto)
            throw new common_1.NotFoundException(`Proyecto ${id} no encontrado`);
        return proyecto.documentos[proyecto.documentos.length - 1];
    }
    async eliminarDocumento(proyectoId, docId) {
        const proyecto = await this.proyectoModel
            .findByIdAndUpdate(proyectoId, { $pull: { documentos: { _id: new mongoose_2.Types.ObjectId(docId) } } }, { new: true })
            .lean();
        if (!proyecto)
            throw new common_1.NotFoundException(`Proyecto ${proyectoId} no encontrado`);
        return { message: 'Documento eliminado', docId };
    }
};
exports.ProyectosService = ProyectosService;
exports.ProyectosService = ProyectosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Proyecto')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProyectosService);
//# sourceMappingURL=proyectos.service.js.map