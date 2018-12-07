import React from 'react';
import {
  View, Text, ScrollView, TouchableWithoutFeedback, AsyncStorage, RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-switch';
import TouchID from 'react-native-touch-id';

import MangoBackButton from '../common/MangoBackButton';
import EmailVerificationModal from './EmailVerificationModal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import { CommonStyles, Fonts } from '../../utils/CommonStyles';
import {
  getCurrentUser, getUserSettings, getUserSecuritySettings, updateUserSettings,
} from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import Consts from '../../utils/Consts';
import Events from '../../utils/Events';
import UIUtils from '../../utils/UIUtils';
import LocalCurrencyScreen from '../localCurrency/LocalCurrencyScreen';
import ChangePasswordScreen from '../change-password/ChangePasswordScreen';
import MobileNumberModal from '../mobile-number-verification/MobileNumberModal';
import BaseScreen from '../BaseScreen';

export default class SettingScreen extends BaseScreen {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (<View />),
  });

  static TITLE_SWITCH = {
    emailNotification: 'emailNotification',
    swipeReceive: 'swipeReceive',
  };

  constructor(props) {
    super(props);
    this.state = {
      payload: {
        swipeReceive: false,
      },
      walletId: null,
      user: {},
      userSettings: [],
      userSecuritySettings: null,

      refreshing: false,
      isEnableCodePin: false,
      isSupportedTouchId: false,
      isEnableTouchId: false,
    };
  }

  componentWillReceiveProps() {
    this._onRefresh();
  }

  componentDidMount = async () => {
    try {
      const isEnableTouchId = await AsyncStorage.getItem('isEnableTouchId');
      TouchID.isSupported({ unifiedErrors: false })
        .then((biometryType) => {
          console.log('TouchID.isSupported: ', biometryType);
          this.setState({
            isSupportedTouchId: true,
            isEnableTouchId: isEnableTouchId === 'true',
          });
        })
        .catch((error) => {
          console.log('TouchID.isSupported.Error: ', error);
        });

      await this._loadLocalSettings();
      await this._checkStatusPin();
      this._loadData();
    } catch (error) {
      console.log('SettingScreen._error: ', error);
    }
  }

  _checkStatusPin = async () => {
    try {
      const checkCodePin = await AppPreferences.getGeneric();
      const isEnableCodePin = checkCodePin && checkCodePin.password.includes(Consts.PIN);

      this.setState({ isEnableCodePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this._loadData();
    this.setState({ refreshing: false });
  }

  _loadLocalSettings = async () => {
    const userSettings = await AppPreferences.getUserSettings() || [];
    const userSecuritySettings = await AppPreferences.getUserSecuritySettings() || {};

    this.setState({
      userSettings,
      userSecuritySettings,
    });
  }

  _loadData = async () => {
    try {
      await Promise.all([
        // this._loadEthAddress(),
        this._loadUserInfo(),
        this._loadUserSettings(),
        this._loadUserSecuritySettings(),
      ]);
    } catch (error) {
      console.log('SettingScreen._loadData', error);
    }
  }

  _loadEthAddress = async () => {
    try {
      const walletId = await AsyncStorage.getItem('address');
      this.setState({
        walletId,
      });
    } catch (error) {
      console.log('SettingScreen._loadEthAddress: ', error);
    }
  }

  _loadUserInfo = async () => {
    try {
      const response = await getCurrentUser(false);
      let walletId = '';
      switch (response.data.login_type) {
      case Consts.LOGIN_TYPES.EMAIL:
        walletId = response.data.email;
        break;
      case Consts.LOGIN_TYPES.PHONE_NUMBER:
        walletId = response.data.phone_number;
        break;
      case Consts.LOGIN_TYPES.PASSPORT:
        walletId = response.data.passport_number;
        break;
      case Consts.LOGIN_TYPES.FACEBOOK:
        walletId = response.data.facebook_id;
        break;
      default:
        walletId = '';
        break;
      }
      this.setState({
        user: response.data,
        walletId,
      });
    } catch (error) {
      console.log('SettingScreen._loadUserInfo', error);
    }
  }

  _loadUserSettings = async () => {
    try {
      const response = await getUserSettings();
      const settings = response.data;

      this.setState({
        userSettings: settings,
      });
      AppPreferences.saveUserSettings(settings);
    } catch (error) {
      console.log('SettingScreen._loadUserSettings', error);
    }
  }

  _loadUserSecuritySettings = async () => {
    try {
      const response = await getUserSecuritySettings();
      const settings = response.data;
      this.setState({
        userSecuritySettings: settings,
      });
      AppPreferences.saveUserSecuritySettings(settings);
    } catch (error) {
      console.log('SettingScreen._loadUserSecuritySettings', error);
    }
  }

  _getLocalCurrency() {
    for (const setting of this.state.userSettings) {
      if (setting.key === Consts.USER_SETTINGS.CURRENCY) {
        return setting.value;
      }
    }
  }

  _getEmailNotificationSetting() {
    const { userSettings } = this.state;
    for (const setting of userSettings) {
      if (setting.key === Consts.USER_SETTINGS.EMAIL_NOTIFICATION) {
        return (parseInt(setting.value, 10) === 1);
      }
    }

    return true; // default value
  }

  _onChangeSwitch = (title) => {
    const { payload } = this.state;

    payload[`${title}`] = !payload[`${title}`];
    this.setState({ payload });
  }

  _onChangeSwitchEmailNotification = async (value) => {
    const emailNotification = value ? 1 : 0;
    this._updateLocalUserSetting(Consts.USER_SETTINGS.EMAIL_NOTIFICATION, emailNotification);

    const params = {
      email_notification: emailNotification,
    };

    try {
      const response = await updateUserSettings(params);
      const { message } = response;

      UIUtils.showToastMessage(message, 'success');
      this._loadUserSettings();
    } catch (error) {
      UIUtils.showToastMessage(error.message, 'error');
      console.log('LocalCurrencyScreen._onClickConfirm', error);
    }
  }

  _showLocalCurrency = () => {
    this._localCurrency.show(this._getLocalCurrency());
  }

  _showchangePassword = () => {
    const { userSecuritySettings } = this.state;
    if (userSecuritySettings && userSecuritySettings.otp_verified) {
      this._changePassword.setModalVisible(true, true);
      return;
    }
    this._changePassword.setModalVisible(true, false);
  }

  _showSettingGoogleOtp = () => {
    const { userSecuritySettings } = this.state;
    const { navigation } = this.props;
    return userSecuritySettings && userSecuritySettings.otp_verified ? navigation.navigate('GoogleAuthScreen', true) : navigation.navigate('DownloadAndInstallScreen');
  }

  _onLocalCurrencyUpdated = (currency) => {
    this._updateLocalUserSetting(Consts.USER_SETTINGS.CURRENCY, currency);
    this.notify(Events.USER_SETTINGS_UPDATED);
    this._loadUserSettings();
  }

  _updateLocalUserSetting(key, value) {
    const { userSettings } = this.state;

    for (const setting of userSettings) {
      if (setting.key === key) {
        setting.value = value;
      }
    }
    this.setState({
      userSettings,
    });
  }

  _onMobileNumber = () => {
    const { userSecuritySettings } = this.state;
    const {
      email_verified, bank_account_verified, identity_verified, otp_verified,
    } = userSecuritySettings;

    this.setState({
      userSecuritySettings: {
        email_verified,
        phone_verified: 1,
        bank_account_verified,
        identity_verified,
        otp_verified,
      },
    });
    this._loadUserInfo();
  }

  _isEmailVerified = () => {
    const { userSecuritySettings } = this.state;
    return !userSecuritySettings || userSecuritySettings.email_verified;
  }

  _isPassportVerify = () => {
    const { userSecuritySettings } = this.state;
    return !userSecuritySettings || userSecuritySettings.passport_verified;
  }

  _isMobileVerify = () => {
    const { userSecuritySettings } = this.state;
    return !userSecuritySettings || userSecuritySettings.phone_verified;
  }

  _isUserDataLoaded = () => {
    const { user } = this.state;
    return !!user;
  }

  _onPressVerifyEmail = () => {
    const { user } = this.state;
    if (!this._isEmailVerified() && this._isUserDataLoaded()) {
      this._emailModal.show(user.email, user.login_type, () => {
        this.user = undefined;
        this._loadUserInfo();
      });
    }
  }

  _onPressMobileVerify = () => {
    const { user } = this.state;
    if (!this._isMobileVerify() && (!!user)) {
      this._MobleNumberModal.setModalVisibleUpdate(true);
    }
  }

  _onPressVerifyPassport = () => {
    const { user } = this.state;
    const params = {
      passportNumber: user.passport_number,
      loginType: user.login_type,
    };

    if (!this._isPassportVerify() && (!!user)) {
      this.navigate('PassportNumberVerifyScreen', params);
    }
  }

  _navigateToBackupPassphrase = (navigation) => {
    navigation.replace('BackupPassphraseScreen');
  }

  _onPressBackupPassphrase = () => {
    const { isEnableCodePin } = this.state;

    if (!isEnableCodePin) {
      this.props.navigation.navigate('BackupPassphraseScreen');
      return;
    }
    this.props.navigation.navigate('LoginUsePinScreen', { navigateScreen: this._navigateToBackupPassphrase });
  }

  _handleChangeUseTouchId = async () => {
    try {
      const { isEnableTouchId } = this.state;
      const textIsEnable = isEnableTouchId ? 'false' : 'true';

      this.setState({
        isEnableTouchId: !isEnableTouchId,
      });
      await AsyncStorage.setItem('isEnableTouchId', textIsEnable);
    } catch (error) {
      console.log('SettingScreen._handleChangeUseTouchId.Error: ', error);
    }
  }

  _renderProfile = () => {
    const { walletId, user, userSecuritySettings } = this.state;
    const emailVerified = userSecuritySettings && userSecuritySettings.email_verified;
    const passportVerify = userSecuritySettings && userSecuritySettings.passport_verified;

    return (
      <View>
        <Text style={styles.titleProfile}>{I18n.t('setting.profile')}</Text>
        <View style={styles.tableProfile}>

          <View style={styles.borderWalletId}>
            <Text style={styles.textWalletID}>{I18n.t('setting.walletId')}</Text>
            <Text
              style={styles.textWalletAddress}
              numberOfLines={1}
            >
              {walletId}
            </Text>
          </View>

          <View style={styles.groupEmail}>
            <TouchableWithoutFeedback onPress={this._onPressVerifyEmail}>
              <View style={styles.borderEmailMobileNumber}>
                <Text style={styles.titleSetting}>{I18n.t('setting.email')}</Text>
                <View style={styles.activiRightGroup}>
                  {emailVerified ? (
                    <Text style={styles.textVerified}>
                      {user.email}
                    </Text>
                  ) : (
                    <Text style={styles.textUnVerified}>
                      {I18n.t('setting.unverified')}
                    </Text>
                  )}

                  {!emailVerified && (
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback disabled onPress={this._onPressMobileVerify}>
              <View style={styles.borderDisableItem}>
                <Text style={styles.titleSetting}>{I18n.t('setting.mobileNumber')}</Text>
                <View style={styles.activiRightGroup}>
                  {userSecuritySettings && (userSecuritySettings.phone_verified ? (
                    <Text style={styles.textVerified}>
                      {user.phone_number}
                    </Text>
                  ) : (
                    <Text style={styles.textUnVerified}>
                      {I18n.t('setting.unverified')}
                    </Text>
                  ))}

                  {!(userSecuritySettings && userSecuritySettings.phone_verified) && (
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this._onPressVerifyPassport}>
              <View style={styles.borderEmailMobileNumber}>
                <Text style={styles.titleSetting}>{I18n.t('setting.passportNumber')}</Text>
                <View style={styles.activiRightGroup}>
                  {(passportVerify) ? (
                    <Text style={styles.textVerified}>
                      {user.passport_number}
                    </Text>
                  ) : (
                    <Text style={styles.textUnVerified}>
                      {I18n.t('setting.unverified')}
                    </Text>
                  )}
                  {!(passportVerify) && (
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>

          </View>

          <View style={styles.borderLogintoWeb}>
            <Text style={styles.titleSetting}>{I18n.t('setting.logIntoWebWallet')}</Text>
            <View style={styles.activiRightGroup}>
              <MaterialCommunityIcons
                style={styles.iconChevronRight}
                name="chevron-right"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderReference = () => {
    const emailNotification = this._getEmailNotificationSetting();

    const currency = this._getLocalCurrency();
    const currencyLabel = currency ? I18n.t(`currency.${currency}.settingLabel`) : '';

    return (
      <View>
        <Text style={styles.textPerferences}>{I18n.t('setting.perferences')}</Text>
        <View style={styles.tablePerferences}>
          <View style={styles.borderEmailNotification}>
            <Text style={styles.titleSetting}>{I18n.t('setting.emailNotification')}</Text>
            <Switch
              containerStyle={styles.switchBorder}
              backgroundActive="#16ec7e"
              backgroundInactive="#fff"
              value={emailNotification}
              innerCircleStyle={styles.innerCircle}
              changeValueImmediately
              onValueChange={value => this._onChangeSwitchEmailNotification(value)}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => this._showLocalCurrency()}>
            <View style={styles.borderEmailNotification}>
              <Text style={styles.titleSetting}>{I18n.t('setting.localCurrency')}</Text>
              <View style={styles.activiRightGroup}>
                <Text style={styles.textDollar}>{currencyLabel}</Text>
                <MaterialCommunityIcons
                  style={styles.iconChevronRight}
                  name="chevron-right"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  _renderSecurity() {
    const {
      isSupportedTouchId, isEnableTouchId, userSecuritySettings, user,
    } = this.state;
    const { navigation } = this.props;
    const checkTypeLogin = (user.login_type === Consts.LOGIN_TYPES.FACEBOOK);

    return (
      <View>
        <Text style={styles.textSecurity}>{I18n.t('setting.security')}</Text>
        <View style={styles.tableSecurity}>
          {checkTypeLogin ? null
            : (
              <TouchableWithoutFeedback onPress={() => this._showSettingGoogleOtp()}>
                <View style={styles.borderStepVerification}>
                  <Text style={styles.titleSetting}>{I18n.t('setting.verification')}</Text>
                  <View style={styles.activiRightGroup}>
                    <Text style={[userSecuritySettings && userSecuritySettings.otp_verified ? styles.textVerified : styles.textUnVerified]}>
                      {userSecuritySettings && userSecuritySettings.otp_verified ? I18n.t('setting.enabled') : I18n.t('setting.disabled')}
                    </Text>
                    <MaterialCommunityIcons
                      style={styles.iconChevronRight}
                      name="chevron-right"
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }
          <View style={styles.groupChangePassword}>
            {checkTypeLogin ? (null)
              : (
                <TouchableWithoutFeedback onPress={() => this._showchangePassword()}>
                  <View style={styles.borderChangePassword}>
                    <Text style={styles.titleSetting}>{I18n.t('setting.changePassword')}</Text>
                    <View style={styles.activiRightGroup}>
                      <MaterialCommunityIcons
                        style={styles.iconChevronRight}
                        name="chevron-right"
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }

            <TouchableWithoutFeedback onPress={this._onPressBackupPassphrase}>
              <View style={styles.borderChangePassword}>
                <Text style={styles.titleSetting}>{I18n.t('setting.recoveryPhrase')}</Text>
                <View style={styles.activiRightGroup}>
                  <MaterialCommunityIcons
                    style={styles.iconChevronRight}
                    name="chevron-right"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback onPress={() => navigation.navigate('ChangePinScreen')}>
            <View style={styles.bordeChangePin}>
              <Text style={styles.titleSetting}>{I18n.t('setting.changePin')}</Text>
              <View style={styles.activiRightGroup}>
                <MaterialCommunityIcons
                  style={styles.iconChevronRight}
                  name="chevron-right"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.groupUseFaceID}>

            {isSupportedTouchId ? (
              <View style={styles.borderUseFaceID}>
                <Text style={styles.titleSetting}>{I18n.t('setting.useFaceIdAsPin')}</Text>
                <View style={styles.activiRightGroup}>
                  <Switch
                    containerStyle={styles.switchBorder}
                    backgroundActive="#16ec7e"
                    backgroundInactive="#fff"
                    value={isEnableTouchId}
                    innerCircleStyle={styles.innerCircle}
                    changeValueImmediately
                    onValueChange={this._handleChangeUseTouchId}
                  />
                </View>
              </View>
            ) : null}

            {/* <View style={styles.borderUseFaceID}>
              <Text style={styles.titleSetting}>{I18n.t('setting.swipeToReceive')}</Text>
              <View style={styles.activiRightGroup}>
                <Switch
                  containerStyle={styles.switchBorder}
                  backgroundActive="#16ec7e"
                  backgroundInactive="#fff"
                  innerCircleStyle={styles.innerCircle}
                  value={payload.swipeReceive}
                  changeValueImmediately
                  onValueChange={() => this._onChangeSwitch(SettingScreen.TITLE_SWITCH.swipeReceive)}
                />
              </View>
            </View> */}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { refreshing } = this.state;

    return (
      <View>
        <EmailVerificationModal ref={ref => this._emailModal = ref} />
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          )}
        >
          <View style={styles.container}>
            {this._renderProfile()}
            {this._renderReference()}
            {this._renderSecurity()}
          </View>
        </ScrollView>
        <LocalCurrencyScreen
          ref={ref => this._localCurrency = ref}
          onLocalCurrencyUpdated={this._onLocalCurrencyUpdated}
        />
        <ChangePasswordScreen
          ref={ref => this._changePassword = ref}
        />
        <MobileNumberModal
          ref={ref => this._MobleNumberModal = ref}
          onMobileNumber={this._onMobileNumber}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  titleProfile: {
    fontSize: '13@ms',
    marginLeft: '30@s',
    marginTop: '22@s',
    color: '#3459bf',
    ...Fonts.Ubuntu_Regular,
  },
  tableProfile: {
    flexDirection: 'column',
    borderRadius: '13@s',
    borderColor: '#e0e4eb',
    backgroundColor: '#FFF',
    borderWidth: '1@s',
    marginLeft: '16@s',
    marginRight: '16@s',
    marginTop: '10@s',
  },
  borderWalletId: {
    borderBottomWidth: '1@s',
    height: '59@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
    justifyContent: 'center',
    borderColor: '#ced4dd',
  },
  textwalletID: {
    color: '#9298aa',
    fontSize: '13@ms',
    ...Fonts.Ubuntu_Regular,
  },
  textWalletAddress: {
    fontSize: '13@ms',
    color: '#293350',
    marginTop: '7@s',
    ...Fonts.Ubuntu_Regular,
  },
  groupEmail: {
    borderBottomWidth: '1@s',
    flexDirection: 'column',
    borderColor: '#ced4dd',
  },
  borderEmailMobileNumber: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '36@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
  },
  borderDisableItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '36@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
    backgroundColor: '#e6ebf2',
  },
  borderLogintoWeb: {
    paddingLeft: '14@s',
    paddingRight: '12@s',
    flexDirection: 'row',
    alignItems: 'center',
    height: '47@s',
    justifyContent: 'space-between',
    backgroundColor: '#e6ebf2',
    borderBottomLeftRadius: '12@s',
    borderBottomRightRadius: '12@s',
  },
  textPerferences: {
    fontSize: '13@ms',
    marginLeft: '30@s',
    marginTop: '34@s',
    color: '#3459bf',
    ...Fonts.Ubuntu_Regular,
  },
  tablePerferences: {
    borderRadius: '13@s',
    borderColor: '#e0e4eb',
    backgroundColor: '#FFF',
    borderWidth: '1@s',
    marginLeft: '16@s',
    marginRight: '16@s',
    marginTop: '10@s',
    flexDirection: 'column',
  },
  borderEmailNotification: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '43@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
  },
  textSecurity: {
    fontSize: '13@ms',
    marginLeft: '30@s',
    marginTop: '34@s',
    color: '#3459bf',
    ...Fonts.Ubuntu_Regular,
  },
  tableSecurity: {
    borderRadius: '13@s',
    borderColor: '#e0e4eb',
    backgroundColor: '#FFF',
    borderWidth: '1@s',
    marginLeft: '16@s',
    marginRight: '16@s',
    marginTop: '10@s',
    marginBottom: '24@s',
    flexDirection: 'column',
  },
  borderStepVerification: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '41@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
    borderBottomWidth: '1@s',
    borderColor: '#ced4dd',
  },
  groupChangePassword: {
    borderBottomWidth: '1@s',
    flexDirection: 'column',
    borderColor: '#ced4dd',
  },
  borderChangePassword: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '41@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
  },
  bordeChangePin: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '45@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
    borderColor: '#ced4dd',
  },
  groupUseFaceID: {
    flexDirection: 'column',
  },
  borderUseFaceID: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '49@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
    borderTopWidth: '1@s',
    borderColor: '#ced4dd',
  },
  activiRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textVerified: {
    color: '#85ec81',
    fontSize: '14@ms',
    marginRight: '10@s',
    ...Fonts.Ubuntu_Regular,
  },
  textUnVerified: {
    color: '#e63d2e',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Regular,
  },
  iconChevronRight: {
    fontSize: '25@ms',
  },
  switchBorder: {
    borderWidth: '1@s',
    borderColor: '#e0e4eb',
    marginRight: '7@s',
    width: '51@s',
    height: '31@s',
  },
  innerCircle: {
    borderColor: '#e0e4eb',
    borderWidth: '1@s',
  },
  titleSetting: {
    fontSize: '14@ms',
    color: '#26304d',
    ...Fonts.Ubuntu_Regular,
  },
  textDollar: {
    fontSize: '14@ms',
    color: '#8d93a6',
    ...Fonts.Ubuntu_Regular,
  },
});
