import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-root-toast';
import AppConfig from './AppConfig';
import Consts from './Consts';

export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async saveCodePin(code) {
    try {
      const username = { userName: Consts.ACCESS_TOKEN_TITLE, codePin: Consts.CODE_PIN };
      const password = { access_token: AppConfig.ACCESS_TOKEN, pin: code };

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

  static showToastMessage(message) {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
}
