import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-root-toast';
import AppConfig from './AppConfig';

export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async getGeneric() {
    return await Keychain.getGenericPassword();
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static async saveToKeychain(data) {
    try {
      const keychain = await Keychain.getGenericPassword();
      let keychainJson = keychain ? JSON.parse(keychain.password) : {};

      keychainJson = Object.assign(keychainJson, data);
      console.log('keychainJson', keychainJson);

      await Keychain.setGenericPassword('keychain', JSON.stringify(keychainJson), { accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
      await AsyncStorage.setItem('token_saved', 'true');
    } catch (error) {
      console.log('AppPreferences.saveToKeychain._error: ', error);
    }
  }

  static async removeAccessToken() {
    AppConfig.ACCESS_TOKEN = '';
    AppConfig.PRIVATE_KEY = '';
    AppConfig.MNEMONIC = '';
    Keychain.resetGenericPassword();
    await AsyncStorage.setItem('token_saved', 'false');
  }

  static async getEthAddress() {
    return await AsyncStorage.getItem('address');
  }

  static async getUserSettings() {
    const data = await AsyncStorage.getItem('user_settings');
    if (data) {
      return JSON.parse(data);
    }
  }

  static async saveUserSettings(json) {
    await AsyncStorage.setItem('user_settings', JSON.stringify(json));
  }

  static async getUserSecuritySettings() {
    const data = await AsyncStorage.getItem('user_security_settings');
    if (data) {
      return JSON.parse(data);
    }
  }

  static async saveUserSecuritySettings(json) {
    await AsyncStorage.setItem('user_security_settings', JSON.stringify(json));
  }

  static async getCoinSelected() {
    return await AsyncStorage.getItem('coin_selected');
  }

  static async saveCoinSelected(index) {
    await AsyncStorage.setItem('coin_selected', index);
  }
}
