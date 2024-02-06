import { GameSettings } from './../models/game.model';

const DEFAULT_SETTINGS = {
  size: 'sm',
  lang: ['en', 'ru'],
  type: 'single'
};

export default class SettingsService {
  static update(id: string, settings: GameSettings): void {
    localStorage.setItem(`${id}-settings`, JSON.stringify(settings));
  }

  static getSettings(id?: string): GameSettings {
    const existedSettings = localStorage.getItem(`${id}-settings`);
    return id && existedSettings ? existedSettings : JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  }
}
