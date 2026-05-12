import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileMode } from '../profile/profile.types';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styles: [`
    :host { display: block; }
    .topbar-inner{min-height:60px;border-radius:14px;border:1px dashed rgba(34,33,33,.15);background:linear-gradient(135deg, rgba(255,255,255,.52), rgba(255,255,255,.26));backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0.6rem 1rem;box-shadow:0 16px 40px rgba(15,23,42,.06);border-left:6px solid var(--accent,#0095d6)}
    .topbar-inner.admin{background:linear-gradient(135deg, rgba(130,139,149,.22), rgba(255,255,255,.36));}
    .topbar-inner.consumidor{background:linear-gradient(135deg, rgba(0,149,214,.22), rgba(255,255,255,.36));}
    .brand{display:flex;align-items:center;min-width:0}
    .portal-logo{height:36px;width:auto;display:block;object-fit:contain}
    .topbar-actions{display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;justify-content:flex-end}
    .user-btn{border:1px solid rgba(34,33,33,.2);background:transparent;color:var(--ink-900,#1f2937);border-radius:12px;padding:0.5rem 0.8rem;font-weight:700;cursor:pointer;font-size:0.9rem}
    .mode-chip{background:var(--accent,#0095d6);color:#fff7e9;padding:0.35rem 0.65rem;border-radius:999px;font-size:11px;font-weight:700;box-shadow:0 8px 18px rgba(0,0,0,.08)}
  `]
})
export class TopbarComponent {
  @Input() mode: ProfileMode = 'consumidor';
  @Output() userToggle = new EventEmitter<void>();

  get modeLabel(): string {
    return this.mode === 'admin' ? 'Administrador' : 'Consumidor';
  }
}
