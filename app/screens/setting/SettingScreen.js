import React, { Component } from 'react';
import {
  View, Text, ScrollView, TouchableWithoutFeedback, AsyncStorage,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-switch';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import { CommonStyles } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { getUserSettings } from '../../api/user/UserRequest';
import AppConfig from '../../utils/AppConfig';

export default class SettingScreen extends Component {
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
        emailVerified: AppConfig.USER_SETTING.email_verified,
        bankAccountVerified: AppConfig.USER_SETTING.bank_account_verified,
        identityVerified: AppConfig.USER_SETTING.identity_verified,
        otpVerified: AppConfig.USER_SETTING.otp_verified,
        phoneVerified: AppConfig.USER_SETTING.phone_verified,
      },
      walletId: null,
    };
  }

  componentDidMount = async () => {
    try {
      const getUserSetting = await getUserSettings();
      console.log('-------------------', getUserSetting);
    } catch (error) {
      console.log('<<<<<<<error<<<<', error.message);
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

  _onChangeSwitch = (title) => {
    const { payload } = this.state;

    payload[`${title}`] = !payload[`${title}`];
    this.setState({ payload });
  }

  _onPressBackupPassphrase = () => {
    this.props.navigation.navigate("BackupPassphraseScreen");
  }

  _renderProfile = () => {
    const { walletId, payload } = this.state;

    return (
      <View>
        <Text style={styles.titleTable}>{I18n.t('setting.profile')}</Text>
        <View style={styles.borderTable}>

          <View style={styles.borderWalletId}>
            <Text style={styles.walletID}>{I18n.t('setting.walletId')}</Text>
            <Text style={styles.walletAddress}>{walletId}</Text>
          </View>

          <View style={styles.borderElementBottom}>
            <Text style={styles.titleSetting}>{I18n.t('setting.email')}</Text>
            <View style={styles.activiRightGroup}>
              {payload.emailVerified ? (
                <Text style={styles.textVerified}>
                  {I18n.t('setting.verified')}
                </Text>
              ) : (
                <Text style={styles.textUnVerified}>
                  {I18n.t('setting.unverified')}
                </Text>
              )}

              <MaterialCommunityIcons
                style={styles.iconChevronRight}
                name="chevron-right"
              />
            </View>
          </View>

          <View style={[styles.borderElement, { paddingTop: scale(2) }]}>
            <Text style={styles.titleSetting}>{I18n.t('setting.mobileNumber')}</Text>
            <View style={styles.activiRightGroup}>
              {payload.phoneVerified ? (
                <Text style={styles.textVerified}>
                  {I18n.t('setting.verified')}
                </Text>
              ) : (
                <Text style={styles.textUnVerified}>
                  {I18n.t('setting.unverified')}
                </Text>
              )}

              <MaterialCommunityIcons
                style={styles.iconChevronRight}
                name="chevron-right"
              />
            </View>
          </View>

          <View style={styles.borderElementBottom}>
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
    const { payload } = this.state;

    return (
      <View style={styles.textPerferences}>
        <Text style={styles.titleTable}>{I18n.t('setting.perferences')}</Text>
        <View style={styles.borderTable}>
          <View style={styles.borderElementBottom}>
            <Text style={styles.titleSetting}>{I18n.t('setting.emailNotification')}</Text>
            <Switch
              containerStyle={styles.switchBorder}
              backgroundActive="#16ec7e"
              backgroundInactive="#fff"
              value={payload.emailNotification}
              innerCircleStyle={styles.innerCircle}
              changeValueImmediately
              onValueChange={() => this._onChangeSwitch(SettingScreen.TITLE_SWITCH.emailNotification)}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('LocalCurrencyScreen')}>
            <View style={styles.borderElementBottom}>
              <Text style={styles.titleSetting}>{I18n.t('setting.localCurrency')}</Text>
              <View style={styles.activiRightGroup}>
                <Text>U.S Dollar ($)</Text>
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
      <View style={styles.textPerferences}>
        <Text style={styles.titleTable}>{I18n.t('setting.security')}</Text>
        <View style={styles.borderTable}>
          <View style={styles.borderElement}>
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
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}>
            <View style={styles.borderElementBottom}>
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
            <View style={styles.borderElement}>
              <Text style={styles.titleSetting}>{I18n.t('setting.recoveryPhrase')}</Text>
              <View style={styles.activiRightGroup}>
                <MaterialCommunityIcons
                  style={styles.iconChevronRight}
                  name="chevron-right"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          
          <TouchableWithoutFeedback onPress={() => navigation.navigate('AddPinScreen')}>
            <View style={styles.borderElement}>
              <Text style={styles.titleSetting}>{I18n.t('setting.changePin')}</Text>
              <View style={styles.activiRightGroup}>
                <MaterialCommunityIcons
                  style={styles.iconChevronRight}
                  name="chevron-right"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.borderElementBottom}>
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
          <View style={styles.borderElementBottom}>
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
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            {this._renderProfile()}
            {this._renderReference()}
            {this._renderSecurity()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '14@s',
    backgroundColor: '#f5f7fa',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },
  titleTable: {
    fontSize: '12@s',
    marginLeft: '15@s',
    marginBottom: '5@s',
    marginTop: '10@s',
    color: '#3459bf',
  },
  borderTable: {
    borderRadius: '13@s',
    borderColor: '#e0e4eb',
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderWidth: '1@s',
  },
  borderWalletId: {
    borderBottomWidth: '1@s',
    padding: '10@s',
    borderColor: '#ced4dd',
  },
  borderElement: {
    borderBottomWidth: '1@s',
    padding: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ced4dd',
  },
  borderElementBottom: {
    padding: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activiRightGroup: {
    flexDirection: 'row',
  },
  textVerified: {
    marginRight: '5@s',
    color: '#85ec81',
  },
  textUnVerified: {
    marginRight: '5@s',
    color: '#e63d2e',
  },
  iconChevronRight: {
    fontSize: '25@s',
  },
  switchBorder: {
    borderWidth: '1@s',
    borderColor: '#e0e4eb',
  },
  textPerferences: {
    marginTop: '15@s',
  },
  innerCircle: {
    borderColor: '#e0e4eb',
    borderWidth: '1@s',
  },
  titleSetting: {
    fontSize: '13@s',
    color: '#26304d',
  },
  walletID: {
    color: '#9298aa',
    fontSize: '13@s',
  },
  walletAddress: {
    fontSize: '12@s',
    color: '#293350',
  },
});
