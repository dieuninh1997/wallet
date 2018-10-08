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
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';
import ChangePasswordScreen from './change-password/ChangePasswordScreen';
import RestoreWalletScreen from './restore-wallet/RestoreWalletScreen';
import BackupPassphraseScreen from './backup-passphrase/BackupPassphraseScreen';
import LocalCurrencyScreen from './localCurrency/LocalCurrencyScreen';
import TermsConditionScreen from './terms/TermsConditionScreen';

export default {
  SplashScreen: { screen: SplashScreen },
  LoginScreen: { screen: LoginScreen },
  RestoreWalletScreen: { screen: RestoreWalletScreen },
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  MainScreen: { screen: MainScreen },
  LandingScreen: { screen: LandingScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  SettingScreen: { screen: SettingScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  CreateWalletByEmailScreen: { screen: CreateWalletByEmailScreen },
  CreateWalletByPassportScreen: { screen: CreateWalletByPassportScreen },
  AddPinScreen: { screen: AddPinScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
  BackupPassphraseScreen: { screen: BackupPassphraseScreen },
  LocalCurrencyScreen: { screen: LocalCurrencyScreen },
  TermsConditionScreen: {screen: TermsConditionScreen},
};
