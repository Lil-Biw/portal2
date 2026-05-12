import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopbarWorkspaceComponent } from './topbar-workspace.component';
import { EmpresasCreateComponent } from '../features/empresas/empresas-create.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { ProfileMode } from '../profile/profile.types';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule, TopbarWorkspaceComponent, EmpresasCreateComponent, DocumentUploadComponent],
  templateUrl: './workspace.component.html',
  styles: [`
    :host{display:block}
    .workspace-shell{display:flex;flex-direction:column;gap:1rem;padding:1rem;border-radius:14px;border:1px dashed rgba(34,33,33,.15);background:rgba(255,255,255,.18);box-shadow:0 16px 40px rgba(15,23,42,.06)}
    .workspace-content{display:flex;flex-direction:column;gap:1rem}
    .workspace-content > ng-container{display:contents}
    .card{background:#fff;padding:1rem;border-radius:14px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
    .grid{display:grid;gap:1rem}
    .grid.two{grid-template-columns:repeat(2,1fr)}
    label{display:flex;flex-direction:column;gap:0.25rem}
    label span{font-size:.85rem;font-weight:600;color:var(--ink-600,#374151)}
    label input,label select{padding:0.65rem;border-radius:8px;border:1px solid rgba(34,33,33,.2);font-family:inherit;font-size:.95rem}
    label input:focus,label select:focus{outline:none;border-color:var(--accent,#0095d6);background:rgba(0,149,214,.02)}
    .tab-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(34,33,33,.1)}
    .tab-head h2{margin:0;font-size:1.5rem}
    .tab-head .actions{display:flex;gap:.5rem;flex-wrap:wrap}
    button.ghost{padding:.65rem 1rem;border-radius:8px;border:1px solid rgba(34,33,33,.2);background:transparent;cursor:pointer;font-weight:600;transition:all .2s}
    button.ghost:hover{border-color:rgba(34,33,33,.4);background:rgba(255,255,255,.4)}
    button.ghost.primary{background:var(--accent,#0095d6);color:#fff;border-color:var(--accent,#0095d6)}
    button.ghost.primary:hover{background:var(--accent-dark,#0075a8)}
    button:disabled{opacity:0.5;cursor:not-allowed}
    .status{padding:1rem;border-radius:8px;background:rgba(34,195,98,.08);color:#22c362;border:1px solid rgba(34,195,98,.2);margin-bottom:1rem}
    .status.error{background:rgba(239,68,68,.08);color:#ef4444;border-color:rgba(239,68,68,.2)}
    .item-card{background:#fff;padding:1rem;border-radius:8px;border:1px solid rgba(34,33,33,.1);margin-top:.5rem}
    .item-card strong{display:block;font-size:1rem;margin-bottom:.25rem}
    .item-card p{margin:0.25rem 0;font-size:.9rem;color:var(--ink-600,#374151)}
    .item-card small{display:block;margin-top:.5rem;color:var(--ink-500,#6b7280);font-size:.8rem}
  `]
})
export class WorkspaceComponent {
  @Input() mode: ProfileMode = 'consumidor';
  @Input() selectedItem = '';
  @Input() workspaceAction: 'crear'|'editar'|'eliminar'|'buscar' = 'crear';

  // Cliente inputs
  @Input() clienteForm: any = {};
  @Input() clientes: any[] = [];
  @Input() clienteLookupId = '';
  @Input() clienteEditId = '';
  @Input() clienteEliminarId = '';
  @Input() clienteEncontrado: any = null;
  
  // Centro inputs
  @Input() centroForm: any = {};
  @Input() centros: any[] = [];
  @Input() centroLookupId = '';
  @Input() centroEditId = '';
  @Input() centroEliminarId = '';
  @Input() centroEncontrado: any = null;

  // Proyecto inputs
  @Input() proyectoForm: any = {};
  @Input() proyectos: any[] = [];
  @Input() proyectoLookupId = '';
  @Input() proyectoEditId = '';
  @Input() proyectoEliminarId = '';
  @Input() proyectoEncontrado: any = null;

  // Usuario inputs
  @Input() usuarioForm: any = {};
  @Input() usuarios: any[] = [];
  @Input() usuarioLookupId = '';
  @Input() usuarioEditId = '';
  @Input() usuarioEliminarId = '';
  @Input() usuarioEncontrado: any = null;

  @Input() status: { 
    clientes: { type: 'ok' | 'error'; text: string } | null;
    centros: { type: 'ok' | 'error'; text: string } | null;
    proyectos: { type: 'ok' | 'error'; text: string } | null;
    usuarios: { type: 'ok' | 'error'; text: string } | null;
  } = {
    clientes: null,
    centros: null,
    proyectos: null,
    usuarios: null,
  };

  // Document upload inputs
  @Input() documentosEmpresa: any[] = [];
  @Input() documentosCentro: any[] = [];
  @Input() documentosProyecto: any[] = [];
  @Input() uploadStatus: { empresa?: { type: 'ok' | 'error'; text: string }; centro?: { type: 'ok' | 'error'; text: string }; proyecto?: { type: 'ok' | 'error'; text: string } } = {};

  // Document events forwarded to parent
  @Output() archivoSeleccionado = new EventEmitter<{
    file: File;
    tipo: 'empresa' | 'centro' | 'proyecto';
    selectedEmpresa?: string;
    selectedCentro?: string;
    selectedProyecto?: string;
  }>();
  @Output() descargarDocumento = new EventEmitter<string>();
  @Output() eliminarDocumento = new EventEmitter<{
    filename: string;
    tipo: 'empresa' | 'centro' | 'proyecto';
    selectedEmpresa?: string;
    selectedCentro?: string;
    selectedProyecto?: string;
  }>();

  // Outputs
  @Output() actionChange = new EventEmitter<'crear'|'editar'|'eliminar'|'buscar'>();
  
  // Cliente outputs
  @Output() buscarCliente = new EventEmitter<void>();
  @Output() crearCliente = new EventEmitter<void>();
  @Output() actualizarCliente = new EventEmitter<void>();
  @Output() eliminarCliente = new EventEmitter<void>();
  @Output() clienteSelectionChange = new EventEmitter<string>();
  @Output() clienteFormChange = new EventEmitter<any>();
  @Output() clienteLookupIdChange = new EventEmitter<string>();
  @Output() clienteEliminarIdChange = new EventEmitter<string>();

  // Centro outputs
  @Output() buscarCentro = new EventEmitter<void>();
  @Output() crearCentro = new EventEmitter<void>();
  @Output() actualizarCentro = new EventEmitter<void>();
  @Output() eliminarCentro = new EventEmitter<void>();
  @Output() centroSelectionChange = new EventEmitter<string>();
  @Output() centroFormChange = new EventEmitter<any>();
  @Output() centroLookupIdChange = new EventEmitter<string>();
  @Output() centroEliminarIdChange = new EventEmitter<string>();

  // Proyecto outputs
  @Output() buscarProyecto = new EventEmitter<void>();
  @Output() crearProyecto = new EventEmitter<void>();
  @Output() actualizarProyecto = new EventEmitter<void>();
  @Output() eliminarProyecto = new EventEmitter<void>();
  @Output() proyectoSelectionChange = new EventEmitter<string>();
  @Output() proyectoFormChange = new EventEmitter<any>();
  @Output() proyectoLookupIdChange = new EventEmitter<string>();
  @Output() proyectoEliminarIdChange = new EventEmitter<string>();

  // Usuario outputs
  @Output() buscarUsuario = new EventEmitter<void>();
  @Output() crearUsuario = new EventEmitter<void>();
  @Output() actualizarUsuario = new EventEmitter<void>();
  @Output() eliminarUsuario = new EventEmitter<void>();
  @Output() usuarioSelectionChange = new EventEmitter<string>();
  @Output() usuarioFormChange = new EventEmitter<any>();
  @Output() usuarioLookupIdChange = new EventEmitter<string>();
  @Output() usuarioEliminarIdChange = new EventEmitter<string>();

  onActionChange(action: 'crear'|'editar'|'eliminar'|'buscar') {
    this.workspaceAction = action;
    this.actionChange.emit(action);
  }

  get modeLabel(): string {
    return this.mode === 'admin' ? 'Administrador' : 'Consumidor';
  }

  updateClienteForm() {
    this.clienteFormChange.emit(this.clienteForm);
  }

  updateClienteLookupId(id: string) {
    this.clienteLookupIdChange.emit(id);
  }

  updateClienteEliminarId(id: string) {
    this.clienteEliminarIdChange.emit(id);
  }

  updateCentroForm() {
    this.centroFormChange.emit(this.centroForm);
  }

  updateCentroLookupId(id: string) {
    this.centroLookupIdChange.emit(id);
  }

  updateCentroEliminarId(id: string) {
    this.centroEliminarIdChange.emit(id);
  }

  updateProyectoForm() {
    this.proyectoFormChange.emit(this.proyectoForm);
  }

  updateProyectoLookupId(id: string) {
    this.proyectoLookupIdChange.emit(id);
  }

  updateProyectoEliminarId(id: string) {
    this.proyectoEliminarIdChange.emit(id);
  }

  updateUsuarioForm() {
    this.usuarioFormChange.emit(this.usuarioForm);
  }

  updateUsuarioLookupId(id: string) {
    this.usuarioLookupIdChange.emit(id);
  }

  updateUsuarioEliminarId(id: string) {
    this.usuarioEliminarIdChange.emit(id);
  }
}
