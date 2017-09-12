import _ from 'lodash';

export function getError(response) {
  return response.clone().json().then(jsonResponse => (
    _.get(jsonResponse, 'errors', [])
  ));
}

export function getErrorCode(response) {
  return getError(response).then(error => (
    _.get(error, 'code')
  ));
}
