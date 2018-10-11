import React, { Component } from 'react';
import {
  View, Text, ScrollView, TouchableWithoutFeedback, AsyncStorage, RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-switch';
import MangoBackButton from '../common/MangoBackButton';
import EmailVerificationModal from './EmailVerificationModal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import { CommonStyles, Fonts } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { getCurrentUser, getUserSettings, getUserSecuritySettings, updateUserSettings } from '../../api/user/UserRequest';
import AppConfig from '../../utils/AppConfig';
import AppPreferences from '../../utils/AppPreferences';
import Consts from '../../utils/Consts';
import Events from '../../utils/Events';
import UIUtils from '../../utils/UIUtils';
import LocalCurrencyScreen from '../localCurrency/LocalCurrencyScreen';
import ChangePasswordScreen from '../change-password/ChangePasswordScreen';
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
    faceId: 'faceId',
    swipeReceive: 'swipeReceive',
  };

  constructor(props) {
    super(props);
    this.state = {
      payload: {
        emailNotification: false,
        faceId: false,
        swipeReceive: false,
      },
      userSetting: {
        emailNotification: false,
      },
      walletId: null,
      user: {},
      userSettings: [],
      userSecuritySettings: null,

      refreshing: false,
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this._loadData();
    this.setState({ refreshing: false });
  }

  componentDidMount = async () => {
    await this._loadLocalSettings();
    this._loadData();
  }

  _loadLocalSettings = async () => {
    let userSettings = await AppPreferences.getUserSettings() || [];
    let userSecuritySettings = await AppPreferences.getUserSecuritySettings() || {};

    this.setState({
      userSettings,
      userSecuritySettings
    });
  }

  _loadData = async () => {
    try {
      await Promise.all([
        this._loadUserInfo(),
        this._loadUserSettings(),
        this._loadUserSecuritySettings()
      ]);
    } catch (error) {
      console.log('SettingScreen._loadData', error);
    }

    try {
      const walletId = await AsyncStorage.getItem('address');
      this.setState({
        walletId,
      });
    } catch (error) {
      console.log('SettingScreen._error: ', error);
    }
  }

  _loadUserInfo = async () => {
    try {
      let response = await getCurrentUser();
      this.setState({
        user: response.data
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
        userSettings: settings
      });
      for (var setting of settings) {
        if (setting.key === Consts.USER_SETTINGS.EMAIL_NOTIFICATION) {
          const emailNotification = (parseInt(setting.value) === 1) ? true : false;

          this.setState({
            userSetting: {
              emailNotification,
            }
          })
        }
      }
      AppPreferences.saveUserSettings(settings);
    } catch (error) {
      console.log('SettingScreen._loadUserSettings', error);
    }
  }

  _loadUserSecuritySettings = async () => {
    try {
      let response = await getUserSecuritySettings();
      const settings = response.data;
      this.setState({
        userSecuritySettings: settings
      });
      AppPreferences.saveUserSecuritySettings(settings);
    } catch (error) {
      console.log('SettingScreen._loadUserSecuritySettings', error);
    }
  }

  _getLocalCurrency() {
    for (var setting of this.state.userSettings) {
      if (setting.key === Consts.USER_SETTINGS.CURRENCY) {
        return setting.value;
      }
    }
  }

  _onChangeSwitch = (title) => {
    const { payload } = this.state;

    payload[`${title}`] = !payload[`${title}`];
    this.setState({ payload });
  }

  _onChangeSwitchEmailNotification = async () => {
    const { userSetting } = this.state;
    const email_notification = (!userSetting.emailNotification) ? 1 : 0;
    const params = {
      email_notification,
    };

    try {
      const response = await updateUserSettings(params);
      const message = response.message;
      this.setState({
        userSetting: {
          emailNotification: !userSetting.emailNotification,
        }
      })
      UIUtils.showToastMessage(message);
    } catch (error) {
      UIUtils.showToastMessage(error.message);
      console.log('LocalCurrencyScreen._onClickConfirm', error);
    }
  }

  _showLocalCurrency = () => {
    this._localCurrency.show(this._getLocalCurrency());
  }

  _showchangePassword = () => {
    this._changePassword.setModalVisible(true);
  }

  _onLocalCurrencyUpdated = (currency) => {
    let { userSettings } = this.state;
    for (let setting of userSettings) {
      if (setting.key === Consts.USER_SETTINGS.CURRENCY) {
        setting.value = currency;
      }
    }
    this.setState({
      userSettings
    });

    this.notify(Events.USER_SETTINGS_UPDATED);
    this._loadUserSettings();
  }
  _onPressBackupPassphrase = () => {
    this.props.navigation.navigate("BackupPassphraseScreen");
  }

  _renderProfile = () => {
    const { walletId, userSecuritySettings, user } = this.state;

    return (
      <View>
        <Text style={styles.titleProfile}>{I18n.t('setting.profile')}</Text>
        <View style={styles.tableProfile}>

          <View style={styles.borderWalletId}>
            <Text style={styles.textWalletID}>{I18n.t('setting.walletId')}</Text>
            <Text
              style={styles.textWalletAddress}
              numberOfLines={1}>{walletId}</Text>
          </View>

          <View style={styles.groupEmail}>
            <TouchableWithoutFeedback onPress={() => this._emailModal.show(user.email)}>
              <View style={styles.borderEmailMobileNumber}>
                <Text style={styles.titleSetting}>{I18n.t('setting.email')}</Text>
                <View style={styles.activiRightGroup}>
                  {userSecuritySettings && (userSecuritySettings.email_verified ? (
                    <Text style={styles.textVerified}>
                      {I18n.t('setting.verified')}
                    </Text>
                  ) : (
                      <Text style={styles.textUnVerified}>
                        {I18n.t('setting.unverified')}
                      </Text>
                    ))}

                  <MaterialCommunityIcons
                    style={styles.iconChevronRight}
                    name="chevron-right"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.borderEmailMobileNumber}>
              <Text style={styles.titleSetting}>{I18n.t('setting.mobileNumber')}</Text>
              <View style={styles.activiRightGroup}>
                {userSecuritySettings && (userSecuritySettings.phone_verified ? (
                  <Text style={styles.textVerified}>
                    {I18n.t('setting.verified')}
                  </Text>
                ) : (
                    <Text style={styles.textUnVerified}>
                      {I18n.t('setting.unverified')}
                    </Text>
                  ))}

                <MaterialCommunityIcons
                  style={styles.iconChevronRight}
                  name="chevron-right"
                />
              </View>
            </View>
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

  _renderReference() {
    const { payload, userSetting } = this.state;

    const currency = this._getLocalCurrency();
    const currencyLabel = currency ? I18n.t(`currency.${currency}.settingLabel`) : '';

    return (
      <View >
        <Text style={styles.textPerferences}>{I18n.t('setting.perferences')}</Text>
        <View style={styles.tablePerferences}>
          <View style={styles.borderEmailNotification}>
            <Text style={styles.titleSetting}>{I18n.t('setting.emailNotification')}</Text>
            <Switch
              containerStyle={styles.switchBorder}
              backgroundActive="#16ec7e"
              backgroundInactive="#fff"
              value={userSetting.emailNotification}
              innerCircleStyle={styles.innerCircle}
              changeValueImmediately
              onValueChange={(value) => this._onChangeSwitchEmailNotification(value)}
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
    const { payload } = this.state;
    const { navigation } = this.props;

    return (
      <View >
        <Text style={styles.textSecurity}>{I18n.t('setting.security')}</Text>
        <View style={styles.tableSecurity}>
          <View style={styles.borderStepVerification}>
            <Text style={styles.titleSetting}>{I18n.t('setting.verification')}</Text>
            <View style={styles.activiRightGroup}>
              <Text style={styles.textUnVerified}>
                {I18n.t('setting.disabled')}
              </Text>
              <MaterialCommunityIcons
                style={styles.iconChevronRight}
                name="chevron-right"
              />
            </View>
          </View>
          <View style={styles.groupChangePassword}>
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

            <TouchableWithoutFeedback onPress={this._onPressBackupPassphrase}>
              <View style={styles.borderChangePassword}>
                <Text style={styles.titleSetting}>{I18n.t('setting.recoveryPhrase')}</Text>
                <View style={styles.activiRightGroup}>
                  <Text style={styles.textUnVerified}>
                  {I18n.t('setting.unconfirmed')}
                  </Text>
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
            <View style={styles.borderUseFaceID}>
              <Text style={styles.titleSetting}>{I18n.t('setting.useFaceIdAsPin')}</Text>
              <View style={styles.activiRightGroup}>
                <Switch
                  containerStyle={styles.switchBorder}
                  backgroundActive="#16ec7e"
                  backgroundInactive="#fff"
                  value={payload.faceId}
                  innerCircleStyle={styles.innerCircle}
                  changeValueImmediately
                  onValueChange={() => this._onChangeSwitch(SettingScreen.TITLE_SWITCH.faceId)}
                />
              </View>
            </View>
            <View style={styles.borderUseFaceID}>
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
            </View>
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
              onRefresh={() => this._onRefresh()}
            />
          )}
        >
          <View style={styles.container}>
            {this._renderProfile()}
            {this._renderReference()}
            {this._renderSecurity()}
          </View>
        </ScrollView>
        <LocalCurrencyScreen ref={ref => this._localCurrency = ref} onLocalCurrencyUpdated={this._onLocalCurrencyUpdated} />
        <ChangePasswordScreen ref={ref => this._changePassword = ref} />
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
    borderRadius: '13@s',
    borderColor: '#e0e4eb',
    backgroundColor: '#FFF',
    height: '181@s',
    borderWidth: '1@s',
    marginLeft: '16@s',
    marginRight: '16@s',
    marginTop: '10@s',
    flexDirection: 'column',
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
    fontSize: '14@ms',
    color: '#293350',
    marginTop: '7@s',
    ...Fonts.Ubuntu_Regular,
  },
  groupEmail: {
    height: '73@s',
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
  borderLogintoWeb: {
    paddingLeft: '14@s',
    paddingRight: '12@s',
    flexDirection: 'row',
    alignItems: 'center',
    height: '47@s',
    justifyContent: 'space-between',
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
    height: '88@s',
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
    height: '269@s',
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
    height: '82@s',
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
    borderBottomWidth: '1@s',
    borderColor: '#ced4dd',
  },
  groupUseFaceID: {
    height: '98@s',
    flexDirection: 'column',
  },
  borderUseFaceID: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '49@s',
    paddingLeft: '14@s',
    paddingRight: '12@s',
  },
  activiRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textVerified: {
    marginRight: '5@s',
    color: '#85ec81',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Regular,
  },
  textUnVerified: {
    marginRight: '5@s',
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
  }
});
