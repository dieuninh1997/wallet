import AppConfig from '../../utils/AppConfig';
import { get, post, put, del} from '../common/BaseRequest';

export function login(email, password, otp = '') {
  const params = {
    grant_type: 'password',
    client_id: AppConfig.getClientId(),
    client_secret: AppConfig.getClientSecret(),
    username: email,
    password,
    scope: '*',
    otp,
  };
  return post('/oauth/token', params);
}

export function ressetPassword(email) {
  let url = '/reset-password';
  let params = { email };

  return post(url, params);
}

export function register(email, password, referralId = '') {
  let params = {
    email,
    password,
    password_confirmation: password,
    agree_term: 1,
    referrer_code: referralId
  };

  return post('/users', params);
}

