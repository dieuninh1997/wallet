import LandingScreen from './landing/LandingScreen';
import MainScreen from './main/MainScreen';
import CreateWalletScreen from './createwallet/CreateWalletScreen';
import CreateWalletPhoneNumberScreen from './createwallet/CreateWalletPhoneNumberScreen';
import CreateWalletByEmailScreen from './createwallet/CreateWalletByEmailScreen';
import CreateWalletByPassportScreen from './createwallet/CreateWalletByPassportScreen';
import SettingScreen from './setting/SettingScreen';
import SplashScreen from './SplashScreen';
import LoginUsePinScreen from './login/LoginUsePinScreen';
import LoginListScreen from './login/LoginListScreen';
import LoginBaseScreen from './login/LoginBaseScreen';
import ChangePinScreen from './pin/ChangePinScreen';
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';
import ChangePasswordScreen from './change-password/ChangePasswordScreen';
import RestoreWalletScreen from './restore-wallet/RestoreWalletScreen';
import BackupPassphraseScreen from './backup-passphrase/BackupPassphraseScreen';
import BackupPassphraseScreenCompact from './backup-passphrase/BackupPassphraseScreenCompact';
import TransactionDetailScreen from './transactions/TransactionDetailScreen';
import LocalCurrencyScreen from './localCurrency/LocalCurrencyScreen';
import TermsConditionScreen from './terms/TermsConditionScreen';
import ListofAccep from './terms/ListofAccep';
import AddPinScreen from './pin/AddPinScreen';
import BackupKeyScreen from './setting/2fa/BackupKeyScreen';
import DownloadAndInstallScreen from './setting/2fa/DownloadAndInstallScreen';
import EnterBackupKeyScreen from './setting/2fa/EnterBackupKeyScreen';
import GoogleAuthScreen from './setting/2fa/GoogleAuthScreen';
import GoogleOtpVerifyScreen from './login/GoogleOtpVerifyScreen';
import PassportNumberVerifyScreen from './passport-number-verify/PassportNumberVerifyScreen';
import UploadPassportNumber from './passport-number-verify/UploadPassportNumber';
import StepCodeScreen from './setting/2fa/StepCodeScreen';
import MaintenanceScreen from './maintenance/MaintenanceScreen';

export default {
  SplashScreen: { screen: SplashScreen },
  StepCodeScreen: { screen: StepCodeScreen },
  RestoreWalletScreen: { screen: RestoreWalletScreen },
  LoginUsePinScreen: { screen: LoginUsePinScreen },
  LoginListScreen: { screen: LoginListScreen },
  MainScreen: { screen: MainScreen },
  LandingScreen: { screen: LandingScreen },
  CreateWalletScreen: { screen: CreateWalletScreen },
  SettingScreen: { screen: SettingScreen },
  CreateWalletPhoneNumberScreen: { screen: CreateWalletPhoneNumberScreen },
  CreateWalletByEmailScreen: { screen: CreateWalletByEmailScreen },
  CreateWalletByPassportScreen: { screen: CreateWalletByPassportScreen },
  ChangePinScreen: { screen: ChangePinScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
  BackupPassphraseScreen: { screen: BackupPassphraseScreen },
  BackupPassphraseScreenCompact: { screen: BackupPassphraseScreenCompact },
  TransactionDetailScreen: { screen: TransactionDetailScreen },
  LocalCurrencyScreen: { screen: LocalCurrencyScreen },
  TermsConditionScreen: { screen: TermsConditionScreen },
  ListofAccep: { screen: ListofAccep },
  AddPinScreen: { screen: AddPinScreen },
  BackupKeyScreen: { screen: BackupKeyScreen },
  DownloadAndInstallScreen: { screen: DownloadAndInstallScreen },
  EnterBackupKeyScreen: { screen: EnterBackupKeyScreen },
  GoogleAuthScreen: { screen: GoogleAuthScreen },
  GoogleOtpVerifyScreen: { screen: GoogleOtpVerifyScreen },
  LoginBaseScreen: { screen: LoginBaseScreen },
  UploadPassportNumber: { screen: UploadPassportNumber },
  PassportNumberVerifyScreen: { screen: PassportNumberVerifyScreen },
  MaintenanceScreen: { screen: MaintenanceScreen },
};
