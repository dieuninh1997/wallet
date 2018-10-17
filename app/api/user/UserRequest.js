import AppConfig from '../../utils/AppConfig';
import {
  get, post, put,
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
  console.log('params', params);

  return post('/oauth/token', params);
}

export function ressetPassword(email) {
  const url = '/reset-password';
  const params = { email };

  return post(url, params);
}

export function register(registerInfo = {}) {
  const params = {
    email: registerInfo.email,
    passport_number: registerInfo.passport_number,
    password: registerInfo.password,
    password_confirmation: registerInfo.password_confirmation,
    agree_term: 1,
    referrer_code: 1,
    mnemonic: registerInfo.mnemonic,
    login_type: registerInfo.login_type,
    eth_address: registerInfo.eth_address,
  };
  console.log('params', params);

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

export function changePassword(password, newPassword, otp) {
  const url = '/change-password';
  const params = {
    password,
    new_password: newPassword,
  };
  return put(url, params);
}

export function restoreAccount(mnemonic) {
  const url = '/restore-account';
  const params = {
    mnemonic,
  };
  return post(url, params);
}

export function sendVerificationEmail(email) {
  const url = '/send-email-verification';
  const params = {
    email
  };
  return post(url, params);
}

export function getUserSecuritySettings() {
  const url = '/user-security-settings';
  const params = {
  };
  return get(url, params);
}

export function updateUserSettings(params = {}) {
  const url = '/user-settings';
  return put(url, params);
}

export function getUserSettings() {
  const url = '/user-settings';
  const params = {
  };
  return get(url, params);
}

export function createGoogleOtpSecret() {
  const url = '/create-otp-secret';
  return post(url);
}

export function enableGoogleOtp(password, otp) {
  const url = '/enable-otp';
  const params = { password, otp };
  return post(url, params);
}

export function disableGoogleOtp(password, otp) {
  const url = '/disable-otp';
  const params = { password, otp };
  return post(url, params);
}
