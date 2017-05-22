import { JsonApiResource } from './Resource';

export const EXTENSIONS = 'shoutem.core.installations';

export default function extensions(config) {
  const { appId, url, auth } = config;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/installations/{extensionId}`;

  const resource = {
    schema: EXTENSIONS,
    request: {
      endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  return new JsonApiResource(resource);
}
