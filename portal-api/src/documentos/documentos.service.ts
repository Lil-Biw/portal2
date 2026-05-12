import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';

@Injectable()
export class DocumentosService {
  private readonly baseDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Ensure uploads directory exists
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  /**
   * Construye la ruta del archivo según el contexto
   * {empresa_nombre}/documentos
   * {empresa_nombre}/centros-costos/{centro_nombre}/documentos
   * {empresa_nombre}/centros-costos/{centro_nombre}/proyectos/{proyecto_nombre}/documentos
   */
  private getContextPath(
    tipo: 'empresa' | 'centro' | 'proyecto',
    empresa_nombre?: string,
    centro_nombre?: string,
    proyecto_nombre?: string,
  ): string {
    let contextPath = empresa_nombre || 'empresa';

    if (tipo === 'centro' && centro_nombre) {
      contextPath = path.join(contextPath, 'centros-costos', centro_nombre);
    } else if (tipo === 'proyecto' && centro_nombre && proyecto_nombre) {
      contextPath = path.join(contextPath, 'centros-costos', centro_nombre, 'proyectos', proyecto_nombre);
    }

    return path.join(contextPath, 'documentos');
  }

  /**
   * Sube un archivo PDF en la estructura de directorios correspondiente
   */
  async subirDocumento(
    tipo: 'empresa' | 'centro' | 'proyecto',
    archivo: multer.File,
    empresa_nombre?: string,
    centro_nombre?: string,
    proyecto_nombre?: string,
  ): Promise<{ url: string; filename: string; size: number; tipo_mime: string }> {
    // Validate PDF
    if (archivo.mimetype !== 'application/pdf') {
      throw new Error('Solo se permiten archivos PDF');
    }

    const contextPath = this.getContextPath(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
    const fullDirPath = path.join(this.baseDir, contextPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const filename = `${timestamp}_${randomString}_${archivo.originalname}`;
    const filePath = path.join(fullDirPath, filename);

    // Save file
    fs.writeFileSync(filePath, archivo.buffer);

    // Return metadata
    return {
      url: `/uploads/${contextPath}/${filename}`.replace(/\\/g, '/'),
      filename,
      size: archivo.size,
      tipo_mime: archivo.mimetype,
    };
  }

  /**
   * Obtiene el listado de documentos en una ruta
   */
  listarDocumentos(
    tipo: 'empresa' | 'centro' | 'proyecto',
    empresa_nombre?: string,
    centro_nombre?: string,
    proyecto_nombre?: string,
  ): { filename: string; url: string; size: number }[] {
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

  /**
   * Elimina un documento
   */
  eliminarDocumento(
    tipo: 'empresa' | 'centro' | 'proyecto',
    filename: string,
    empresa_nombre?: string,
    centro_nombre?: string,
    proyecto_nombre?: string,
  ): boolean {
    const contextPath = this.getContextPath(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
    const filePath = path.join(this.baseDir, contextPath, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }
}
