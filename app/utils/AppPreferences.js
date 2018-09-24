import { AsyncStorage } from 'react-native';


export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }
}
