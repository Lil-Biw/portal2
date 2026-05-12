import { Injectable, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DEFAULT_PROFILE_MODE } from './profile.options';
import { ProfileMode } from './profile.types';

const STORAGE_KEY = 'front_profile_mode';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly modeSignal = signal<ProfileMode>(this.loadInitialMode());

  readonly mode = computed(() => this.modeSignal());

  setMode(mode: ProfileMode): void {
    this.modeSignal.set(mode);
    this.persist(mode);
  }

  toggleMode(): void {
    const next: ProfileMode = this.modeSignal() === 'admin' ? 'consumidor' : 'admin';
    this.setMode(next);
  }

  private loadInitialMode(): ProfileMode {
    if (!isPlatformBrowser(this.platformId)) {
      return DEFAULT_PROFILE_MODE;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'admin' || stored === 'consumidor') {
      return stored;
    }

    return DEFAULT_PROFILE_MODE;
  }

  private persist(mode: ProfileMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, mode);
  }
}
