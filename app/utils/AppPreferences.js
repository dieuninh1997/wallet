import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-root-toast';
import AppConfig from './AppConfig';

export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async saveCodePin(code) {
    try {
      const keychain = await Keychain.getGenericPassword();
      const keychainJson = keychain ? JSON.parse(keychain.password) : {};

      keychainJson.pin = code;
      console.log('keychainJson', keychainJson);
      await Keychain.setGenericPassword('keychain', JSON.stringify(keychainJson));
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

  static async saveAccessToken(token) {
    try {
      const keychain = await Keychain.getGenericPassword();
      const keychainJson = keychain ? JSON.parse(keychain.password) : {};

      keychainJson.access_token = token;

      console.log('keychainJson', keychainJson);
      Keychain.setGenericPassword('keychain', JSON.stringify(keychainJson), { accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });

      AppConfig.ACCESS_TOKEN = token;
    } catch (error) {
      console.log('AppPreferences.saveAccessToken._error: ', error);
    }
  }

  static async savePrivateKey(privateKey) {
    try {
      const keychain = await Keychain.getGenericPassword();
      const keychainJson = keychain ? JSON.parse(keychain.password) : {};

      keychainJson.private_key = privateKey;

      console.log('keychainJson', keychainJson);
      Keychain.setGenericPassword('keychain', JSON.stringify(keychainJson), { accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });

      AppConfig.PRIVATE_KEY = privateKey;
    } catch (error) {
      console.log('AppPreferences.saveAccessToken._error: ', error);
    }
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
