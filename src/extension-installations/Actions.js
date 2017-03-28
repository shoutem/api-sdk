import rio, { update as rioUpdate, find, remove as rioRemove } from '@shoutem/redux-io';
import { mergeSettings, getSettings } from '../services/settings';
import extensionInstallationResource, { INSTALLATIONS } from '../resources/extensionInstallations';

export default class Actions {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = extensionInstallationResource(config);

    const { resourceConfig: schemaConfig } = this.resource;
    rio.registerSchema(schemaConfig);
  }

  get(config = null, tag = 'current') {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId } = resolvedConfig;

    const options = this.resource.get({ extensionInstallationId });
    return find(options, tag);
  }

  getAll(tag = 'all') {
    const options = this.resource.get();
    return find(options, tag);
  }

  remove(shortcut, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId } = resolvedConfig;

    const options = this.resource.remove({ extensionInstallationId });
    return rioRemove(options, shortcut);
  }

  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId } = resolvedConfig;

    const partialShortcut = {
      type: INSTALLATIONS,
      id: extensionInstallationId,
      ...patch,
    };

    const options = this.resource.update({ extensionInstallationId });
    return rioUpdate(options, partialShortcut);
  }

  updateSettings(extensionInstallation, settingsPatch) {
    const currentSettings = getSettings(extensionInstallation);
    const newSettings = mergeSettings(currentSettings, settingsPatch);

    const patch = {
      attributes: {
        settings: newSettings,
      },
    };

    return this.update(patch, extensionInstallation.id);
  }
}
