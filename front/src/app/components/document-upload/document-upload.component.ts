import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
})
export class DocumentUploadComponent implements OnInit {
  @Input() tipo: 'empresa' | 'centro' | 'proyecto' = 'empresa';
  @Input() clientes: any[] = [];
  @Input() centros: any[] = [];
  @Input() proyectos: any[] = [];
  @Input() selectedEmpresa = '';
  @Input() selectedCentro = '';
  @Input() selectedProyecto = '';
  @Input() documentos: any[] = [];
  @Input() uploadStatus: { type: 'ok' | 'error'; text: string } | undefined;

  @Output() empresaChange = new EventEmitter<string>();
  @Output() centroChange = new EventEmitter<string>();
  @Output() proyectoChange = new EventEmitter<string>();

  // Emits when the user selects a file to upload. Payload contains file and context info.
  @Output() archivoSeleccionado = new EventEmitter<{
    file: File;
    tipo: 'empresa' | 'centro' | 'proyecto';
    selectedEmpresa?: string;
    selectedCentro?: string;
    selectedProyecto?: string;
  }>();

  // Emit URL string for download (keeps simple)
  @Output() descargar = new EventEmitter<string>();

  // Emit structured object for delete so backend context is included
  @Output() eliminar = new EventEmitter<{
    filename: string;
    tipo: 'empresa' | 'centro' | 'proyecto';
    selectedEmpresa?: string;
    selectedCentro?: string;
    selectedProyecto?: string;
  }>();

  // internal scope choice: allow 'general' which maps to tipo 'empresa' without company selection
  scopeChoice: 'general' | 'empresa' | 'centro' | 'proyecto' = 'empresa';

  ngOnInit() {
    this.scopeChoice = this.tipo === 'empresa' ? 'empresa' : this.tipo;
  }

  private asId(value: any) {
    return value?._id || value || '';
  }

  get centrosFiltrados() {
    if (!this.selectedEmpresa) return [];
    return this.centros.filter((centro) => this.asId(centro.cliente_id) === this.selectedEmpresa);
  }

  get proyectosFiltrados() {
    if (!this.selectedEmpresa || !this.selectedCentro) return [];
    return this.proyectos.filter((p) => this.asId(p.cliente_id) === this.selectedEmpresa && this.asId(p.centro_costo_id) === this.selectedCentro);
  }

  onEmpresaChange(empresaId: string) {
    this.selectedEmpresa = empresaId;
    this.selectedCentro = '';
    this.selectedProyecto = '';
    this.empresaChange.emit(empresaId);
  }

  onCentroChange(centroId: string) {
    this.selectedCentro = centroId;
    this.selectedProyecto = '';
    this.centroChange.emit(centroId);
  }

  onFileChangeEmpresa(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.selectedEmpresa) return;
    this.archivoSeleccionado.emit({
      file,
      tipo: 'empresa',
      selectedEmpresa: this.selectedEmpresa,
    });
    input.value = '';
  }

  onFileChangeCentro(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.selectedEmpresa || !this.selectedCentro) return;
    this.archivoSeleccionado.emit({
      file,
      tipo: 'centro',
      selectedEmpresa: this.selectedEmpresa,
      selectedCentro: this.selectedCentro,
    });
    input.value = '';
  }

  onFileChangeProyecto(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.selectedEmpresa || !this.selectedCentro || !this.selectedProyecto) return;
    this.archivoSeleccionado.emit({
      file,
      tipo: 'proyecto',
      selectedEmpresa: this.selectedEmpresa,
      selectedCentro: this.selectedCentro,
      selectedProyecto: this.selectedProyecto,
    });
    input.value = '';
  }

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const effectiveTipo: 'empresa' | 'centro' | 'proyecto' = this.scopeChoice === 'general' ? 'empresa' : (this.scopeChoice as any);
    this.archivoSeleccionado.emit({
      file,
      tipo: effectiveTipo,
      selectedEmpresa: this.selectedEmpresa,
      selectedCentro: this.selectedCentro,
      selectedProyecto: this.selectedProyecto,
    });
    // clear input so same file can be selected again if needed
    input.value = '';
  }

  onEliminar(filename: string) {
    const effectiveTipo: 'empresa' | 'centro' | 'proyecto' = this.scopeChoice === 'general' ? 'empresa' : (this.scopeChoice as any);
    this.eliminar.emit({ filename, tipo: effectiveTipo, selectedEmpresa: this.selectedEmpresa, selectedCentro: this.selectedCentro, selectedProyecto: this.selectedProyecto });
  }
}
