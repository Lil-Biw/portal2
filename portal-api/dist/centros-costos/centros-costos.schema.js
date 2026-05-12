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
exports.CentroCostoSchema = exports.CentroCosto = void 0;
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
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Usuario', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Documento.prototype, "subido_por", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Documento.prototype, "subido_en", void 0);
let CentroCosto = class CentroCosto {
};
exports.CentroCosto = CentroCosto;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Cliente', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CentroCosto.prototype, "cliente_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "codigo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "ubicacion_direccion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "ubicacion_ciudad", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "ubicacion_region", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], CentroCosto.prototype, "ubicacion_pais", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], CentroCosto.prototype, "activo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Documento], default: [] }),
    __metadata("design:type", Array)
], CentroCosto.prototype, "documentos", void 0);
exports.CentroCosto = CentroCosto = __decorate([
    (0, mongoose_1.Schema)({ collection: 'centros_costos', timestamps: { createdAt: 'creado_en', updatedAt: 'actualizado_en' } })
], CentroCosto);
exports.CentroCostoSchema = mongoose_1.SchemaFactory.createForClass(CentroCosto);
exports.CentroCostoSchema.index({ cliente_id: 1, activo: 1 });
exports.CentroCostoSchema.index({ cliente_id: 1, codigo: 1 }, { unique: true });
//# sourceMappingURL=centros-costos.schema.js.map