import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  AsyncStorage,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import CryptoJS from 'crypto-js';

import nodejs from 'nodejs-mobile-react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import {
  CommonColors, CommonSize, Fonts,
} from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import MangoGradientButton from '../common/MangoGradientButton';
import { register } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import AppConfig from '../../utils/AppConfig';
import Consts from '../../utils/Consts';
import MangoLoading from '../common/MangoLoading';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';

const stripHexPrefix = require('strip-hex-prefix');

export default class CreateWalletBaseScreen extends Component {
  static WALLET_INFO = {
    EMAIL: 'email',
    PHONE: 'phoneNumber',
    PASSPORT: 'passport',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'passwordConfirm',
  };

  constructor(props) {
    super(props);
    this.clickCreate = true;
    this.state = {
      isChecked: false,
      createWalletInfo: {
        email: null,
        passport: null,
        phone_number: null,
        password: null,
        passwordConfirm: null,
        phoneNumber: null,
      },
      isLoading: false,
      isCreateIdNumber: false,
    };
    this.walletInfo = null;
  }

  componentDidMount = async () => {
    this._generateWallet();
    this.getUsername();
  }

  _generateWallet = () => {
    try {
      nodejs.start('main.js');
      nodejs.channel.addListener(
        'message',
        (message) => {
          this.walletInfo = JSON.parse(message);
        },
      );
      nodejs.channel.send(JSON.stringify({ action: 'generateWallet', data: '' }));
    } catch (error) {
      console.log('CreateByEmailScreen._generateWallet: ', error);
    }
  }

  _generateKeystore = data => new Promise((resolve, reject) => {
    try {
      nodejs.start('main.js');
      nodejs.channel.addListener(
        'generateKeystore',
        (message) => {
          resolve(JSON.parse(message));
        },
      );
      nodejs.channel.post('generateKeystore', JSON.stringify({
        action: 'generateKeystore',
        data: JSON.stringify(data),
      }));
    } catch (error) {
      console.log('CreateByEmailScreen._generateKeystore._error: ', error);
      reject(error);
    }
  })

  getLoginType = () => {
    throw new Error('Please override this method in sub-class');
  }

  getUsername = () => {
    const { createWalletInfo } = this.state;

    const loginType = this.getLoginType();
    switch (loginType) {
      case Consts.LOGIN_TYPES.EMAIL:
        return createWalletInfo.email;
      case Consts.LOGIN_TYPES.PASSPORT:
        this.setState({
          isCreateIdNumber: true,
        });
        return createWalletInfo.passport;
      case Consts.LOGIN_TYPES.PHONE_NUMBER:
        return createWalletInfo.phone_number;
      default:
        throw new Error(`Unknown login type: ${loginType}`);
    }
  }

  _handleToggleCheckBox = () => {
    const { isChecked } = this.state;

    this.setState({
      isChecked: !isChecked,
    });
  }

  _onBtnTerms = () => {
    const { navigation } = this.props;

    navigation.navigate('TermsConditionScreen');
  }

  _onBtnListAccep = () => {
    const { navigation } = this.props;

    navigation.navigate('ListofAccep');
  }

  _handleChangeInput = (typeInput, value) => {
    const { createWalletInfo } = this.state;
    createWalletInfo[typeInput] = value;
    this.setState({
      createWalletInfo,
    });
  }

  _handleClickCreateWallet = async () => {
    if (!this.clickCreate) {
      return;
    }

    if (!this.walletInfo) {
      return;
    }
    const { navigation } = this.props;

    try {
      this._validateForm();

      this.setState({
        isLoading: true,
      });

      this.clickCreate = false;
      const { privateKey, address, mnemonic } = this.walletInfo;
      const mnemonicHash = CryptoJS.SHA256(mnemonic).toString();
      const privateKeyHash = CryptoJS.SHA256(privateKey).toString();

      const registerInfo = this._getRegisterInfo(mnemonicHash, address);
      const dataGenKeystore = {
        privateKey: stripHexPrefix(privateKey),
        password: registerInfo.password,
      };

      const keyStore = await this._generateKeystore(dataGenKeystore);
      registerInfo.keystore = keyStore.keystore;
      registerInfo.privateKey = privateKeyHash;

      const response = await register(registerInfo);
      const loginInfo = response.data;

      await AppPreferences.saveToKeychain({
        access_token: loginInfo.accessToken,
        private_key: privateKey,
        mnemonic,
      });

      AppConfig.PRIVATE_KEY = privateKey;
      AppConfig.MNEMONIC = mnemonic;
      AppConfig.ACCESS_TOKEN = loginInfo.accessToken;
      AppConfig.KEYSTORE = JSON.parse(keyStore.keystore);

      Keyboard.dismiss();

      await AsyncStorage.setItem('address', address);
      this.setState({
        isLoading: false,
      });
      UIUtils.showToastMessage(I18n.t('createWalletByEmailScreen.createWaletSuccess'), 'success');
      navigation.navigate('BackupPassphraseScreenCompact');
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      this.clickCreate = true;
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]][0], 'error');
      } else {
        UIUtils.showToastMessage(error.message, 'error');
      }
      console.log(error);
    }
  }

  _validateForm = () => {
    const { isChecked, createWalletInfo } = this.state;

    if (!createWalletInfo.email && !createWalletInfo.passport && !createWalletInfo.phoneNumber) {
      throw new Error(I18n.t('createWalletByEmailScreen.requireInfo'));
    }
    if (!createWalletInfo.password || !createWalletInfo.passwordConfirm) {
      throw new Error(I18n.t('createWalletByEmailScreen.requireInfo'));
    }

    this._validateUsername();

    if (!UIUtils.validatePassword(createWalletInfo.password)) {
      throw new Error(I18n.t('createWalletByEmailScreen.passwordInvalid'));
    }

    if (!createWalletInfo.password || (createWalletInfo.password !== createWalletInfo.passwordConfirm)) {
      throw new Error(I18n.t('createWalletByEmailScreen.passwordMustMatch'));
    }

    if (!isChecked) {
      throw new Error(I18n.t('createWalletByEmailScreen.readAndCheckTerms'));
    }
  }

  _validateUsername = () => {

  }

  _getRegisterInfo = (mnemonicHash, address) => {
    const { createWalletInfo } = this.state;
    const loginType = this.getLoginType();
    const registerInfo = {
      password: createWalletInfo.password,
      password_confirmation: createWalletInfo.passwordConfirm,
      mnemonic: mnemonicHash,
      login_type: loginType,
      eth_address: address,
    };

    const username = this.getUsername();
    switch (loginType) {
      case Consts.LOGIN_TYPES.EMAIL:
        registerInfo.email = username;
        break;
      case Consts.LOGIN_TYPES.PASSPORT:
        registerInfo.passport_number = username;
        break;
      case Consts.LOGIN_TYPES.PHONE_NUMBER:
        registerInfo.phone_number = username;
        break;
      default:
        throw new Error(`Unknown login type: ${loginType}`);
    }

    return registerInfo;
  }

  _renderRegisterFrom = () => (
    <View style={styles.formLoginContainer}>

      {this._renderUsernameInput()}

      <View style={[styles.inputContainer, styles.inputWalletIdContainer]}>
        <Image
          source={require('../../../assets/password/key.png')}
          style={styles.inputImageIcon}
        />
        <TextInput
          placeholder={I18n.t('createWalletByEmailScreen.inputPassword')}
          editable
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.inputText}
          onChangeText={value => this._handleChangeInput(CreateWalletBaseScreen.WALLET_INFO.PASSWORD, value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require('../../../assets/password/key.png')}
          style={styles.inputImageIcon}
        />
        <TextInput
          placeholder={I18n.t('createWalletByEmailScreen.inputPasswordConfirm')}
          editable
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.inputText}
          onChangeText={value => this._handleChangeInput(CreateWalletBaseScreen.WALLET_INFO.PASSWORD_CONFIRM, value)}
        />
      </View>
    </View>
  )

  _renderUsernameInput = () => (
    <View />
  )

  _renderTermsAndConditions = () => {
    const { isChecked, isCreateIdNumber } = this.state;

    return (
      <View style={styles.termContainer}>
        {!isCreateIdNumber ? null :
          <TouchableWithoutFeedback onPress={() => this._onBtnListAccep()}>
            <View style={styles.textTermAndConditions}>
              <Text style={styles.textTerms}>{I18n.t('createByPhoneNumber.ListofAcceptableIdentificationCards')}</Text>
            </View>
          </TouchableWithoutFeedback>
        }
        <View style={styles.termAndConditionContainer}>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            checked={isChecked}
            size={scale(20)}
            checkedIcon="check-square"
            uncheckedIcon="square"
            checkedColor="#1c43b8"
            onPress={() => this._handleToggleCheckBox()}
          />

          <TouchableWithoutFeedback
            onPress={() => this._onBtnTerms()}
          >
            {I18n.locale === 'jp'
              ? (
                <View
                  style={styles.textTermAndConditions}
                >
                  <Text style={styles.textTerms}>{I18n.t('createByPhoneNumber.termsAndConditions')}</Text>
                  <Text style={styles.textAccept}>{I18n.t('createByPhoneNumber.iAccept')}</Text>
                </View>
              )
              : (
                <View
                  style={styles.textTermAndConditions}
                >
                  <Text style={styles.textAccept}>{I18n.t('createByPhoneNumber.iAccept')}</Text>
                  <Text style={styles.textTerms}>{I18n.t('createByPhoneNumber.termsAndConditions')}</Text>
                </View>
              )}
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  _renderButtonCreate = () => (
    <MangoGradientButton
      btnText={I18n.t('createWalletByEmailScreen.createWallet')}
      btnStyle={styles.btnCreateWalletContainer}
      buttonTextStyle={styles.textBtnCreateWalletContainer}
      onPress={() => this._handleClickCreateWallet()}
    />
  )

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? <MangoLoading /> : null}
        <ScrollView>
          {this._renderRegisterFrom()}
          {this._renderTermsAndConditions()}
          {this._renderButtonCreate()}
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: CommonColors.screenBgColor,
  },

  termAndConditionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '5@s',
  },

  checkboxContainer: {
    backgroundColor: 'transparent',
    padding: '0@s',
    marginLeft: '0@s',
    marginRight: '0@s',
    borderWidth: '0@s',
    width: '22@s',
  },

  textTermAndConditions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  textAccept: {
    color: '#000',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },

  textTerms: {
    color: '#1e68ff',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },

  formLoginContainer: {
    marginTop: '24@s',
    height: '168@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '28@s',
    borderWidth: 1,
    borderColor: '#cad1db',
  },

  inputContainer: {
    flex: 1,
    width: '330@s',
    flexDirection: 'row',
    paddingHorizontal: '10@s',
    alignItems: 'center',
  },

  inputWalletIdContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#cad1db',
  },

  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '5@s',
  },

  inputText: {
    flex: 7,
    fontSize: CommonSize.inputFontSize,
    ...Fonts.Ubuntu_Light,
  },

  btnCreateWalletContainer: {
    alignSelf: 'center',
    marginTop: '28@s',
    width: '247@s',
    height: '48@s',
    marginBottom: '20@s',
  },

  textBtnCreateWalletContainer: {
    fontSize: '20@ms',
    ...Fonts.Ubuntu_Regular,
  },

  termContainer: {
    flexDirection: 'column',
    marginTop: '15@s',
  },
});
