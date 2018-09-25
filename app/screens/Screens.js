import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import AuthScreen from './auth/AuthScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import SettingScreen from './setting/SettingScreen';
import SplashScreen from './SplashScreen';
import LoginUsePinScreen from './login/LoginUsePinScreen';

export default {
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  SplashScreen: { screen: SplashScreen },
  LandingScreen: { screen: LandingScreen },
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  SettingScreen: { screen: SettingScreen },
  AuthScreen: { screen: AuthScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
};
