import { AsyncStorage } from 'react-native';
import * as Keychain from "react-native-keychain";


export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static async getAccessToken() {
    const tokenSaved = await AsyncStorage.getItem('token_saved');
    if (tokenSaved) {
      return await Keychain.getGenericPassword();
    } else {
      return Promise.resolve({});
    }
  }
}
