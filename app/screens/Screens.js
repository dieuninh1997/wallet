import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import SettingScreen from './setting/SettingScreen';
import SendScreen from './send/SendScreen';
import RequestScreen from './request/RequestScreen';
import TransactionsScreen from './transactions/TransactionsScreen';
import AuthScreen from './auth/AuthScreen';

export default {
  AuthScreen: {
    screen: AuthScreen,
  },
  TransactionsScreen: {
    screen: TransactionsScreen,
  },
  RequestScreen: {
    screen: RequestScreen,
  },
  LandingScreen: {
    screen: LandingScreen,
  },
  CreateWalletPhoneNumberScreen: {
    screen: CreateWalletPhoneNumberScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  CreateWalletScreen: {
    screen: CreateWalletScreen,
  },
  SendScreen: {
    screen: SendScreen,
  },
  SettingScreen: {
    screen: SettingScreen,
  },
};
