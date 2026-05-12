import { ProfileOption, ProfileMode } from './profile.types';

export const DEFAULT_PROFILE_MODE: ProfileMode = 'consumidor';

export const PROFILE_OPTIONS: ProfileOption[] = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Consumidor', value: 'consumidor' }
];
