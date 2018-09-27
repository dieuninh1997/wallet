import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  AsyncStorage,
  Image,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import bip39 from 'bip39';
import hdkey from 'hdkey';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import WalletService from '../../services/wallet';
import MangoGradientButton from '../common/MangoGradientButton';

export default class CreateWalletByEmailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createByEmailAddress.title'),
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
      isChecked: true,
    };
  }

  _handleToggleCheckBox = () => {
    const { isChecked } = this.state;

    this.setState({
      isChecked: !isChecked,
      createWalletInfo: {
        email: null,
        password: null,
        passwordConfirm: null,
      },
    });
  }

  _handleChangeInput = (typeInput, value) => {
    const { createWalletInfo } = this.state;

    createWalletInfo[typeInput] = value;
    this.setState({
      createWalletInfo,
    });
  }

  _handleClickCreateWallet = async () => {
    const { navigation } = this.props;
    try {
      const generatedMnemonic = bip39.generateMnemonic();
      const seed = bip39.mnemonicToSeedHex(generatedMnemonic);
      const generatedPrivateKey = hdkey.fromMasterSeed(seed).privateKey.toString('hex');

      const {
        privateKey, address, mnemonic, keystore,
      } = await WalletService.importWalletFromPrivateKey('nanj', generatedPrivateKey, generatedMnemonic, '123456');

      AsyncStorage.setItem('address', address);
      AsyncStorage.setItem('privateKey', privateKey);
      AsyncStorage.setItem('mnemonic', mnemonic);
      AsyncStorage.setItem('keystore', keystore);

      navigation.navigate('MainScreen');
    } catch (error) {
      Toast.show(error.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
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
          placeholder={I18n.t('createByEmailAddress.inputEmail')}
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
          placeholder={I18n.t('createByEmailAddress.inputPassword')}
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
          placeholder={I18n.t('createByEmailAddress.inputPasswordConfirm')}
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
      <View style={styles.checkBoxAccept}>
        <CheckBox
          containerStyle={styles.checkboxs}
          checked={isChecked}
          checkedIcon="check-square"
          uncheckedIcon="square"
          checkedColor="#1c43b8"
          onPress={() => this._handleToggleCheckBox()}
        />
        <TouchableWithoutFeedback
          activeOpacity={0.5}
          onPress={() => this._handleToggleCheckBox()}
        >
          <View
            style={styles.touchIAccept}
          >
            <Text style={styles.textIAccept}>{I18n.t('createByPhoneNumber.iAccept')}</Text>
            <Text style={styles.textTerms}>{I18n.t('createByPhoneNumber.termsAndConditions')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _renderButtonCreate = () => (
    <MangoGradientButton
      btnText={I18n.t('signin.title')}
      btnStyle={styles.btnSigninContainer}
      onPress={() => this._handleClickCreateWallet()}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        {this._renderFormCreateByEmail()}
        {this._renderTermsAndConditions()}
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

  checkboxs: {
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 0,
    width: '50@s',
  },

  textIAccept: {
    color: '#4d4e4e',
    fontSize: '16@s',
    alignItems: 'center',
    alignSelf: 'center',
  },

  checkBoxAccept: {
    flexDirection: 'row',
    marginTop: '15@s',
  },

  textTerms: {
    color: '#6580ce',
    fontSize: '16@s',
    alignItems: 'center',
    alignSelf: 'center',
  },

  touchIAccept: {
    flexDirection: 'row',
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

  btnSigninContainer: {
    width: '220@s',
  },
});
