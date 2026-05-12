import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './components/topbar.component';
import { SidebarComponent } from './components/sidebar.component';
import { WorkspaceComponent } from './components/workspace.component';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet, TopbarComponent, SidebarComponent, WorkspaceComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  readonly apiBase = 'http://localhost:3000/api/v1';
  
  protected selectedItem = 'Inicio';
  protected workspaceAction: 'crear'|'editar'|'eliminar'|'buscar' = 'crear';

  // Cliente CRUD
  clienteForm = {
    razon_social: '',
    rut: '',
    email_contacto: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', region: '', pais: 'Chile' },
  };
  clientes: any[] = [];
  clienteLookupId = '';
  clienteEditId = '';
  clienteEliminarId = '';
  clienteEncontrado: any = null;

  // Centro de Costos CRUD
  centroForm = {
    cliente_id: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    ubicacion_direccion: '',
    ubicacion_ciudad: '',
    ubicacion_region: '',
    ubicacion_pais: 'Chile',
  };
  centros: any[] = [];
  centroLookupId = '';
  centroEditId = '';
  centroEliminarId = '';
  centroEncontrado: any = null;

  // Proyecto CRUD
  proyectoForm = {
    cliente_id: '',
    centro_costo_id: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    estado: 'borrador',
    fecha_inicio: '',
    fecha_fin: '',
  };
  proyectos: any[] = [];
  proyectoLookupId = '';
  proyectoEditId = '';
  proyectoEliminarId = '';
  proyectoEncontrado: any = null;

  // Usuario CRUD
  usuarioForm = {
    cliente_id: '',
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    permiso_acceso: 'ver',
  };
  usuarios: any[] = [];
  usuarioLookupId = '';
  usuarioEditId = '';
  usuarioEliminarId = '';
  usuarioEncontrado: any = null;

  // Document uploads (simple placeholders)
  documentosEmpresa: any[] = [];
  documentosCentro: any[] = [];
  documentosProyecto: any[] = [];
  uploadStatus: { empresa?: { type: 'ok' | 'error'; text: string }; centro?: { type: 'ok' | 'error'; text: string }; proyecto?: { type: 'ok' | 'error'; text: string } } = {};

  status: { 
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

  constructor(
    private readonly profileService: ProfileService,
    private http: HttpClient
  ) {
    this.selectedItem = this.profileService.mode() === 'admin' ? 'Empresa' : 'Inicio';
  }

  ngOnInit() {
    if (this.profileService.mode() === 'admin') {
      this.cargarClientes();
      this.cargarCentros();
      this.cargarProyectos();
      this.cargarUsuarios();
    }
  }

  protected get mode() {
    return this.profileService.mode;
  }

  protected toggleMode(): void {
    this.profileService.toggleMode();
    this.selectedItem = this.profileService.mode() === 'admin' ? 'Empresa' : 'Inicio';
  }

  protected onSidebarSelection(item: string): void {
    this.selectedItem = item;
    
    if (item === 'Resumen general') {
      this.workspaceAction = 'buscar';
      this.cargarClientes();
      this.cargarCentros();
      this.cargarProyectos();
      this.cargarUsuarios();
    } else {
      this.workspaceAction = 'crear';
      if (item === 'Empresa') {
        this.cargarClientes();
      } else if (item === 'Centro de costos') {
        this.cargarCentros();
      } else if (item === 'Proyectos') {
        this.cargarProyectos();
      } else if (item === 'Documentos') {
        // load document lists for current context
        this.cargarDocumentos('empresa');
        this.cargarDocumentos('centro');
        this.cargarDocumentos('proyecto');
      } else if (item === 'Usuarios') {
        this.cargarUsuarios();
      }
    }
  }

  protected onWorkspaceActionChange(action: 'crear'|'editar'|'eliminar'|'buscar') {
    this.workspaceAction = action;
    this.clearStatus();
  }

  // Document upload handlers: real POST to backend
  onArchivoSeleccionado(payload: { file: File; tipo: 'empresa' | 'centro' | 'proyecto'; selectedEmpresa?: string; selectedCentro?: string; selectedProyecto?: string; }) {
    const file = payload.file;
    const tipo = payload.tipo;

    if (!file) return;
    if (file.type !== 'application/pdf') {
      this.uploadStatus[tipo] = { type: 'error', text: 'Solo se permiten archivos PDF' };
      return;
    }

    // Validate selection depending on tipo
    let empresa_nombre: string | undefined;
    let centro_nombre: string | undefined;
    let proyecto_nombre: string | undefined;

    if (payload.selectedEmpresa) {
      empresa_nombre = this.getNombreEmpresa(payload.selectedEmpresa);
    }
    if (payload.selectedCentro) {
      centro_nombre = this.getNombreCentro(payload.selectedCentro);
    }
    if (payload.selectedProyecto) {
      proyecto_nombre = this.getNombreProyecto(payload.selectedProyecto);
    }

    // For centro/proyecto ensure required ids exist
    if (tipo === 'centro' && !payload.selectedCentro) {
      this.uploadStatus.centro = { type: 'error', text: 'Selecciona un centro de costos destino' };
      return;
    }
    if (tipo === 'proyecto' && !payload.selectedProyecto) {
      this.uploadStatus.proyecto = { type: 'error', text: 'Selecciona un proyecto destino' };
      return;
    }

    const form = new FormData();
    form.append('archivo', file);
    form.append('tipo', tipo);
    if (empresa_nombre) form.append('empresa_nombre', empresa_nombre);
    if (centro_nombre) form.append('centro_nombre', centro_nombre);
    if (proyecto_nombre) form.append('proyecto_nombre', proyecto_nombre);

    this.http.post<any>(`${this.apiBase}/documentos/upload`, form).subscribe({
      next: (res) => {
        this.uploadStatus[tipo] = { type: 'ok', text: `${file.name} cargado exitosamente` };
        // refresh list for this tipo
        this.cargarDocumentos(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
      },
      error: (err) => {
        this.uploadStatus[tipo] = { type: 'error', text: err?.error?.message || 'Error al cargar archivo' };
      },
    });
  }

  descargarDocumento(arg: string | { url: string }) {
    const url = typeof arg === 'string' ? arg : arg.url;
    // open in new tab
    window.open(url, '_blank');
  }

  eliminarDocumento(arg: string | { filename: string; tipo?: string; selectedEmpresa?: string; selectedCentro?: string; selectedProyecto?: string }) {
    // support both string (filename) and structured object
    let filename: string;
    let tipo: 'empresa' | 'centro' | 'proyecto' = 'empresa';
    let empresa_nombre: string | undefined;
    let centro_nombre: string | undefined;
    let proyecto_nombre: string | undefined;

    if (typeof arg === 'string') {
      filename = arg;
    } else {
      filename = arg.filename;
      if (arg.tipo === 'centro' || arg.tipo === 'proyecto' || arg.tipo === 'empresa') tipo = arg.tipo;
      if (arg.selectedEmpresa) empresa_nombre = this.getNombreEmpresa(arg.selectedEmpresa);
      if (arg.selectedCentro) centro_nombre = this.getNombreCentro(arg.selectedCentro);
      if (arg.selectedProyecto) proyecto_nombre = this.getNombreProyecto(arg.selectedProyecto);
    }

    const params: any = { tipo };
    if (empresa_nombre) params.empresa_nombre = empresa_nombre;
    if (centro_nombre) params.centro_nombre = centro_nombre;
    if (proyecto_nombre) params.proyecto_nombre = proyecto_nombre;

    const qp = Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');

    this.http.delete<any>(`${this.apiBase}/documentos/eliminar/${encodeURIComponent(filename)}?${qp}`).subscribe({
      next: () => {
        // refresh list
        this.cargarDocumentos(tipo, empresa_nombre, centro_nombre, proyecto_nombre);
        // set status
        this.uploadStatus[tipo] = { type: 'ok', text: `Archivo ${filename} eliminado` };
      },
      error: (err) => {
        this.uploadStatus[tipo] = { type: 'error', text: err?.error?.message || 'Error al eliminar archivo' };
      },
    });
  }

  // Load documents list for a context
  cargarDocumentos(tipo: 'empresa' | 'centro' | 'proyecto', empresa_nombre?: string, centro_nombre?: string, proyecto_nombre?: string) {
    const qp: string[] = [];
    qp.push(`tipo=${encodeURIComponent(tipo)}`);
    if (empresa_nombre) qp.push(`empresa_nombre=${encodeURIComponent(empresa_nombre)}`);
    if (centro_nombre) qp.push(`centro_nombre=${encodeURIComponent(centro_nombre)}`);
    if (proyecto_nombre) qp.push(`proyecto_nombre=${encodeURIComponent(proyecto_nombre)}`);
    const url = `${this.apiBase}/documentos/listar?${qp.join('&')}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const docs = res || [];
        if (tipo === 'empresa') this.documentosEmpresa = docs;
        else if (tipo === 'centro') this.documentosCentro = docs;
        else if (tipo === 'proyecto') this.documentosProyecto = docs;
      },
      error: () => {
        if (tipo === 'empresa') this.documentosEmpresa = [];
        else if (tipo === 'centro') this.documentosCentro = [];
        else if (tipo === 'proyecto') this.documentosProyecto = [];
      },
    });
  }

  private headers() {
    return new HttpHeaders();
  }

  private setStatus(entity: 'clientes' | 'centros' | 'proyectos' | 'usuarios', type: 'ok' | 'error', text: string) {
    this.status[entity] = { type, text };
  }

  private clearStatus() {
    this.status = {
      clientes: null,
      centros: null,
      proyectos: null,
      usuarios: null,
    };
  }

  private assignClienteForm(cliente: any) {
    this.clienteForm = {
      razon_social: cliente?.razon_social || '',
      rut: cliente?.rut || '',
      email_contacto: cliente?.email_contacto || '',
      telefono: cliente?.telefono || '',
      direccion: {
        calle: cliente?.direccion?.calle || '',
        ciudad: cliente?.direccion?.ciudad || '',
        region: cliente?.direccion?.region || '',
        pais: cliente?.direccion?.pais || 'Chile',
      },
    };
  }

  crearCliente() {
    if (!this.clienteForm.razon_social || !this.clienteForm.rut) {
      this.setStatus('clientes', 'error', 'Razon social y RUT requeridos');
      return;
    }

    this.http.post<any>(`${this.apiBase}/clientes`, this.clienteForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('clientes', 'ok', 'Empresa creada correctamente');
        this.clienteForm = { razon_social: '', rut: '', email_contacto: '', telefono: '', direccion: { calle: '', ciudad: '', region: '', pais: 'Chile' } };
        this.cargarClientes();
      },
      error: (err) => {
        this.setStatus('clientes', 'error', err?.error?.message || 'Error al crear empresa');
      },
    });
  }

  cargarClientes() {
    this.http.get<any>(`${this.apiBase}/clientes`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.clientes = res.data || res;
        this.setStatus('clientes', 'ok', `${this.clientes.length} empresas cargadas`);
      },
      error: (err) => {
        this.setStatus('clientes', 'error', err?.error?.message || 'Error al cargar empresas');
      },
    });
  }

  buscarCliente() {
    if (!this.clienteLookupId) {
      this.setStatus('clientes', 'error', 'Ingresa un ID de empresa');
      return;
    }

    this.http.get<any>(`${this.apiBase}/clientes/${this.clienteLookupId}`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.clienteEncontrado = res;
        this.clienteEditId = res?._id;
        this.assignClienteForm(res);
        this.setStatus('clientes', 'ok', 'Empresa encontrada');
      },
      error: (err) => {
        this.setStatus('clientes', 'error', err?.error?.message || 'Empresa no encontrada');
      },
    });
  }

  actualizarCliente() {
    if (!this.clienteEditId) {
      this.setStatus('clientes', 'error', 'Selecciona una empresa para editar');
      return;
    }

    this.http.put<any>(`${this.apiBase}/clientes/${this.clienteEditId}`, this.clienteForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('clientes', 'ok', 'Empresa actualizada');
        this.cargarClientes();
        this.clienteEditId = '';
        this.clienteEncontrado = null;
        this.clienteLookupId = '';
      },
      error: (err) => {
        this.setStatus('clientes', 'error', err?.error?.message || 'Error al actualizar empresa');
      },
    });
  }

  eliminarCliente() {
    if (!this.clienteEliminarId) {
      this.setStatus('clientes', 'error', 'Selecciona una empresa para eliminar');
      return;
    }

    this.http.delete<any>(`${this.apiBase}/clientes/${this.clienteEliminarId}`, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('clientes', 'ok', 'Empresa eliminada');
        this.cargarClientes();
        this.clienteEliminarId = '';
      },
      error: (err) => {
        this.setStatus('clientes', 'error', err?.error?.message || 'Error al eliminar empresa');
      },
    });
  }

  onClienteSelectionChange(clienteId: string) {
    this.clienteLookupId = clienteId;
    if (!clienteId) {
      this.clienteEditId = '';
      this.clienteEncontrado = null;
      this.clearStatus();
      return;
    }

    const cliente = this.clientes.find((c) => c._id === clienteId);
    if (cliente) {
      this.clienteEncontrado = cliente;
      this.clienteEditId = clienteId;
      this.assignClienteForm(cliente);
      this.setStatus('clientes', 'ok', 'Empresa cargada');
    }
  }

  // ===== CENTRO DE COSTOS =====
  private assignCentroForm(centro: any) {
    this.centroForm = {
      cliente_id: centro?.cliente_id?._id || centro?.cliente_id || '',
      codigo: centro?.codigo || '',
      nombre: centro?.nombre || '',
      descripcion: centro?.descripcion || '',
      ubicacion_direccion: centro?.ubicacion_direccion || '',
      ubicacion_ciudad: centro?.ubicacion_ciudad || '',
      ubicacion_region: centro?.ubicacion_region || '',
      ubicacion_pais: centro?.ubicacion_pais || 'Chile',
    };
  }

  crearCentro() {
    if (!this.centroForm.cliente_id || !this.centroForm.nombre) {
      this.setStatus('centros', 'error', 'Cliente y nombre requeridos');
      return;
    }

    this.http.post<any>(`${this.apiBase}/centros-costos`, this.centroForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('centros', 'ok', 'Centro creado correctamente');
        this.centroForm = { cliente_id: '', codigo: '', nombre: '', descripcion: '', ubicacion_direccion: '', ubicacion_ciudad: '', ubicacion_region: '', ubicacion_pais: 'Chile' };
        this.cargarCentros();
      },
      error: (err) => {
        this.setStatus('centros', 'error', err?.error?.message || 'Error al crear centro');
      },
    });
  }

  cargarCentros() {
    this.http.get<any>(`${this.apiBase}/centros-costos`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.centros = res.data || res;
        this.setStatus('centros', 'ok', `${this.centros.length} centros cargados`);
      },
      error: (err) => {
        this.setStatus('centros', 'error', err?.error?.message || 'Error al cargar centros');
      },
    });
  }

  buscarCentro() {
    if (!this.centroLookupId) {
      this.setStatus('centros', 'error', 'Ingresa un ID de centro');
      return;
    }

    this.http.get<any>(`${this.apiBase}/centros-costos/${this.centroLookupId}`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.centroEncontrado = res;
        this.centroEditId = res?._id;
        this.assignCentroForm(res);
        this.setStatus('centros', 'ok', 'Centro encontrado');
      },
      error: (err) => {
        this.setStatus('centros', 'error', err?.error?.message || 'Centro no encontrado');
      },
    });
  }

  actualizarCentro() {
    if (!this.centroEditId) {
      this.setStatus('centros', 'error', 'Selecciona un centro para editar');
      return;
    }

    this.http.put<any>(`${this.apiBase}/centros-costos/${this.centroEditId}`, this.centroForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('centros', 'ok', 'Centro actualizado');
        this.cargarCentros();
        this.centroEditId = '';
        this.centroEncontrado = null;
        this.centroLookupId = '';
      },
      error: (err) => {
        this.setStatus('centros', 'error', err?.error?.message || 'Error al actualizar centro');
      },
    });
  }

  eliminarCentro() {
    if (!this.centroEliminarId) {
      this.setStatus('centros', 'error', 'Selecciona un centro para eliminar');
      return;
    }

    this.http.delete<any>(`${this.apiBase}/centros-costos/${this.centroEliminarId}`, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('centros', 'ok', 'Centro eliminado');
        this.cargarCentros();
        this.centroEliminarId = '';
      },
      error: (err) => {
        this.setStatus('centros', 'error', err?.error?.message || 'Error al eliminar centro');
      },
    });
  }

  onCentroSelectionChange(centroId: string) {
    this.centroLookupId = centroId;
    if (!centroId) {
      this.centroEditId = '';
      this.centroEncontrado = null;
      return;
    }

    const centro = this.centros.find((c) => c._id === centroId);
    if (centro) {
      this.centroEncontrado = centro;
      this.centroEditId = centroId;
      this.assignCentroForm(centro);
      this.setStatus('centros', 'ok', 'Centro cargado');
    }
  }

  // ===== PROYECTOS =====
  private assignProyectoForm(proyecto: any) {
    this.proyectoForm = {
      cliente_id: proyecto?.cliente_id?._id || proyecto?.cliente_id || '',
      centro_costo_id: proyecto?.centro_costo_id?._id || proyecto?.centro_costo_id || '',
      codigo: proyecto?.codigo || '',
      nombre: proyecto?.nombre || '',
      descripcion: proyecto?.descripcion || '',
      estado: proyecto?.estado || 'borrador',
      fecha_inicio: proyecto?.fecha_inicio || '',
      fecha_fin: proyecto?.fecha_fin || '',
    };
  }

  crearProyecto() {
    if (!this.proyectoForm.cliente_id || !this.proyectoForm.nombre) {
      this.setStatus('proyectos', 'error', 'Cliente y nombre requeridos');
      return;
    }

    this.http.post<any>(`${this.apiBase}/proyectos`, this.proyectoForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('proyectos', 'ok', 'Proyecto creado correctamente');
        this.proyectoForm = { cliente_id: '', centro_costo_id: '', codigo: '', nombre: '', descripcion: '', estado: 'borrador', fecha_inicio: '', fecha_fin: '' };
        this.cargarProyectos();
      },
      error: (err) => {
        this.setStatus('proyectos', 'error', err?.error?.message || 'Error al crear proyecto');
      },
    });
  }

  cargarProyectos() {
    this.http.get<any>(`${this.apiBase}/proyectos`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.proyectos = res.data || res;
        this.setStatus('proyectos', 'ok', `${this.proyectos.length} proyectos cargados`);
      },
      error: (err) => {
        this.setStatus('proyectos', 'error', err?.error?.message || 'Error al cargar proyectos');
      },
    });
  }

  buscarProyecto() {
    if (!this.proyectoLookupId) {
      this.setStatus('proyectos', 'error', 'Ingresa un ID de proyecto');
      return;
    }

    this.http.get<any>(`${this.apiBase}/proyectos/${this.proyectoLookupId}`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.proyectoEncontrado = res;
        this.proyectoEditId = res?._id;
        this.assignProyectoForm(res);
        this.setStatus('proyectos', 'ok', 'Proyecto encontrado');
      },
      error: (err) => {
        this.setStatus('proyectos', 'error', err?.error?.message || 'Proyecto no encontrado');
      },
    });
  }

  actualizarProyecto() {
    if (!this.proyectoEditId) {
      this.setStatus('proyectos', 'error', 'Selecciona un proyecto para editar');
      return;
    }

    this.http.put<any>(`${this.apiBase}/proyectos/${this.proyectoEditId}`, this.proyectoForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('proyectos', 'ok', 'Proyecto actualizado');
        this.cargarProyectos();
        this.proyectoEditId = '';
        this.proyectoEncontrado = null;
        this.proyectoLookupId = '';
      },
      error: (err) => {
        this.setStatus('proyectos', 'error', err?.error?.message || 'Error al actualizar proyecto');
      },
    });
  }

  eliminarProyecto() {
    if (!this.proyectoEliminarId) {
      this.setStatus('proyectos', 'error', 'Selecciona un proyecto para eliminar');
      return;
    }

    this.http.delete<any>(`${this.apiBase}/proyectos/${this.proyectoEliminarId}`, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('proyectos', 'ok', 'Proyecto eliminado');
        this.cargarProyectos();
        this.proyectoEliminarId = '';
      },
      error: (err) => {
        this.setStatus('proyectos', 'error', err?.error?.message || 'Error al eliminar proyecto');
      },
    });
  }

  onProyectoSelectionChange(proyectoId: string) {
    this.proyectoLookupId = proyectoId;
    if (!proyectoId) {
      this.proyectoEditId = '';
      this.proyectoEncontrado = null;
      return;
    }

    const proyecto = this.proyectos.find((p) => p._id === proyectoId);
    if (proyecto) {
      this.proyectoEncontrado = proyecto;
      this.proyectoEditId = proyectoId;
      this.assignProyectoForm(proyecto);
      this.setStatus('proyectos', 'ok', 'Proyecto cargado');
    }
  }

  // ===== USUARIOS =====
  private assignUsuarioForm(usuario: any) {
    this.usuarioForm = {
      cliente_id: usuario?.cliente_id?._id || usuario?.cliente_id || '',
      nombre: usuario?.nombre || '',
      email: usuario?.email || '',
      password: '',
      rol: usuario?.rol || 'usuario',
      permiso_acceso: usuario?.permiso_acceso || 'ver',
    };
  }

  // Helpers to get display names from ids
  private getNombreEmpresa(id: string) {
    const c = this.clientes.find((x) => x._id === id);
    return c ? (c.razon_social || c.nombre || '') : '';
  }

  private getNombreCentro(id: string) {
    const c = this.centros.find((x) => x._id === id);
    return c ? (c.nombre || c.codigo || '') : '';
  }

  private getNombreProyecto(id: string) {
    const p = this.proyectos.find((x) => x._id === id);
    return p ? (p.nombre || p.codigo || '') : '';
  }

  crearUsuario() {
    if (!this.usuarioForm.cliente_id || !this.usuarioForm.nombre || !this.usuarioForm.email || !this.usuarioForm.password) {
      this.setStatus('usuarios', 'error', 'Cliente, nombre, email y password requeridos');
      return;
    }

    this.http.post<any>(`${this.apiBase}/usuarios`, this.usuarioForm, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('usuarios', 'ok', 'Usuario creado correctamente');
        this.usuarioForm = { cliente_id: '', nombre: '', email: '', password: '', rol: 'usuario', permiso_acceso: 'ver' };
        this.cargarUsuarios();
      },
      error: (err) => {
        this.setStatus('usuarios', 'error', err?.error?.message || 'Error al crear usuario');
      },
    });
  }

  cargarUsuarios() {
    this.http.get<any>(`${this.apiBase}/usuarios`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.usuarios = res.data || res;
        this.setStatus('usuarios', 'ok', `${this.usuarios.length} usuarios cargados`);
      },
      error: (err) => {
        this.setStatus('usuarios', 'error', err?.error?.message || 'Error al cargar usuarios');
      },
    });
  }

  buscarUsuario() {
    if (!this.usuarioLookupId) {
      this.setStatus('usuarios', 'error', 'Ingresa un ID de usuario');
      return;
    }

    this.http.get<any>(`${this.apiBase}/usuarios/${this.usuarioLookupId}`, { headers: this.headers() }).subscribe({
      next: (res) => {
        this.usuarioEncontrado = res;
        this.usuarioEditId = res?._id;
        this.assignUsuarioForm(res);
        this.setStatus('usuarios', 'ok', 'Usuario encontrado');
      },
      error: (err) => {
        this.setStatus('usuarios', 'error', err?.error?.message || 'Usuario no encontrado');
      },
    });
  }

  actualizarUsuario() {
    if (!this.usuarioEditId) {
      this.setStatus('usuarios', 'error', 'Selecciona un usuario para editar');
      return;
    }

    const payload = {
      nombre: this.usuarioForm.nombre,
      email: this.usuarioForm.email,
      rol: this.usuarioForm.rol,
      permiso_acceso: this.usuarioForm.permiso_acceso,
    };

    this.http.put<any>(`${this.apiBase}/usuarios/${this.usuarioEditId}`, payload, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('usuarios', 'ok', 'Usuario actualizado');
        this.cargarUsuarios();
        this.usuarioEditId = '';
        this.usuarioEncontrado = null;
        this.usuarioLookupId = '';
      },
      error: (err) => {
        this.setStatus('usuarios', 'error', err?.error?.message || 'Error al actualizar usuario');
      },
    });
  }

  eliminarUsuario() {
    if (!this.usuarioEliminarId) {
      this.setStatus('usuarios', 'error', 'Selecciona un usuario para eliminar');
      return;
    }

    this.http.delete<any>(`${this.apiBase}/usuarios/${this.usuarioEliminarId}`, { headers: this.headers() }).subscribe({
      next: () => {
        this.setStatus('usuarios', 'ok', 'Usuario eliminado');
        this.cargarUsuarios();
        this.usuarioEliminarId = '';
      },
      error: (err) => {
        this.setStatus('usuarios', 'error', err?.error?.message || 'Error al eliminar usuario');
      },
    });
  }

  onUsuarioSelectionChange(usuarioId: string) {
    this.usuarioLookupId = usuarioId;
    if (!usuarioId) {
      this.usuarioEditId = '';
      this.usuarioEncontrado = null;
      return;
    }

    const usuario = this.usuarios.find((u) => u._id === usuarioId);
    if (usuario) {
      this.usuarioEncontrado = usuario;
      this.usuarioEditId = usuarioId;
      this.assignUsuarioForm(usuario);
      this.setStatus('usuarios', 'ok', 'Usuario cargado');
    }
  }
}
