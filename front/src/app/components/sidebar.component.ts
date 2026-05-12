import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProfileMode } from '../profile/profile.types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styles: [`
    :host{display:block}
    .sidebar-shell{display:flex;flex-direction:column;gap:1rem;border-radius:14px;border:1px dashed rgba(34,33,33,.15);background:rgba(255,255,255,.5);backdrop-filter:blur(8px);box-shadow:0 16px 40px rgba(15,23,42,.06);padding:1rem}
    .brand{padding:0.75rem 0;border-bottom:1px solid rgba(34,33,33,.08);display:flex;align-items:center;justify-content:center}
    .brand-logo{display:block;width:auto;max-width:120px;height:auto}
    .menu{display:flex;flex-direction:column;gap:.5rem}
    .menu-item{width:100%;padding:.9rem 1rem;border-radius:12px;color:var(--ink-500,#6b7280);background:rgba(255,255,255,.42);border:1px solid rgba(34,33,33,.12);text-align:left;font-weight:600;transition:background .15s ease,color .15s ease,transform .15s ease,border-color .15s ease,box-shadow .15s ease;cursor:pointer;box-shadow:0 6px 16px rgba(15,23,42,.04)}
    .menu-item:hover{border-color:rgba(34,33,33,.2);background:rgba(255,255,255,.62)}
    .menu-item.active{background:linear-gradient(135deg, rgba(130,139,149,.22), rgba(255,255,255,.36));color:var(--ink-900,#1f2937);transform:translateX(2px);border-color:rgba(34,33,33,.18)}
  `]
})
export class SidebarComponent {
  @Input() mode: ProfileMode = 'consumidor';
  @Input() selectedItem = '';
  @Output() selectedItemChange = new EventEmitter<string>();

  get menuItems(): string[] {
    if (this.mode === 'admin') {
      return [
        'Empresa',
        'Centro de costos',
        'Proyectos',
        'Documentos',
        'Mantenciones',
        'Noticias',
        'Usuarios',
        'Resumen general'
      ];
    }

    return [
      'Inicio',
      'Mi ficha',
      'Proyectos',
      'Documentos',
      'Mantenciones',
      'Noticias',
      'Ayuda'
    ];
  }

  select(item: string): void {
    this.selectedItemChange.emit(item);
  }
}
