import LandingScreen from './landing/LandingScreen';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import CreateWalletByEmailScreen from './createwallet/CreateWalletByEmailScreen';
import CreateWalletByPassportScreen from './createwallet/CreateWalletByPassportScreen';
import SettingScreen from './setting/SettingScreen';
import SplashScreen from './SplashScreen';
import LoginUsePinScreen from './login/LoginUsePinScreen';
import AddPinScreen from './pin/AddPinScreen';
import ChangePasswordScreen from './change-password/ChangePasswordScreen';

export default {
  SplashScreen: { screen: SplashScreen },
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  MainScreen: { screen: MainScreen },
  LandingScreen: { screen: LandingScreen },
  LoginScreen: { screen: LoginScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  SettingScreen: { screen: SettingScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  CreateWalletByEmailScreen: { screen: CreateWalletByEmailScreen },
  CreateWalletByPassportScreen: { screen: CreateWalletByPassportScreen },
  AddPinScreen: { screen: AddPinScreen },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
};
