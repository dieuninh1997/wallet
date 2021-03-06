import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  Platform,
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
import AppConfig from '../../utils/AppConfig';
import nodejs from 'nodejs-mobile-react-native';
import MangoLoading from '../common/MangoLoading';

class LoginBaseScreen extends Component {
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
      isLoading: false,
    };
    this.signinType = signinType;
  }

  _importWalletFromKeystore = data => new Promise((resolve, reject) => {
    try {
      nodejs.start('main.js');
      nodejs.channel.addListener(
        'importWalletFromKeystore',
        (message) => {
          resolve(JSON.parse(message));
        },
      );
      nodejs.channel.post('importWalletFromKeystore', JSON.stringify({
        action: 'importWalletFromKeystore',
        data: JSON.stringify(data),
      }));
    } catch (error) {
      console.log('LoginBaseScreen._importWalletFromKeystore._error: ', error);
      reject(error);
    }
  })

  _handleClickLogin = async () => {
    const { loginInfo } = this.state;
    const { navigation } = this.props;
    const { email, password } = loginInfo;

    try {
      this._validateForm();
      this.setState({
        isLoading: true,
      });
      const responseUser = await login(email, password, otp = '', loginType = this.signinType);

      loginInfo.loginType = this.signinType;
      const keystore = JSON.parse(responseUser.keystore);

      const dataGenInfoWallet = {
        keystore,
        password,
      };

      const walletInfo = await this._importWalletFromKeystore(dataGenInfoWallet)
      Keyboard.dismiss();
      await AppPreferences.saveToKeychain({
        access_token: responseUser.access_token,
        private_key: walletInfo.privateKey,
      });
      AppConfig.PRIVATE_KEY = walletInfo.privateKey;
      AppConfig.ACCESS_TOKEN = responseUser.access_token;
      AppConfig.KEYSTORE = keystore;

      await AsyncStorage.setItem('address', walletInfo.address);
      this.setState({
        isLoading: false,
      });
      const params = {
        backScreen: true,
      }
      navigation.navigate('AddPinScreen', params);
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      if (error.error === 'invalid_otp') {
        navigation.navigate('GoogleOtpVerifyScreen', { email, password, loginType: this.signinType });
        return;
      }
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]][0], 'error');
      } else {
        if (error.message) {
          UIUtils.showToastMessage(error.message, 'error');
        } else {
          UIUtils.showToastMessage(error, 'error');
        }
      }
    }
  }

  _validateForm = () => {
    const { loginInfo } = this.state;
    if (!loginInfo.email || !loginInfo.password) {
      throw new Error(I18n.t('createWalletByEmailScreen.requireInfo'));
    }
    if ((this.signinType === '1') && (!UIUtils.validateEmail(loginInfo.email))) {
      throw new Error(I18n.t('createWalletByEmailScreen.emailInvalid'));
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
                <TouchableOpacity
                  onPress={this._handlePressFlag}>
                  <PhoneInput
                    ref={ref => this.phone = ref}
                    style={styles.dialCode}
                    disabled
                    textStyle={styles.dialCodeText}
                    flagStyle={{ display: 'none' }}
                    initialCountry={this._initialCountry()}
                  />
                </TouchableOpacity>
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
                filterable
                showCallingCode
                renderFilter={({ value, onChange, onClose }) => (
                  <View style={styles.searchCountryPicker}>
                    <View style={styles.groupSearchCountryPicker}>
                      <Image style={styles.iconSearchCountryPicker} source={require('../../../assets/mobile-number-verify/searchCountryPicker.png')} />
                      <TextInput
                        placeholder={I18n.t('signin.searchCountry')}
                        style={styles.inputSearchCountryPicker}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    <TouchableWithoutFeedback onPress={onClose}>
                      <Text style={styles.textCancelCountryPicker}>{I18n.t('signin.cancel')}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                )}
                hideAlphabetFilter
              >
                <View />
              </CountryPicker>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('createWallet.phoneNumber')}
                onChangeText={value => this._handleChangeInput(LoginBaseScreen.LOGIN_INFO.EMAIL, this.phone.state.formattedNumber + value)}
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
              onChangeText={value => this._handleChangeInput(LoginBaseScreen.LOGIN_INFO.EMAIL, value)}
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
              onChangeText={value => this._handleChangeInput(LoginBaseScreen.LOGIN_INFO.EMAIL, value)}
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
          onChangeText={value => this._handleChangeInput(LoginBaseScreen.LOGIN_INFO.PASSWORD, value)}
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
          style={styles.iconForgotPass}
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
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? <MangoLoading /> : null}
        <ScrollView>
          {this._renderFormLogin()}
          {this._renderBtnLogin()}
          {/*this._renderBtnForgotPassword()*/}
        </ScrollView>

      </View>
    );
  }
}

export default LoginBaseScreen;

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

  iconForgotPass: {
    width: '24@s',
    height: '24@s',
    marginRight: '5@s',
    marginLeft: '10@s',
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
    marginLeft: '0@s',
    marginRight: '15@s',
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
    color: '#000000',
    ...Fonts.Ubuntu_Bold,
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
  searchCountryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '10@s',
    paddingRight: '10@s',
    justifyContent: 'space-between',
    width: '100%',
    height: '60@s',
    backgroundColor: CommonColors.screenBgColor,
  },
  groupSearchCountryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '15@s',
    backgroundColor: '#fff',
  },
  iconSearchCountryPicker: {
    width: '30@s',
    height: '30@s',
  },
  inputSearchCountryPicker: {
    height: '40@s',
    width: '70%',
    marginLeft: '10@s',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },
  textCancelCountryPicker: {
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  },
});
