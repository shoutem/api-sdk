import { JsonApiResource } from './Resource';

export const EXTENSIONS = 'shoutem.core.installations';

export default function extensions(config) {
  const { appId, url } = config;
  const { apps } = url;

  const endpoint = `${apps}v1/apps/${appId}/installations/{extensionId}`;

  const resource = {
    schema: EXTENSIONS,
    request: {
      endpoint,
    },
  };

  return new JsonApiResource(resource);
}
