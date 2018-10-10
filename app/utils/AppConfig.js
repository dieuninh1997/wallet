import {
  DEV,
  API_SERVER as DEV_API_SERVER,
  SOCKET_SERVER as DEV_SOCKET_SERVER,
  CLIENT_ID as DEV_CLIENT_ID,
  CLIENT_SECRET as DEV_CLIENT_SECRET,
  ASSET_SERVER as DEV_ASSET_SERVER,
} from 'react-native-dotenv';

export default class AppConfig {
  static API_SERVER = 'http://mango.sotatek.com';

  static API_VERSION = 'v1';

  static SOCKET_SERVER = 'wss://socket.bitkoex.com:6001';

  static ASSET_SERVER = 'http://mango.sotatek.com';

  static CLIENT_ID='1';

  static CLIENT_SECRET = 'StlCjFYGWaqV6A1z3Rd01K2aEM2bsD5cVCBK7xhF';

  static ACCESS_TOKEN = '';

  static SIGN_UP_URL = '/webview/sign_up';

  static PRIVATE_KEY = '';

  static MNEMORIC = '';

  static dev() {
    return __DEV__ && JSON.parse(DEV);
  }

  static isLogin() {
    return !!AppConfig.ACCESS_TOKEN;
  }

  static getApiServer() {
    return AppConfig.dev() ? DEV_API_SERVER : AppConfig.API_SERVER;
  }

  static getApiVersion() {
    return AppConfig.API_VERSION;
  }

  static getSocketServer() {
    return AppConfig.dev() ? DEV_SOCKET_SERVER : AppConfig.SOCKET_SERVER;
  }

  static getClientId() {
    return AppConfig.dev() ? DEV_CLIENT_ID : AppConfig.CLIENT_ID;
  }

  static getClientSecret() {
    return AppConfig.dev() ? DEV_CLIENT_SECRET : AppConfig.CLIENT_SECRET;
  }

  static getAssetServer() {
    return AppConfig.dev() ? DEV_ASSET_SERVER : AppConfig.ASSET_SERVER;
  }

  static getSignUpURL() {
    return this.getAssetServer() + AppConfig.SIGN_UP_URL;
  }
}
