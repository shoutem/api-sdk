import { JsonApiResource } from './Resource';

export const INSTALLATIONS = 'shoutem.core.installations';

export default function extensionInstallations(config) {
  const { appId, url, auth } = config;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/installations/{extensionInstallationId}`;

  const resource = {
    schema: INSTALLATIONS,
    request: {
      endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  return new JsonApiResource(resource);
}
