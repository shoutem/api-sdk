import { JsonApiResource } from './Resource';

export const SHORTCUTS = 'shoutem.core.shortcuts';

export default function shortcuts(config) {
  const { appId, url, auth } = config;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/{shortcutId}`;

  const resource = {
    schema: SHORTCUTS,
    request: {
      endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  return new JsonApiResource(resource);
}
