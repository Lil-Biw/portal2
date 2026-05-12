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
exports.AgregarDocumentoProyectoDto = exports.UpdateProyectoDto = exports.CreateProyectoDto = void 0;
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateProyectoDto {
}
exports.CreateProyectoDto = CreateProyectoDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "cliente_id", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "centro_costo_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['borrador', 'activo', 'cerrado']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "fecha_inicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "fecha_fin", void 0);
class UpdateProyectoDto extends (0, mapped_types_1.PartialType)(CreateProyectoDto) {
}
exports.UpdateProyectoDto = UpdateProyectoDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProyectoDto.prototype, "activo", void 0);
class AgregarDocumentoProyectoDto {
}
exports.AgregarDocumentoProyectoDto = AgregarDocumentoProyectoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgregarDocumentoProyectoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgregarDocumentoProyectoDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgregarDocumentoProyectoDto.prototype, "tipo_mime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AgregarDocumentoProyectoDto.prototype, "tamano_bytes", void 0);
//# sourceMappingURL=proyectos.dto.js.map