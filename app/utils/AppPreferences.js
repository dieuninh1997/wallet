import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async saceCodePin(code) {
    const username = 'ok';
    await Keychain.setGenericPassword(username, code);
  }


  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static async getCodePin() {
    return await AsyncStorage.getItem('user_locale');
  }
}
