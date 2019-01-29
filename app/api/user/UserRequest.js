import AppConfig from '../../utils/AppConfig';
import {
  get, post, put, postImage,
} from '../common/BaseRequest';
import I18n from '../../i18n/i18n';

export function login(email, password, otp = '', loginType = 1, accessToken = '') {
  const params = {
    grant_type: 'password',
    client_id: AppConfig.getClientId(),
    client_secret: AppConfig.getClientSecret(),
    username: email,
    password,
    scope: '*',
    otp,
    login_type: loginType,
    facebook_access_token: accessToken,
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
    phone_number: registerInfo.phone_number,
    password: registerInfo.password,
    password_confirmation: registerInfo.password_confirmation,
    agree_term: 1,
    referrer_code: 1,
    mnemonic: registerInfo.mnemonic,
    login_type: registerInfo.login_type,
    eth_address: registerInfo.eth_address,
    facebook_access_token: registerInfo.facebook_access_token,
    keystore: registerInfo.keystore,
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

export function changePassword(password, newPassword, otp = '') {
  const url = '/change-password';
  const params = {
    password,
    new_password: newPassword,
    otp,
  };
  return put(url, params);
}

export function restoreAccount(mnemonic, loginInfo = {}) {
  const url = '/restore-account';
  const params = {
    mnemonic,
    username: loginInfo.email,
    login_type: loginInfo.loginType,
    facebook_access_token: loginInfo.accessToken,
  };
  return post(url, params);
}

export function sendVerificationEmail(email) {
  const url = '/send-email-verification';
  const params = {
    email,
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

export function enableGoogleOtp(password, smsCode, otp) {
  const url = '/enable-otp';
  const params = { password, smsCode, otp };
  return post(url, params);
}

export function disableGoogleOtp(password, smsCode, otp) {
  const url = '/disable-otp';
  const params = { password, smsCode, otp };
  return post(url, params);
}

export function sendPhoneVerificationCode(phone_number) {
  const url = '/send-phone-verification';
  params = { phone_number };
  return post(url, params);
}

export function verifyPhoneNumber(otp) {
  const url = '/verify-phone-number';
  params = { otp };
  return post(url, params);
}

export function verifyPassport(passport_number, image, image2) {
  const url = '/verify-passport';
  const data = new FormData();

  data.append('passport_number', passport_number);
  data.append('image', image);
  data.append('image2', image2);
  data.append('lang', I18n.locale);
  return postImage(url, data);
}
