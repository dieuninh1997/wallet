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
    I18n.locale = result;
  } catch (error) {
    console.log('error');
  }
}

async function initMasterdata() {
  const credentials = await AppPreferences.getAccessToken();

  const access_token = credentials.password;
  const parseAccessToken = access_token && access_token.includes(Consts.ACCESS_TOKEN_TITLE) ? JSON.parse(access_token).access_token : access_token;

  AppConfig.ACCESS_TOKEN = parseAccessToken;
  window.GlobalSocket = new GlobalSocket();

  if (__DEV__) {
    console.log(`API Server: ${AppConfig.getApiServer()}`);
    console.log(`ACCESS_TOKEN: ${AppConfig.ACCESS_TOKEN}`);
  }
}

const App = createStackNavigator(Screens, {
  headerMode: 'screen',
});

export default App;
export { initApp };
