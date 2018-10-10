import { createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import MicroEvent from 'microevent';
import Screens from './app/screens/Screens';
import AppPreferences from './app/utils/AppPreferences';
import I18n from './app/i18n/i18n';
import GlobalSocket from './app/socket/GlobalSocket';
import EventBus from './app/socket/EventBus';
import TransactionsScreen from './app/screens/transactions/TransactionsScreen';
import AppConfig from './app/utils/AppConfig';
import LoginScreen from './app/screens/login/LoginScreen';
import Consts from './app/utils/Consts';


MicroEvent.mixin(GlobalSocket);
MicroEvent.mixin(EventBus);

async function initApp() {
  MicroEvent.mixin(LoginScreen);
  MicroEvent.mixin(TransactionsScreen);
  await initI18n();
  window.EventBus = new EventBus();
  return await initMasterdata();
}

async function initI18n() {
  try {
    const result = await AsyncStorage.getItem('user_locale');
    I18n.locale = result || 'en';
  } catch (error) {
    console.log('App.initI18n._error: ', error);
  }
}

async function initMasterdata() {
  try {
    const tokenSaved = await AsyncStorage.getItem('token_saved');
    console.log('tokenSaved', tokenSaved);
    if (tokenSaved !== 'true') {
      await AppPreferences.removeAccessToken();
      window.GlobalSocket = new GlobalSocket();
    } else {
      const credentials = await AppPreferences.getGeneric();

      const keychain = credentials.password;

      const parseAccessToken = keychain && keychain.includes(Consts.ACCESS_TOKEN_TITLE) ? JSON.parse(keychain).access_token : null;
      const parsePrivateKey = keychain && keychain.includes('private_key') ? JSON.parse(keychain).private_key : null;
      const parseMnemonic = keychain && keychain.includes('mnemonic') ? JSON.parse(keychain).mnemonic : null;

      AppConfig.ACCESS_TOKEN = parseAccessToken;
      AppConfig.PRIVATE_KEY = parsePrivateKey;
      AppConfig.MNEMONIC = parseMnemonic;

      window.GlobalSocket = new GlobalSocket();

      if (__DEV__) {
        console.log(`API Server: ${AppConfig.getApiServer()}`);
        console.log(`ACCESS_TOKEN: ${AppConfig.ACCESS_TOKEN}`);
        console.log(`PRIVATE_KEY: ${AppConfig.PRIVATE_KEY}`);
        console.log(`MNEMONIC: ${AppConfig.MNEMONIC}`);
      }
    }
  } catch (error) {
    console.log('App.initMasterdata._error: ', error);
  }
}

const App = createStackNavigator(Screens, {
  headerMode: 'screen',
});

export default App;
export { initApp };
