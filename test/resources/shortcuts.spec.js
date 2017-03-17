/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import nock from 'nock';
import 'isomorphic-fetch';
import shortcuts, { SCHEMA } from '../../src/resources/shortcuts';
import { fetchResource } from '../../src/resources/Resource';

describe('Resource', () => {

  beforeEach(() => {
    nock.cleanAll();
  });

  it('Create shortcut resource', () => {
    const config = {
      appId: '123',
      shortcutId: 'abc',
      url: {
        apps: 'api.shoutem.local/',
      },
      auth : {
        token: 'abc',
      },
    };

    const expectedGet = {
      schema: SCHEMA,
      request: {
        endpoint: 'api.shoutem.local/v1/apps/123/shortcuts/abc',
        method: 'GET',
        headers: {
          Authorization: 'Bearer abc',
          Accept: 'application/vnd.api+json',
        },
      },
    };

    const s = shortcuts(config);
    const get = s.get({shortcutId: 'abc'});

    expect(get).to.deep.equal(expectedGet);
  });

  it('Create shortcut fetch resource', (done) => {
    const config = {
      appId: '123',
      shortcutId: 'abc',
      url: {
        apps: 'http://api.shoutem.local/',
      },
      auth : {
        token: 'abc',
      },
    };

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

    const s = shortcuts(config);
    const get = s.get({shortcutId: 'abc'});

    fetchResource(get)
      .then(response => response.json())
      .then(json => {
        expect(json).to.eql({data: 'hello world'})
      })
      .then(done).catch(done);
  });

  it('Find all operation on resource', () => {
    const config = {
      appId: '123',
      shortcutId: 'abc',
      url: {
        apps: 'api.shoutem.local/',
      },
      auth : {
        token: 'abc',
      },
    };

    const expectedGet = {
      schema: SCHEMA,
      request: {
        endpoint: 'api.shoutem.local/v1/apps/123/shortcuts/',
        method: 'GET',
        headers: {
          Authorization: 'Bearer abc',
          Accept: 'application/vnd.api+json',
        },
      },
    };

    const s = shortcuts(config);
    const get = s.get();

    expect(get).to.deep.equal(expectedGet);
  });

});
