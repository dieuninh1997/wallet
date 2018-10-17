import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize, CommonColors } from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import { enableGoogleOtp, disableGoogleOtp } from '../../../api/user/UserRequest';
import UIUtils from '../../../utils/UIUtils';

export default class GoogleAuthScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting2fa.googleAuth'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      smsCode: '',
      googleOtpCode: '',
      googleOtpStatus: false,
    };
    this.PASSWORD = 'password';
    this.SMSCODE = 'smsCode';
    this.GOOGLEOTPCODE = 'googleOtpCode';
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.setState({
      googleOtpStatus: params,
    });
  }

  _onTextChanged = (type, text) => {
    switch(type) {
      case this.PASSWORD:
        this.setState({password: text});
        break;
      case this.GOOGLEOTPCODE:
        this.setState({googleOtpCode: text});
        break;
      default:
        this.setState({smsCode: text});
    }
  }

  _validateClient = () => {
    const { password, smsCode, googleOtpCode } = this.state;
    if (!password) {
      UIUtils.showToastMessage(I18n.t('setting2fa.passwordRequired'));
      return false;
    }

    if (!googleOtpCode) {
      UIUtils.showToastMessage(I18n.t('setting2fa.googleOtpCodeRequired'));
      return false;
    }

    if (!UIUtils.validateNumber(googleOtpCode)) {
      UIUtils.showToastMessage(I18n.t('setting2fa.googleOtpCodeRequiredNumber'));
      return false;
    }

    return true;
  }

  _handleEnableGoogleOtp = async () => {
    const { password, smsCode, googleOtpCode, googleOtpStatus } = this.state;

    if (!this._validateClient()) {
      return;
    }

    try {
      const responseEnableGoogleOtp = googleOtpStatus ? await disableGoogleOtp(password, googleOtpCode) : await enableGoogleOtp(password, googleOtpCode);
      const { navigation } = this.props;
      navigation.navigate('SettingScreen', true);
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]]);
      } else {
        UIUtils.showToastMessage(error.message);
      }
    }
  }

  _sendSms = () => {}

  render() {
    const { password, smsCode, googleOtpCode, googleOtpStatus } = this.state;

    return (
      <View style={styles.GoogleAuth}>

        <View style={styles.inputBlock}>
          <Image
            source={require('../../../../assets/setting/key.png')}
            style={styles.image}
          />
          <TextInput
            editable
            secureTextEntry
            onChangeText = {(text)=> this._onTextChanged(this.PASSWORD, text)}
            value = {password}
            style={styles.inputText}
            placeholder={I18n.t('setting2fa.loginPassword')}
          />
        </View>

        <View style={styles.inputBlock}>
          <Image
            source={require('../../../../assets/setting/smsAuth.png')}
            style={styles.image}
          />
          <TextInput
            editable
            onChangeText = {(text)=> this._onTextChanged(this.SMSCODE, text)}
            value = {smsCode}
            style={[styles.inputText, styles.width137, styles.marginRight27]}
            placeholder={I18n.t('setting2fa.smsAuthCode')}
          />
          <MangoGradientButton
            btnText={I18n.t('setting2fa.sendSms')}
            colorOptions={['#4e73e4', '#2150de', '#1c43b8']}
            btnStyle={styles.btnSendSms}
            buttonTextStyle={styles.textWhite}
            onPress={() => this._sendSms()}
          />
        </View>

        <View style={styles.inputBlock}>
          <Image
            source={require('../../../../assets/setting/graphicGauthLogo.png')}
            style={styles.image}
          />
          <TextInput
            editable
            maxLength={6}
            onChangeText = {(text)=> this._onTextChanged(this.GOOGLEOTPCODE, text)}
            value = {googleOtpCode}
            style={[styles.inputText, styles.width165]}
            placeholder={I18n.t('setting2fa.googleAuthCode')}
          />
        </View>

        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={googleOtpStatus ? I18n.t('setting.disabled') : I18n.t('setting.enabled')}
            btnStyle={styles.btnNext}
            onPress={() => this._handleEnableGoogleOtp()}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  GoogleAuth: {
    paddingTop: '42@s',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
  inputBlock: {
    flexDirection: 'row',
    width: '335@s',
    height: '56@s',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '28@s',
    borderWidth: 1,
    borderColor: 'rgb(209, 209, 219)',
    alignItems: 'center',
    marginBottom: '24@s'
  },
  image: {
    marginLeft: '20@s',
    marginRight: '12@s',
    width: '24@s',
    height: '24@s',
  },
  inputText: {
    width: '265@s',
    fontSize: '18@ms',
    color: 'rgb(38, 48, 77)',
    ...Fonts.Ubuntu_Light,
  },
  btnBlock: {
    marginTop: '16@s',
  },
  btnNext: {
    width: '140@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  },
  width137: {
    width: '137@s'
  },
  width165: {
    width: '165@s'
  },
  marginRight27: {
    marginRight: '27@s'
  },
  btnSendSms: {
    width: '103@s',
    height: '40@s',
  },
  textWhite: {
    color: '#ffffff',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  }
});
