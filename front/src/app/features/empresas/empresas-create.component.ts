import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-empresas-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="tab-head">
      <h2>Crear empresa</h2>
      <div class="actions">
        <button class="btn primary" type="submit" (click)="save()" [disabled]="isSaving">
          {{ isSaving ? 'Creando...' : 'Crear' }}
        </button>
      </div>
    </div>

    <div class="status" *ngIf="statusText" [class.error]="statusText.includes('Error')">{{ statusText }}</div>

    <form class="grid two" (ngSubmit)="save()">
      <label>
        <span>Razon social</span>
        <input [(ngModel)]="model.razon_social" name="razon_social" placeholder="Nombre de la empresa" required />
      </label>

      <label>
        <span>RUT</span>
        <input [(ngModel)]="model.rut" name="rut" placeholder="12345678-9" required />
      </label>

      <label>
        <span>Email</span>
        <input [(ngModel)]="model.email_contacto" name="email_contacto" type="email" placeholder="contacto@empresa.com" />
      </label>

      <label>
        <span>Teléfono</span>
        <input [(ngModel)]="model.telefono" name="telefono" placeholder="+56 9 1234 5678" />
      </label>

      <label>
        <span>Calle</span>
        <input [(ngModel)]="model.direccion.calle" name="calle" placeholder="Dirección" />
      </label>

      <label>
        <span>Ciudad</span>
        <input [(ngModel)]="model.direccion.ciudad" name="ciudad" placeholder="Santiago" />
      </label>

      <label>
        <span>Región</span>
        <input [(ngModel)]="model.direccion.region" name="region" placeholder="Metropolitana" />
      </label>

      <label>
        <span>País</span>
        <input [(ngModel)]="model.direccion.pais" name="pais" placeholder="Chile" />
      </label>
    </form>
  `,
  styles: [
    `:host{display:block}
    .tab-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(34,33,33,.1)}
    .tab-head h2{margin:0;font-size:1.5rem}
    .tab-head .actions{display:flex;gap:.5rem}
    form{display:flex;flex-direction:column;gap:0.5rem}
    form.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
    label{display:flex;flex-direction:column;gap:0.25rem}
    label span{font-size:.85rem;font-weight:600;color:var(--ink-600,#374151)}
    label input,label select{padding:0.65rem;border-radius:8px;border:1px solid rgba(34,33,33,.2);font-family:inherit;font-size:.95rem}
    label input:focus,label select:focus{outline:none;border-color:var(--accent,#0095d6);background:rgba(0,149,214,.02)}

    .btn{padding:0.65rem 1rem;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:.95rem}
    .btn.primary{background:var(--accent,#0095d6);color:#fff;transition:background .2s}
    .btn.primary:hover:not(:disabled){background:var(--accent-dark,#0075a8)}
    .btn:disabled{opacity:0.6;cursor:not-allowed}
    .status{padding:1rem;border-radius:8px;background:rgba(34,195,98,.08);color:#22c362;border:1px solid rgba(34,195,98,.2);margin-bottom:1rem}
    .status.error{background:rgba(239,68,68,.08);color:#ef4444;border-color:rgba(239,68,68,.2)}
    `,
  ],
})
export class EmpresasCreateComponent {
  statusText = '';
  isSaving = false;
  readonly apiBase = 'http://localhost:3000/api/v1';

  model: any = {
    razon_social: '',
    rut: '',
    email_contacto: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', region: '', pais: 'Chile' },
  };

  private initialModel = {
    razon_social: '',
    rut: '',
    email_contacto: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', region: '', pais: 'Chile' },
  };

  constructor(private http: HttpClient) {}

  save() {
    if (!this.model.razon_social || !this.model.rut) {
      this.statusText = 'Error: Razon social y RUT requeridos';
      return;
    }

    const headers = new HttpHeaders();
    this.isSaving = true;
    this.statusText = 'Enviando...';
    
    this.http.post<any>(`${this.apiBase}/clientes`, this.model, { headers }).subscribe({
      next: () => {
        this.statusText = 'Empresa creada correctamente';
        this.isSaving = false;
        this.clear();
      },
      error: (err) => {
        console.error(err);
        this.statusText = 'Error al crear empresa: ' + (err?.error?.message || err?.statusText || 'Desconocido');
        this.isSaving = false;
      }
    });
  }

  clear() {
    this.model = JSON.parse(JSON.stringify(this.initialModel));
    this.statusText = '';
  }
}

