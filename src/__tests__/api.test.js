import api, { methods, prefixUrl /* , makeRequest */ } from '../api';

// TODO: Improve tests for api
describe('api tests', () => {
  test('prefixUrl should handle a prefix correctly', () => {
    expect(prefixUrl('httpss://github.com', 'path')).toBe('httpss://github.com/path');
    expect(prefixUrl('', 'httpss://github.com')).toBe('httpss://github.com');
  });

  test('api object should have methods', () => {
    methods.forEach((method) => {
      expect(api).toHaveProperty(method);
    });
  });

  // test('api should return response from GET request', async () => {
  //   const data = await api.get('https://api.github.com/users/skoob13');
  //   expect(data.data.login).toBe('skoob13');
  // });

  // test('api should not return response from GET request', async () => {
  //   await expect(api.get('https://api.github.com/users/')).rejects;
  // });

  // test('makeRequest should return response from GET request', async () => {
  //   const data = await makeRequest({
  //     path: 'https://api.github.com',
  //     method: 'get',
  //     url: 'users/skoob13',
  //   });
  //   expect(data.data.login).toBe('skoob13');
  // });

  // test('makeRequest should not return response from GET request', async () => {
  //   await expect(makeRequest({
  //     method: 'GET',
  //     url: 'https://api.github.com/users/',
  //   })).rejects;
  // });

  // test('makeRequest should pass configuration for post', async (done) => {
  //   const body = { 1: 2 };
  //   const authorizationType = 'Authorization';
  //   const token = 'bearer';
  //   makeRequest({
  //     method: 'post',
  //     url: 'https://api.github.com/users/abc',
  //     request: {
  //       body,
  //     },
  //   }, {
  //     authorizationType,
  //     token,
  //   }).catch((e) => {
  //     expect(e.config.headers.Authorization).toBe(`${authorizationType} ${token}`);
  //     expect(e.config.data).toBe(JSON.stringify(body));
  //     done();
  //   });
  // });

  // test('makeRequest should pass configuration for params', async (done) => {
  //   const params = { a: 'b' };

  //   makeRequest({
  //     method: 'get',
  //     url: 'https://api.github.com/users/skoob13',
  //     request: {
  //       params,
  //     },
  //   }, {}).then((e) => {
  //     expect(e.request.path.indexOf('a=b') >= 0).toBeTruthy();
  //     done();
  //   });
  // });
});
