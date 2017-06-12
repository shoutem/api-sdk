import _ from 'lodash';
import Uri from 'urijs';
import * as fetchTokenIntercept from '@shoutem/fetch-token-intercept';

const AUTH_TOKENS = 'shoutem.auth.tokens';

let authTokenEndpoint = null;
let authSessionEndpoint = null;
function initializeAuthEndpoints(authApi) {
  authTokenEndpoint = new Uri(authApi)
    .path('/v1/auth/tokens')
    .toString();

  authSessionEndpoint = new Uri(authApi)
    .path('/v1/legacy-sessions')
    .toString();
}

function createAccessTokenRequest(refreshToken) {
  return new Request(authTokenEndpoint, {
    headers: {
      authorization: `Bearer ${refreshToken}`,
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: {
        type: AUTH_TOKENS,
        attributes: {
          tokenType: 'access-token',
        },
      },
    }),
    method: 'POST',
  });
}

function shouldIntercept(baseApi) {
  // Regex used to match urls and detect if url belongs to Shoutem api or in case of local
  // development to locahost. Regex tries to match url hostname against against shoutem api base
  // url or localhost.
  // eslint-disable-next-line max-len
  const apiSubdomainRegex = new RegExp(`^([.a-z0-9]*?)\.*(localhost|${baseApi})$`, 'g');

  return (request) => {
    // add auth headers only if we're accessing known API endpoints
    const requestUri = new Uri(request.url);
    const requestHostname = requestUri.hostname();

    const authRequired = requestHostname.match(apiSubdomainRegex);
    const returnValue = authRequired &&
      request.url !== authTokenEndpoint &&
      request.url !== authSessionEndpoint;
    return returnValue;
  };
}

function parseAccessToken(response) {
  return response.clone().json().then(jsonData =>
    _.get(jsonData, 'data.attributes.token')
  );
}

function authorizeRequest(request, accessToken) {
  request.headers.set('Authorization', `Bearer ${accessToken}`);
  return request;
}

function shouldInvalidateAccessToken(response) {
  if (!response.ok) {
    return false;
  }

  return response.clone().json().then(jsonData => (
    _.get(jsonData, 'meta.invalidateAccessToken', false)
  ), () => false);
}

export function initializeFetchTokenInterceptor(config) {
  const { token: refreshToken } = config.auth;
  const { auth, baseApi } = config.url;

  initializeAuthEndpoints(auth);

  const configuration = {
    authorizeRequest,
    shouldInvalidateAccessToken,
    parseAccessToken,
    createAccessTokenRequest,
    shouldIntercept: shouldIntercept(baseApi),
    // can be removed when server-side token invalidation works (SEEXT-4012)
    shouldWaitForTokenRenewal: true,
  };

  fetchTokenIntercept.configure(configuration);
  fetchTokenIntercept.authorize(refreshToken);
}
