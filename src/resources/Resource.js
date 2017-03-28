import _ from 'lodash';
import UriTemplate from 'urijs/src/URITemplate';

const defaultResource = {
  actions: {
    get: {
      request: {
        method: 'GET',
      },
    },
    create: {
      request: {
        method: 'POST',
      },
    },
    update: {
      request: {
        method: 'PATCH',
      },
    },
    remove: {
      request: {
        method: 'DELETE',
      },
    },
  },
};

const jsonApiResource = _.merge({}, defaultResource, {
  request: {
    headers: {
      Accept: 'application/vnd.api+json',
    },
  },
  actions: {
    create: {
      request: {
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      },
    },
    update: {
      request: {
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      },
    },
  },
});

export default class Resource {
  constructor(resourceConfig, templateResource = defaultResource) {
    this.registerActions = this.registerActions.bind(this);

    const resource = _.merge({}, templateResource, resourceConfig);
    const { actions } = resource;

    this.resourceConfig = _.omit(resource, 'actions');
    this.actions = actions;

    this.registerActions();
  }

  registerActions() {
    _.mapKeys(this.actions, (actionConfig, actionKey) => {
      const resource = _.merge({}, this.resourceConfig, actionConfig);
      this[actionKey] = (params = {}) => {
        const resolvedEndpoint = new UriTemplate(resource.request.endpoint).expand(params);
        return _.merge({}, resource, {
          request: {
            endpoint: resolvedEndpoint,
          },
        });
      };
    });
  }
}

export class JsonApiResource extends Resource {
  constructor(resourceConfig) {
    super(resourceConfig, jsonApiResource);
  }
}

const fetchOptionsResolver = _.flow([
  options => _.pick(options, ['method', 'body', 'headers', 'credentials']),
  options => _.omitBy(options, _.isNil),
]);

export function fetchResource(resource, options = {}) {
  const { request } = resource;
  const {
    endpoint,
    ...resourceOptions,
    } = request;

  const resolvedOptions = {
    ...fetchOptionsResolver(resourceOptions),
    ...options,
  };

  return fetch(endpoint, resolvedOptions);
}
