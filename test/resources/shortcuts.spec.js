/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import nock from 'nock';
import 'isomorphic-fetch';
import shortcuts, { SHORTCUTS } from '../../src/resources/shortcuts';
import { fetchResource } from '../../src/resources/Resource';

const config = {
  appId: '123',
  shortcutId: 'abc',
  url: {
    apps: 'http://api.shoutem.local/',
  },
  auth: {
    token: 'abc',
  },
};

describe('Shortcuts', () => {

  beforeEach(() => {
    nock.cleanAll();
  });

  it('creating get resource', () => {
    const expectedGet = {
      schema: SHORTCUTS,
      request: {
        endpoint: 'http://api.shoutem.local/v1/apps/123/shortcuts/abc',
        method: 'GET',
        headers: {
          Authorization: 'Bearer abc',
          Accept: 'application/vnd.api+json',
        },
      },
    };

    const resource = shortcuts(config);
    const getResource = resource.get({ shortcutId: 'abc' });

    expect(getResource).to.deep.equal(expectedGet);
  });

  it('creating get fetch resource', (done) => {
    const expectedEndpoint = 'http://api.shoutem.local/v1/apps/123/shortcuts/abc';
    const expectedOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer abc',
        Accept: 'application/vnd.api+json',
      },
    };

    nock('http://api.shoutem.local')
      .matchHeader('Authorization', /Bearer abc/)
      .matchHeader('Accept', /application\/vnd\.api\+json/)
      .get('/v1/apps/123/shortcuts/abc')
      .reply(200, {
        data: 'hello world'
      });

    const resource = shortcuts(config);
    const getResource = resource.get({ shortcutId: 'abc' });

    fetchResource(getResource)
      .then(response => response.json())
      .then(json => {
        expect(json).to.eql({data: 'hello world'})
      })
      .then(done).catch(done);
  });

  it('Find all operation on resource', () => {
    const expectedGet = {
      schema: SHORTCUTS,
      request: {
        endpoint: 'http://api.shoutem.local/v1/apps/123/shortcuts/',
        method: 'GET',
        headers: {
          Authorization: 'Bearer abc',
          Accept: 'application/vnd.api+json',
        },
      },
    };

    const resource = shortcuts(config);
    const getResource = resource.get();

    expect(getResource).to.deep.equal(expectedGet);
  });

});
