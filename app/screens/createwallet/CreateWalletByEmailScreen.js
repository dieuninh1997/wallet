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
import bip39 from 'bip39';
import hdkey from 'hdkey';
import crypto from 'crypto';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import WalletService from '../../services/wallet';
import MangoGradientButton from '../common/MangoGradientButton';
import { register, login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';

export default class CreateWalletByEmailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWalletByEmailScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (<View />),
  })

  static WALLET_INFO = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'passwordConfirm',
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      createWalletInfo: {
        email: null,
        password: null,
        passwordConfirm: null,
      },
    };
  }

  _handleToggleCheckBox = () => {
    const { isChecked } = this.state;

    this.setState({
      isChecked: !isChecked,
    });
  }

  _handleChangeInput = (typeInput, value) => {
    const { createWalletInfo } = this.state;

    createWalletInfo[typeInput] = value;
    this.setState({
      createWalletInfo,
    });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _handleClickCreateWallet = async () => {
    const { navigation } = this.props;
    const { isChecked, createWalletInfo } = this.state;

    try {
      // if (!isChecked) {
      //   throw new Error('Please read and accept terms and conditions!');
      // }

      // if (!this.validateEmail(createWalletInfo.email)) {
      //   throw new Error('Email is not valid!');
      // }
      // if (!createWalletInfo.password || (createWalletInfo.password !== createWalletInfo.passwordConfirm)) {
      //   throw new Error('Password must match password confirmation!');
      // }

      const generatedMnemonic = bip39.generateMnemonic();
      const seed = bip39.mnemonicToSeedHex(generatedMnemonic);
      const generatedPrivateKey = hdkey.fromMasterSeed(seed).privateKey.toString('hex');

      const {
        privateKey, address, mnemonic, keystore,
      } = await WalletService.importWalletFromPrivateKey('nanj', generatedPrivateKey, generatedMnemonic, createWalletInfo.password);
      const mnemonicHash = crypto.createHmac('sha256', mnemonic)
        .update(createWalletInfo.password)
        .digest('hex');

      const registerInfo = {
        email: createWalletInfo.email,
        password: createWalletInfo.password,
        password_confirmation: createWalletInfo.passwordConfirm,
        mnemonic: mnemonicHash,
        keystore: JSON.stringify(keystore),
        login_type: 1,
        eth_address: address,
      };

      await register(registerInfo);

      const loginInfo = await login(registerInfo.email, registerInfo.password);
      console.log('loginInfo', loginInfo);
      AppPreferences.saveAccessToken(loginInfo.access_token);
      window.GlobalSocket.connect();
      Keyboard.dismiss();

      await AsyncStorage.setItem('address', address);

      AppPreferences.showToastMessage(I18n.t('createWalletByEmailScreen.createWaletSuccess'));
      setTimeout(() => {
        navigation.navigate('AddPinScreen');
      }, 1000);
    } catch (error) {
      AppPreferences.showToastMessage(error.message);
    }
  }

  _renderFormCreateByEmail = () => (
    <View style={styles.formLoginContainer}>
      <View style={[styles.inputContainer]}>
        <Image
          source={require('../../../assets/wallet/wallet-login.png')}
          style={styles.inputImageIcon}
        />
        <TextInput
          placeholder={I18n.t('createWalletByEmailScreen.inputEmail')}
          editable
          underlineColorAndroid="transparent"
          style={styles.inputText}
          onChangeText={value => this._handleChangeInput(CreateWalletByEmailScreen.WALLET_INFO.EMAIL, value)}
        />
      </View>

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
          onChangeText={value => this._handleChangeInput(CreateWalletByEmailScreen.WALLET_INFO.PASSWORD, value)}
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
          onChangeText={value => this._handleChangeInput(CreateWalletByEmailScreen.WALLET_INFO.PASSWORD_CONFIRM, value)}
        />
      </View>
    </View>
  )

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
          onPress={() => this._handleToggleCheckBox()}
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
      onPress={() => this._handleClickCreateWallet()}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this._renderFormCreateByEmail()}
          {this._renderTermsAndConditions()}
        </ScrollView>
        {this._renderButtonCreate()}
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
    color: '#121313',
    fontSize: '16@ms',
  },

  textTerms: {
    color: '#1f45b9',
    fontSize: '16@ms',
  },

  formLoginContainer: {
    marginTop: '46@s',
    height: '170@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '25@s',
    borderWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  inputContainer: {
    flex: 1,
    width: '340@s',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },

  inputWalletIdContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '10@s',
  },

  fingerPrintImage: {
    width: '32@s',
    height: '32@s',
  },

  inputText: {
    flex: 7,
    fontSize: '18@s',
    fontWeight: '100',
  },

  btnCreateWalletContainer: {
    width: '220@s',
    marginBottom: '20@s',
    marginHorizontal: '5@s',
  },
});
