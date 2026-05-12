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
