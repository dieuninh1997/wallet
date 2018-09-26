import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import AppConfig from './AppConfig';

export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async saveCodePin(code) {
    try {
      const responseGet = await this.getGeneric();

      const username = { userName: responseGet.username, codePin: 'code-pin' };
      const password = { access_token: responseGet.password, pin: code };

      await Keychain.setGenericPassword(JSON.stringify(username), JSON.stringify(password));
    } catch (err) {
      console.log('SaveCodePin._error:', err);
    }
  }

  static async getGeneric() {
    return await Keychain.getGenericPassword();
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static saveAccessToken(token) {
    AppConfig.ACCESS_TOKEN = token;
    Keychain.setGenericPassword('access_token', token, { accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
    AsyncStorage.setItem('token_saved', 'true');
  }

  static async getAccessToken() {
    const tokenSaved = await AsyncStorage.getItem('token_saved');
    if (tokenSaved) {
      return await Keychain.getGenericPassword();
    }
    return Promise.resolve({});
  }

  static removeAccessToken() {
    AppConfig.ACCESS_TOKEN = '';
    Keychain.resetGenericPassword();
    AsyncStorage.setItem('token_saved', 'false');
  }
}
