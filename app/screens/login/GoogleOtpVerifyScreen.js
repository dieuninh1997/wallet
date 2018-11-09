import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import {
  CommonStyles, Fonts, CommonSize, CommonColors,
} from '../../utils/CommonStyles';
import MangoBackButton from '../common/MangoBackButton';
import MangoGradientButton from '../common/MangoGradientButton';
import UIUtils from '../../utils/UIUtils';
import { login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';

export default class GoogleOtpVerifyScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('googleOtp2faVerify.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: styles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      isGoogleOtp: true,
      authenticatorCode: '',
      email: null,
      password: null,
      loginType: null,
    };
  }

  componentDidMount = () => {
    try {
      const { params } = this.props.navigation.state;
      this.setState({
        email: params.email,
        password: params.password,
        loginType: params.loginType,
      });
    } catch (error) {
      console.log('GoogleOtpVerifyScreen._componentDidMount._error: ', error);
    }
  }

  _navigateTab = (isGoogleOtpTab) => {
    const { isGoogleOtp } = this.state;
    if (isGoogleOtp && isGoogleOtpTab) {
      return;
    }
    if (!isGoogleOtp && !isGoogleOtpTab) {
      return;
    }
    this.setState({
      isGoogleOtp: !isGoogleOtp,
      authenticatorCode: '',
    });
  }

  _handleSubmit = async () => {
    const {
      email, password, authenticatorCode, loginType,
    } = this.state;
    const { navigation } = this.props;

    if (!this._validateClient()) {
      return;
    }

    try {
      const responseUser = await login(email, password, authenticatorCode, loginType);
      AppPreferences.saveToKeychain({
        access_token: responseUser.access_token,
      });
      // window.GlobalSocket.connect();
      Keyboard.dismiss();
      const loginInfo = {
        email,
        password,
        loginType,
      };

      navigation.navigate('RestoreWalletScreen', { loginInfo });
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]][0], 'error');
      } else {
        UIUtils.showToastMessage(error.message, 'error');
      }
    }
  }

  _handleSendSms = () => {
    console.log('handleSendSms =============>');
  }

  _onTextChanged = (code) => {
    this.setState({ authenticatorCode: code });
  }

  _validateClient = () => {
    const { isGoogleOtp, authenticatorCode } = this.state;
    if (!authenticatorCode) {
      UIUtils.showToastMessage(isGoogleOtp ? I18n.t('setting2fa.googleOtpCodeRequired') : I18n.t('setting2fa.smsCodeRequired'), 'error');
      return false;
    }

    if (!UIUtils.validateNumber(authenticatorCode)) {
      UIUtils.showToastMessage(isGoogleOtp ? I18n.t('setting2fa.googleOtpCodeRequiredNumber') : I18n.t('setting2fa.smsCodeRequiredNumber'), 'error');
      return false;
    }

    return true;
  }

  _generateBtn = () => {
    const { isGoogleOtp } = this.state;
    if (isGoogleOtp) {
      return (
        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={I18n.t('genneralText.submit')}
            btnStyle={styles.btnSubmit}
            onPress={() => this._handleSubmit()}
          />
        </View>
      );
    }

    return (
      <View style={styles.btnBlock}>
        <MangoGradientButton
          btnText={I18n.t('setting2fa.sendSms')}
          btnStyle={styles.btnSms}
          colorOptions={['#ffffff', '#ffffff', '#ffffff']}
          onPress={() => this._handleSendSms()}
        />
        <MangoGradientButton
          btnText={I18n.t('genneralText.submit')}
          btnStyle={styles.btnSubmit}
          onPress={() => this._handleSubmit()}
        />
      </View>
    );
  }

  render() {
    const { isGoogleOtp, authenticatorCode } = this.state;

    return (
      <View style={styles.googleOtpVerifyScreen}>
        <View style={styles.navigatorBlock}>
          <TouchableOpacity onPress={() => this._navigateTab(true)}>
            <View style={styles.googleAuthen}>
              <Text style={[styles.textnavigator, isGoogleOtp ? styles.navigatorBorder : null]}>{I18n.t('setting2fa.googleAuthenticator')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._navigateTab(false)}>
            <View style={styles.smsAuthen}>
              <Text style={[styles.textnavigator, styles.textRight, !isGoogleOtp ? styles.navigatorBorder : null]}>{I18n.t('googleOtp2faVerify.smsAuthenticator')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            keyboardType="numeric"
            editable
            maxLength={6}
            onChangeText={text => this._onTextChanged(text)}
            value={authenticatorCode}
            style={styles.inputText}
            placeholder={isGoogleOtp ? I18n.t('setting2fa.googleAuthCode') : I18n.t('setting2fa.smsAuthCode')}
          />
        </View>

        {this._generateBtn()}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  header: {
    backgroundColor: CommonColors.headerBarBgColor,
    height: CommonSize.headerHeight,
    elevation: 0,
    borderBottomWidth: scale(1),
    borderBottomColor: CommonColors.headerBarBgColor,
  },
  googleOtpVerifyScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
  navigatorBlock: {
    width: '100%',
    height: '45.2@s',
    flexDirection: 'row',
    paddingTop: '14@s',
    borderBottomWidth: 1,
    borderColor: 'rgb(209, 209, 219)',
    backgroundColor: CommonColors.headerBarBgColor,
  },
  googleAuthen: {
    width: '161@s',
    marginLeft: '30@s',
    marginRight: '13@s',
  },
  smsAuthen: {
    width: '161@s',
  },
  textnavigator: {
    paddingBottom: '6.2@s',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
    borderBottomWidth: 5,
    borderColor: 'transparent',
  },
  navigatorBorder: {
    borderColor: 'rgb(255, 213, 0)',
  },
  textRight: {
    textAlign: 'center',
  },
  inputBlock: {
    width: '319@s',
    height: '79@s',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '39.5@s',
    borderWidth: 1,
    borderColor: 'rgb(209, 209, 219)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24@s',
  },
  inputText: {
    width: '240@s',
    // marginTop: '10@s',
    textAlign: 'center',
    fontSize: '26@ms',
    color: 'rgb(38, 48, 77)',
    ...Fonts.Ubuntu_Regular,
  },
  btnBlock: {
    marginTop: '24@s',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnSubmit: {
    width: '150@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '10@s',
  },
  btnSms: {
    width: '150@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '10@s',
  },
});
