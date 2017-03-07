export default function resource(config) {
  const { appId, shortcutId, url, auth } = config;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcutId}`;

  return {
    endpoint,
    options: {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    },
  };
}
