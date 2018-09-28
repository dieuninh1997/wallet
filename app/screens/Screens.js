import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import AuthScreen from './auth/AuthScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import CreateWalletByEmailScreen from './createwallet/CreateWalletByEmailScreen';
import SettingScreen from './setting/SettingScreen';
import SplashScreen from './SplashScreen';
import LoginUsePinScreen from './login/LoginUsePinScreen';
import AddPinScreen from './pin/AddPinScreen';

export default {
  SplashScreen: { screen: SplashScreen },
  MainScreen: { screen: MainScreen },
  CreateWalletByEmailScreen: { screen: CreateWalletByEmailScreen },
  LandingScreen: { screen: LandingScreen },
  LoginScreen: { screen: LoginScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  SettingScreen: { screen: SettingScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  AddPinScreen: { screen: AddPinScreen },
  AuthScreen: { screen: AuthScreen },
};
