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
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';

export default {
  LoginScreen: { screen: LoginScreen },
  SplashScreen: { screen: SplashScreen },
  LandingScreen: { screen: LandingScreen },
  MainScreen: { screen: MainScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  SettingScreen: { screen: SettingScreen },
  CreateWalletByEmailScreen: { screen: CreateWalletByEmailScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  AddPinScreen: { screen: AddPinScreen },
  AuthScreen: { screen: AuthScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
};
