import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import AuthScreen from './auth/AuthScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import SettingScreen from './setting/SettingScreen';

export default {
  MainScreen: { screen: MainScreen },
  SettingScreen: { screen: SettingScreen },
  AuthScreen: { screen: AuthScreen },
  LandingScreen: { screen: LandingScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  LoginScreen: { screen: LoginScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
};
