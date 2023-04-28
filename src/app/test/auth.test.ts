import { User } from '../shared/services/auth';
import { AuthStorageService } from '../shared/services/authStorage';

describe('Class User', () => {
  const user = new User();
  describe('login', () => {
    test('login should be called', () => {
      const mockSetToken = jest.spyOn(AuthStorageService.prototype, 'setToken');
      user.login();
      expect(mockSetToken).toBeCalledTimes(1);
      expect(mockSetToken).toBeCalledWith('token');
    });
  });
  test('logout should be called', () => {
    const mockRemoveToken = jest.spyOn(
      AuthStorageService.prototype,
      'removeToken'
    );
    user.logout();
    expect(mockRemoveToken).toBeCalledTimes(1);
    expect(mockRemoveToken).toBeCalledWith();
  });
});
