import { update as rioUpdate, find, remove as rioRemove } from '@shoutem/redux-io';
import { mergeSettings, getSettings } from '../services/settings';
import shortcutResource, { SCHEMA } from '../resources/shortcuts';

export default class Actions {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = shortcutResource(config);
  }

  get(config = null, tag = 'current') {
    const resolvedConfig = { ...this.config, ...config };
    const { shortcutId } = resolvedConfig;

    const options = this.resource.get({ shortcutId });
    return find(options, tag);
  }

  getAll(tag = 'all') {
    const options = this.resource.get();
    return find(options, tag);
  }

  remove(shortcut, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { shortcutId } = resolvedConfig;

    const options = this.resource.remove({ shortcutId });
    return rioRemove(options, shortcut);
  }

  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { shortcutId } = resolvedConfig;

    const partialShortcut = {
      type: SCHEMA,
      id: shortcutId,
      ...patch,
    };

    const options = this.resource.update({ shortcutId });
    return rioUpdate(options, partialShortcut);
  }

  updateSettings(shortcut, settingsPatch) {
    const currentSettings = getSettings(shortcut);
    const newSettings = mergeSettings(currentSettings, settingsPatch);

    const patch = {
      attributes: {
        settings: newSettings,
      },
    };

    return this.update(patch, shortcut.id);
  }
}
