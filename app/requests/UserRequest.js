import BaseRequest from '../libs/BaseRequest';
import AppConfig from '../utils/AppConfig';

export default class UserRequest extends BaseRequest {
  login(email, password, otp = '') {
    const params = {
      grant_type: 'password',
      client_id: AppConfig.getClientId(),
      client_secret: AppConfig.getClientSecret(),
      username: email,
      password,
      scope: '*',
      otp,
    };
    return this.post('/oauth/token', params);
  }

  testLog() {
    console.log('Muhahahhaaa');
  }
}
