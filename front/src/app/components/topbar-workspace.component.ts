import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileMode } from '../profile/profile.types';

@Component({
  selector: 'app-topbar-workspace',
  standalone: true,
  templateUrl: './topbar-workspace.component.html',
  styles: [`
    :host{display:block}
    .workspace-topbar{display:flex;flex-direction:column;gap:1rem;padding:1rem;border-radius:14px;border:1px dashed rgba(34,33,33,.15);background:rgba(255,255,255,.5)}
    .workspace-topbar-head{display:flex;align-items:center;justify-content:space-between;gap:1rem}
    .workspace-actions{display:flex;gap:.5rem;flex-wrap:wrap}
    .eyebrow{margin:0 0 .25rem;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-500,#6b7280)}
    .workspace-note{margin:.25rem 0 0;color:var(--ink-500,#6b7280);font-size:.9rem}
    .workspace-selection{margin:.15rem 0 0;color:var(--accent,#0095d6);font-size:.82rem;font-weight:700}
    .ghost{padding:.65rem 1rem;border-radius:12px;border:none;font-weight:700;cursor:pointer;background:transparent;border:1px solid rgba(34,33,33,.2)}
    .workspace-actions .active{background:var(--ink-900,#1f2937);color:#fff7e9}

    @media (max-width: 980px){
      .workspace-topbar-head{flex-direction:column;align-items:flex-start}
    }
  `]
})
export class TopbarWorkspaceComponent {
  @Input() mode: ProfileMode = 'consumidor';
  @Input() selectedItem = '';
  @Input() workspaceAction: 'crear'|'editar'|'eliminar'|'buscar' = 'crear';

  @Output() actionChange = new EventEmitter<'crear'|'editar'|'eliminar'|'buscar'>();

  get defaultSelection(): string {
    return this.mode === 'admin' ? 'Empresa' : 'Inicio';
  }

  get title(): string {
    return this.mode === 'admin' ? 'Workspace Administrador' : 'Workspace Consumidor';
  }

  get subtitle(): string {
    return this.mode === 'admin' ? 'Gestion general' : 'Panel personal';
  }

  setAction(action: 'crear'|'editar'|'eliminar'|'buscar') {
    this.actionChange.emit(action);
  }
}
