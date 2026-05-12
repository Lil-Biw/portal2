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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectoSchema = exports.Proyecto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class Documento {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Documento.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Documento.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Documento.prototype, "tipo_mime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Documento.prototype, "tamano_bytes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Usuario', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Documento.prototype, "subido_por", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Documento.prototype, "subido_en", void 0);
let Proyecto = class Proyecto {
};
exports.Proyecto = Proyecto;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'CentroCosto', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Proyecto.prototype, "centro_costo_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Cliente', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Proyecto.prototype, "cliente_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "codigo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Proyecto.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['borrador', 'activo', 'cerrado'], default: 'borrador' }),
    __metadata("design:type", String)
], Proyecto.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Proyecto.prototype, "fecha_inicio", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Proyecto.prototype, "fecha_fin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Documento], default: [] }),
    __metadata("design:type", Array)
], Proyecto.prototype, "documentos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Usuario', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Proyecto.prototype, "creado_por", void 0);
exports.Proyecto = Proyecto = __decorate([
    (0, mongoose_1.Schema)({ collection: 'proyectos', timestamps: { createdAt: 'creado_en', updatedAt: 'actualizado_en' } })
], Proyecto);
exports.ProyectoSchema = mongoose_1.SchemaFactory.createForClass(Proyecto);
exports.ProyectoSchema.index({ centro_costo_id: 1, estado: 1 });
exports.ProyectoSchema.index({ cliente_id: 1, estado: 1 });
exports.ProyectoSchema.index({ centro_costo_id: 1, codigo: 1 }, { unique: true });
//# sourceMappingURL=proyectos.schema.js.map