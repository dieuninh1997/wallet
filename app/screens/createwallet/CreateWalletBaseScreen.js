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
import crypto from 'crypto';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import { CommonStyles, CommonColors, CommonSize } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import EthService from '../../services/wallet/eth';
import MangoGradientButton from '../common/MangoGradientButton';
import { register, login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import AppConfig from '../../utils/AppConfig';
import Consts from '../../utils/Consts';
import { Fonts } from '../../utils/CommonStyles';

import nodejs from 'nodejs-mobile-react-native';

export default class CreateWalletBaseScreen extends Component {

  static WALLET_INFO = {
    EMAIL: 'email',
    PASSPORT: 'passport',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'passwordConfirm',
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      createWalletInfo: {
        email: null,
        passport: null,
        password: null,
        passwordConfirm: null,
      },
    };
    this.walletInfo = null
  }

  componentDidMount = async () => {
    this._generateWallet();
  }

  _generateWallet = () => {
    try {
      nodejs.start("main.js");
      nodejs.channel.addListener(
        "message",
        (message) => {
          console.log(`Wallet created: ${message}`);
          this.walletInfo = JSON.parse(message);
        },
      );
      nodejs.channel.send('generateWallet');
    } catch (error) {
      console.log('CreateByEmailScreen._generateWallet: ', error);
    }
  }

  getLoginType = () => {
    throw new Error('Please override this method in sub-class');
  }

  getUsername = () => {
    const { createWalletInfo } = this.state;

    const loginType = this.getLoginType();
    switch (loginType) {
      case Consts.LOGIN_TYPES.EMAIL:
        return createWalletInfo['email'];
      case Consts.LOGIN_TYPES.PASSPORT:
        return createWalletInfo['passport'];
        break;
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

  _handleChangeInput = (typeInput, value) => {
    const { createWalletInfo } = this.state;

    createWalletInfo[typeInput] = value;
    this.setState({
      createWalletInfo,
    });
  }

  _handleClickCreateWallet = async () => {
    if (!this.walletInfo) {
      return;
    }

    const { navigation } = this.props;
    const { isChecked, createWalletInfo } = this.state;

    try {
      this._validateForm();

      const { privateKey, address, mnemonic } = this.walletInfo;

      const mnemonicHash = crypto.createHmac('sha256', mnemonic)
        .update(AppConfig.getClientSecret())
        .digest('hex');


      const registerInfo = this._getRegisterInfo(mnemonicHash, address);
      const response = await register(registerInfo);
      const loginInfo = response.data;

      // const loginInfo = await login(this.getUsername(), registerInfo.password, '', this.getLoginType());

      await AppPreferences.saveToKeychain({
        access_token: loginInfo.accessToken,
        private_key: privateKey,
        mnemonic: mnemonic
      });

      AppConfig.PRIVATE_KEY = privateKey;
      AppConfig.MNEMONIC = mnemonic;
      AppConfig.ACCESS_TOKEN = loginInfo.accessToken;

      // window.GlobalSocket.connect();
      Keyboard.dismiss();

      await AsyncStorage.setItem('address', address);

      UIUtils.showToastMessage(I18n.t('createWalletByEmailScreen.createWaletSuccess'));
      navigation.navigate('BackupPassphraseScreenCompact');
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]]);
      } else {
        UIUtils.showToastMessage(error.message);
      }
      console.log(error);
    }
  }

  _validateForm = () => {
    const { isChecked, createWalletInfo } = this.state;

    if (!isChecked) {
      throw new Error(I18n.t('createWalletByEmailScreen.readAndCheckTerms'));
    }

    this._validateUsername();

    if (!createWalletInfo.password || (createWalletInfo.password !== createWalletInfo.passwordConfirm)) {
      throw new Error(I18n.t('createWalletByEmailScreen.passwordMustMatch'));
    }
  }

  _validateUsername = () => {

  }

  _getRegisterInfo = (mnemonicHash, address) => {
    const { createWalletInfo } = this.state;
    const loginType = this.getLoginType();

    let registerInfo = {
      password: createWalletInfo.password,
      password_confirmation: createWalletInfo.passwordConfirm,
      mnemonic: mnemonicHash,
      login_type: loginType,
      eth_address: address,
    };

    let username = this.getUsername();
    switch (loginType) {
      case Consts.LOGIN_TYPES.EMAIL:
        registerInfo['email'] = username;
        break;
      case Consts.LOGIN_TYPES.PASSPORT:
        registerInfo['passport_number'] = username;
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

  _renderUsernameInput = () => {
    return (
      <View />
    );
  }

  _renderTermsAndConditions = () => {
    const { isChecked } = this.state;

    return (
      <View style={styles.termAndConditionContainer}>
        <CheckBox
          containerStyle={styles.checkboxContainer}
          iconRight
          checked={isChecked}
          checkedIcon="check-square"
          uncheckedIcon="square"
          checkedColor="#1c43b8"
          onPress={() => this._handleToggleCheckBox()}
        />
        <TouchableWithoutFeedback
          onPress={() => this._onBtnTerms()}
        >
          <View
            style={styles.textTermAndConditions}
          >
            <Text style={styles.textAccept}>{I18n.t('createByPhoneNumber.iAccept')}</Text>
            <Text style={styles.textTerms}>{I18n.t('createByPhoneNumber.termsAndConditions')}</Text>
          </View>
        </TouchableWithoutFeedback>
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
    return (
      <View style={styles.container}>
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
    backgroundColor: '#F5F7FA',
  },

  termAndConditionContainer: {
    flexDirection: 'row',
    marginTop: '10@s',
  },

  checkboxContainer: {
    backgroundColor: 'transparent',
    padding: '0@s',
    borderWidth: 0,
  },

  textTermAndConditions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  textAccept: {
    color: '#000',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },

  textTerms: {
    color: '#1e68ff',
    fontSize: '16@ms',
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
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },

  inputWalletIdContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#cad1db',
  },

  inputImageIcon: {
    width: '28@s',
    height: '28@s',
    marginRight: '10@s',
  },

  inputText: {
    flex: 7,
    fontSize: CommonSize.inputFontSize,
    fontWeight: '100',
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
});
