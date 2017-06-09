import { JsonApiResource } from './Resource';

export const SHORTCUTS = 'shoutem.core.shortcuts';

export default function shortcuts(config) {
  const { appId, url } = config;
  const { apps } = url;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/{shortcutId}`;

  const resource = {
    schema: SHORTCUTS,
    request: {
      endpoint,
    },
  };

  return new JsonApiResource(resource);
}
