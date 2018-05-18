import { generateSaga } from '../saga';
import type from '../type';

const link = 'https://api.github.com/users/skoob13';
const wrongLink = 'https://api.github.com/users';

const sagaType = type('type');

describe('test saga creator', () => {
  test('test default saga lifecycle', () => {
    const hooks = {
      beforeRequest: () => {},
      request: () => {},
      beforeSuccess: () => {},
      success: () => {},
      beforeFailure: () => {},
      failure: () => {},
    };

    const s = generateSaga({ typeCreator: sagaType })({
      hooks,
      request: {
        path: link,
        method: 'GET',
      },
    });

    console.log(s.next())
  });
});
