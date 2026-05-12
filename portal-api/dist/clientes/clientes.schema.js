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
exports.ClienteSchema = exports.Cliente = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Cliente = class Cliente {
};
exports.Cliente = Cliente;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Cliente.prototype, "razon_social", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true }),
    __metadata("design:type", String)
], Cliente.prototype, "rut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Cliente.prototype, "email_contacto", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            calle: String,
            ciudad: String,
            region: String,
            pais: { type: String, default: 'Chile' },
        },
    }),
    __metadata("design:type", Object)
], Cliente.prototype, "direccion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Cliente.prototype, "activo", void 0);
exports.Cliente = Cliente = __decorate([
    (0, mongoose_1.Schema)({ collection: 'clientes', timestamps: { createdAt: 'creado_en', updatedAt: 'actualizado_en' } })
], Cliente);
exports.ClienteSchema = mongoose_1.SchemaFactory.createForClass(Cliente);
exports.ClienteSchema.index({ activo: 1 });
//# sourceMappingURL=clientes.schema.js.map