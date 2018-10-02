import AppConfig from '../../utils/AppConfig';
import {
  get, post,
} from '../common/BaseRequest';

export function login(email, password, otp = '', login_type = 1) {
  const params = {
    grant_type: 'password',
    client_id: AppConfig.getClientId(),
    client_secret: AppConfig.getClientSecret(),
    username: email,
    password,
    scope: '*',
    otp,
    login_type,
  };
  return post('/oauth/token', params);
}

export function ressetPassword(email) {
  const url = '/reset-password';
  const params = { email };

  return post(url, params);
}

export function register(email, password, referralId = '') {
  const params = {
    email,
    password,
    password_confirmation: password,
    agree_term: 1,
    referrer_code: referralId,
  };

  return post('/users', params);
}

export function getCurrentUser(useCache = true, params) {
  if (this.user && useCache) {
    return new Promise((resolve) => {
      resolve(this.user);
    });
  }
  return new Promise((resolve, reject) => {
    const url = '/user';
    const self = this;

    get(url, params)
      .then((user) => {
        self.user = user;
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function changePassword(password, new_password, otp){
  let url = '/change-password';
  let params = {
    password,
    new_password,
    otp
  }
  return post(url, params);
}
