import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import CreateWalletByEmailScreen from './createwallet/CreateWalletByEmailScreen';
import SettingScreen from './setting/SettingScreen';
import SplashScreen from './SplashScreen';
import LoginUsePinScreen from './login/LoginUsePinScreen';
import AddPinScreen from './pin/AddPinScreen';
import ChangePasswordScreen from './change-password/ChangePasswordScreen';

export default {
  SplashScreen: { screen: SplashScreen },
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  MainScreen: { screen: MainScreen },
  CreateWalletByEmailScreen: { screen: CreateWalletByEmailScreen },
  LandingScreen: { screen: LandingScreen },
  LoginScreen: { screen: LoginScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  SettingScreen: { screen: SettingScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  AddPinScreen: { screen: AddPinScreen },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
};
