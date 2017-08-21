/* eslint-disable no-unused-expressions */
import 'fetch-everywhere';
import { expect } from 'chai';
import Api from '../src/Api';

describe('Api', () => {
  it('Create api', () => {
    const api = new Api();

    expect(api).to.be.an.instanceof(Api);
  });

  it('Initialize Api', () => {
    const api = new Api();

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

    api.init(config);

    expect(api.config).to.be.deep.equal(config);
  });

  it('Re-initialize Api', () => {
    const api = new Api();

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

    api.init(config);

    expect(api.config).to.be.deep.equal(config);

    api.init({ shortcutId: 'edf'});
    expect(api.config).to.be.deep.equal({...config, shortcutId: 'edf'});
  });
});
