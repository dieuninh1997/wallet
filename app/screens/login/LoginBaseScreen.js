import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import {
  CommonStyles, CommonColors, CommonSize, Fonts,
} from '../../utils/CommonStyles';
import { login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let titleShow = '';
    switch (params.screen) {
    case 'phone':
      titleShow = I18n.t('signin.signInByPhone');
      break;
    case 'passport':
      titleShow = I18n.t('signin.signInByPassport');
      break;
    default:
      titleShow = I18n.t('signin.signInByEmail');
      break;
    }

    return {
      headerLeft: <MangoBackButton navigation={navigation} />,
      title: titleShow,
      headerTitleStyle: CommonStyles.headerTitle,
      headerStyle: CommonStyles.header,
      headerRight: <View />,
    };
  }

  static LOGIN_INFO = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { params } = navigation.state;
    let signinType = '0';
    switch (params.screen) {
    case 'email':
      signinType = '1';
      break;
    case 'passport':
      signinType = '2';
      break;
    default:
      signinType = '0';
      break;
    }

    this.state = {
      cca2: 'vn',
      loginInfo: {
        email: null,
        password: null,
      },
    };
    this.signinType = signinType;
  }

  _handleClickLogin = async () => {
    const { loginInfo } = this.state;
    const { navigation } = this.props;
    const { email, password } = loginInfo;

    try {
      const responseUser = await login(email, password, otp = '', loginType = this.signinType);

      AppPreferences.saveToKeychain({
        access_token: responseUser.access_token,
      });
      window.GlobalSocket.connect();
      Keyboard.dismiss();
      navigation.navigate('RestoreWalletScreen');
    } catch (error) {
      if (error.error === 'invalid_otp') {
        navigation.navigate('GoogleOtpVerifyScreen', { email, password });
        return;
      }
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]]);
      } else {
        UIUtils.showToastMessage(error.message);
      }
    }
  }

  _handlePressFlag = () => {
    this.countryPicker.openModal();
  }

  selectCountry = (country) => {
    const parseCountry = country.cca2.toLowerCase();
    this.phone.selectCountry(parseCountry);
    this.setState({ cca2: country.cca2 });
  }

  _initialCountry = () => {
    switch (I18n.locale) {
    case 'vi': return 'vn';
    case 'jp': return 'jp';
    case 'en': return 'gb';
    case 'ta': return 'ph';
    case 'il': return 'ph';
    case 'vis': return 'ph';
    }
  }

  _handleChangeInput = (typeInput, value) => {
    const { loginInfo } = this.state;

    loginInfo[typeInput] = value;
    this.setState({
      loginInfo,
    });
  }

  _handleForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('ForgotPasswordScreen');
  }

  _renderFormInput = () => {
    let imageShow = null;
    switch (this.signinType) {
    case '0':
      imageShow = (
        <View style={[styles.inputTextNumber, styles.inputWalletIdContainer]}>
          <View style={styles.country}>
            <View style={styles.inputDialCode}>
              <PhoneInput
                ref={ref => this.phone = ref}
                style={styles.dialCode}
                textStyle={styles.dialCodeText}
                flagStyle={{ display: 'none' }}
                initialCountry={this._initialCountry()}
              />
              <TouchableOpacity
                onPress={this._handlePressFlag}
                style={{ marginLeft: 3 }}
              >
                <Image
                  source={require('../../../assets/arrow-down/down-arrow.png')}
                  style={styles.arrow}
                />
              </TouchableOpacity>
            </View>
            <CountryPicker
              ref={ref => this.countryPicker = ref}
              onChange={value => this.selectCountry(value)}
              translation="eng"
              cca2={this.state.cca2}
            >
              <View />
            </CountryPicker>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              keyboardType="phone-pad"
              underlineColorAndroid="transparent"
              placeholder={I18n.t('createWallet.phoneNumber')}
              onChangeText={value => this._handleChangeInput(LoginScreen.LOGIN_INFO.EMAIL, this.phone.state.formattedNumber + value)}
            />
          </View>
        </View>
      );
      break;
    case '1':
      imageShow = (
        <View style={[styles.inputContainer, styles.inputWalletIdContainer]}>
          <Image
            source={require('../../../assets/email/email.png')}
            style={styles.inputImageIcon}
          />
          <TextInput
            placeholder={I18n.t('signin.emailAddress')}
            editable
            underlineColorAndroid="transparent"
            style={styles.inputText}
            onChangeText={value => this._handleChangeInput(LoginScreen.LOGIN_INFO.EMAIL, value)}
          />
        </View>
      );
      break;
    case '2':
      imageShow = (
        <View style={[styles.inputContainer, styles.inputWalletIdContainer]}>
          <Image
            source={require('../../../assets/passport/passport.png')}
            style={styles.inputImageIcon}
          />
          <TextInput
            placeholder={I18n.t('signin.passportNumber')}
            editable
            underlineColorAndroid="transparent"
            style={styles.inputText}
            onChangeText={value => this._handleChangeInput(LoginScreen.LOGIN_INFO.EMAIL, value)}
          />
        </View>
      );
      break;
    default:
      break;
    }
    return imageShow;
  }

  _renderFormLogin = () => (
    <View style={styles.formLoginContainer}>
      {this._renderFormInput()}

      <View style={styles.inputContainer}>
        <Image
          source={require('../../../assets/password/key.png')}
          style={styles.inputImageIcon}
        />
        <TextInput
          placeholder={I18n.t('signin.inputPassword')}
          editable
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.inputText}
          onChangeText={value => this._handleChangeInput(LoginScreen.LOGIN_INFO.PASSWORD, value)}
        />
      </View>
    </View>
  )

  _renderBtnForgotPassword = () => (
    <View style={styles.btnForgotPassContainer}>
      <TouchableOpacity
        style={styles.btnForgotPass}
        onPress={() => this._handleForgotPassword()}
      >
        <Image
          source={require('../../../assets/forgot-password/forgotPass.png')}
          style={styles.inputImageIcon}
        />
        <Text style={styles.btnForgotPassText}>{I18n.t('signin.forgotPassword')}</Text>
      </TouchableOpacity>
    </View>
  )

  _renderBtnLogin = () => (
    <MangoGradientButton
      btnText={I18n.t('signin.title')}
      btnStyle={styles.btnSigninContainer}
      onPress={() => this._handleClickLogin()}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this._renderFormLogin()}
          {this._renderBtnLogin()}
          {this._renderBtnForgotPassword()}
        </ScrollView>

      </View>
    );
  }
}

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: CommonColors.screenBgColor,
  },

  formLoginContainer: {
    marginTop: '24@s',
    height: '112@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '28@s',
    borderWidth: 1,
    borderColor: '#cad1db',
  },

  inputContainer: {
    flex: 1,
    width: '338@s',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },

  inputWalletIdContainer: {
    borderBottomWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '10@s',
  },

  fingerPrintImage: {
    width: '50@s',
    height: '50@s',
    marginBottom: '24@s',
  },

  inputText: {
    flex: 7,
    fontSize: '18@ms',
    ...Fonts.Ubuntu_Light,
  },

  btnForgotPassContainer: {
    alignItems: 'center',
  },

  btnForgotPass: {
    flexDirection: 'row',
    width: '158@s',
    height: '40@s',
    borderRadius: '20@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6ebf2',
  },

  btnCreate: {
    flexDirection: 'row',
    width: '80@s',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtLblCreate: {
    fontSize: CommonSize.headerFontSize,
    color: '#8d96b1',
    ...Fonts.Ubuntu_Regular,
  },

  btnForgotPassText: {
    color: '#26304d',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },

  btnSigninContainer: {
    width: '247@s',
    height: '48@s',
    marginBottom: '24@s',
    marginTop: '16@s',
    alignSelf: 'center',
  },
  arrow: {
    width: '15@s',
    height: '15@s',
    paddingLeft: '0@s',
    opacity: 0.5,
  },
  inputDialCode: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialCode: {
    width: '60@s',
    marginLeft: -17,
  },
  dialCodeText: {
    textAlign: 'center',
    fontSize: '18@ms',
    ...Fonts.Ubuntu_Light,
  },
  country: {
    borderRightWidth: '1@s',
    justifyContent: 'center',
    paddingLeft: '20@s',
    borderColor: '#eef0f4',
    width: '87.5@s',
    height: '56@s',
  },
  inputTextNumber: {
    flex: 1,
    flexDirection: 'row',
    width: '330@s',
    alignItems: 'center',
  },
});
