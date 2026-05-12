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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let DocumentosService = class DocumentosService {
    constructor() {
        this.baseDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(this.baseDir)) {
            fs.mkdirSync(this.baseDir, { recursive: true });
        }
    }
    getContextPath(tipo, empresa_nombre, centro_nombre, proyecto_nombre) {
        let contextPath = empresa_nombre || 'empresa';
        if (tipo === 'centro' && centro_nombre) {
            contextPath = path.join(contextPath, 'centros-costos', centro_nombre);
        }
        else if (tipo === 'proyecto' && centro_nombre && proyecto_nombre) {
            contextPath = path.join(contextPath, 'centros-costos', centro_nombre, 'proyectos', proyecto_nombre);
        }
        return path.join(contextPath, 'documentos');
    }
    async subirDocumento(tipo, archivo, empresa_nombre, centro_nombre, proyecto_nombre) {
        if (archivo.mimetype !== 'application/pdf') {
            throw new Error('Solo se permiten archivos PDF');
        }
        const contextPath = this.getContextPath(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
        const fullDirPath = path.join(this.baseDir, contextPath);
        if (!fs.existsSync(fullDirPath)) {
            fs.mkdirSync(fullDirPath, { recursive: true });
        }
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const filename = `${timestamp}_${randomString}_${archivo.originalname}`;
        const filePath = path.join(fullDirPath, filename);
        fs.writeFileSync(filePath, archivo.buffer);
        return {
            url: `/uploads/${contextPath}/${filename}`.replace(/\\/g, '/'),
            filename,
            size: archivo.size,
            tipo_mime: archivo.mimetype,
        };
    }
    listarDocumentos(tipo, empresa_nombre, centro_nombre, proyecto_nombre) {
        const contextPath = this.getContextPath(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
        const fullDirPath = path.join(this.baseDir, contextPath);
        if (!fs.existsSync(fullDirPath)) {
            return [];
        }
        const files = fs.readdirSync(fullDirPath);
        return files.map((filename) => {
            const filePath = path.join(fullDirPath, filename);
            const stats = fs.statSync(filePath);
            return {
                filename,
                url: `/uploads/${contextPath}/${filename}`.replace(/\\/g, '/'),
                size: stats.size,
            };
        });
    }
    eliminarDocumento(tipo, filename, empresa_nombre, centro_nombre, proyecto_nombre) {
        const contextPath = this.getContextPath(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
        const filePath = path.join(this.baseDir, contextPath, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    }
};
exports.DocumentosService = DocumentosService;
exports.DocumentosService = DocumentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DocumentosService);
//# sourceMappingURL=documentos.service.js.map