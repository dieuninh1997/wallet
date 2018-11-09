import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import CryptoJS from 'crypto-js';
import nodejs from 'nodejs-mobile-react-native';

import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, CommonColors, Fonts } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import MangoGradientButton from '../common/MangoGradientButton';
import AppConfig from '../../utils/AppConfig';
import { restoreAccount } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import MangoLoading from '../common/MangoLoading';

class RestoreWalletScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('restoreWalletScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  static RESTORE_INFO = {
    MNEMONIC: 'mnemonic',
  };

  constructor(props) {
    super(props);

    this.state = {
      restoreInfo: {
        mnemonic: null,
      },
      isLoading: false,
      errorTextInput: false,
    };
  }

  _generateWallet = mnemonic => new Promise((resolve, reject) => {
    try {
      nodejs.start('main.js');
      nodejs.channel.addListener(
        'message',
        (message) => {
          console.log(`Wallet imported: ${message}`);
          // this.walletInfo = ;
          resolve(JSON.parse(message));
        },
      );
      nodejs.channel.send(mnemonic);
    } catch (error) {
      console.log('RestoreWalletScreen._generateWallet: ', error);
      reject(error);
    }
  })

  checkMnemonicInput = (value) => {
    const re = /^[A-Z]*$/;
    return re.test(value);
  }

  _handleChangeInput = (typeInput, value) => {
    const { restoreInfo } = this.state;
    const errorTextInput = (value && (this.checkMnemonicInput(value.substring(0, 1))));

    restoreInfo[typeInput] = value;
    this.setState({
      restoreInfo,
      errorTextInput,
    });
  }

  _validateMnemonic = (mnemonic) => {
    if (!mnemonic) {
      UIUtils.showToastMessage(I18n.t('restoreWalletScreen.mnemonicRequired'), 'error');
      return false;
    }

    const words = mnemonic.split(' ');
    if (words.length !== 12) {
      UIUtils.showToastMessage(I18n.t('restoreWalletScreen.invalidMnemonic'), 'error');
      return false;
    }

    return true;
  }

  _handleClickRestore = async () => {
    const { restoreInfo } = this.state;
    const { navigation } = this.props;
    const { mnemonic } = restoreInfo;

    if (!this._validateMnemonic(mnemonic)) {
      return;
    }
    try {
      const { params } = navigation.state;

      this.setState({
        isLoading: true,
      });

      const mnemonicHash = CryptoJS.SHA256(mnemonic).toString();

      const [wallet, restoreAccountInfo] = await Promise.all([
        this._generateWallet(JSON.stringify({ action: 'importWalletFromMnemonic', data: mnemonic })),
        restoreAccount(mnemonicHash, params && params.loginInfo ? params.loginInfo : {}),
      ]);

      await AppPreferences.saveToKeychain({
        access_token: restoreAccountInfo.data.accessToken,
        private_key: wallet.privateKey,
        mnemonic,
      });

      AppConfig.PRIVATE_KEY = wallet.privateKey;
      AppConfig.MNEMONIC = mnemonic;
      AppConfig.ACCESS_TOKEN = restoreAccountInfo.data.accessToken;

      // window.GlobalSocket.connect();
      Keyboard.dismiss();

      await AsyncStorage.setItem('address', wallet.address);

      this.setState({
        isLoading: false,
      });

      navigation.navigate('AddPinScreen');
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      console.log('restoreWalletScreen.errors: ', error);
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]][0], 'error');
      } else {
        UIUtils.showToastMessage(I18n.t(`restoreWalletScreen.errors.${error.message}`), 'error');
      }
    }
  }

  _renderFormRestore() {
    const { errorTextInput } = this.state;

    return (
      <View style={styles.restoreWalletContainer}>
        <Text style={styles.textRestoreWallet}>{I18n.t('restoreWalletScreen.titleForm')}</Text>
        <View style={styles.inputRestoreWalletContainer}>
          <TextInput
            placeholder={I18n.t('restoreWalletScreen.inputPlaceholder')}
            editable
            underlineColorAndroid="transparent"
            style={styles.inputWallet}
            onChangeText={value => this._handleChangeInput(RestoreWalletScreen.RESTORE_INFO.MNEMONIC, value)}
          />
        </View>
        {errorTextInput ? <Text style={styles.textErrorInput}>{I18n.t('restoreWalletScreen.errors.textInput')}</Text> : null}
      </View>
    );
  }

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? <MangoLoading /> : null}

        <ScrollView>
          {this._renderFormRestore()}
        </ScrollView>

        <MangoGradientButton
          btnText={I18n.t('restoreWalletScreen.title')}
          btnStyle={styles.btnRestoreWaletContainer}
          onPress={() => this._handleClickRestore()}
        />
      </View>
    );
  }
}

export default RestoreWalletScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.screenBgColor,
    alignItems: 'center',
  },

  restoreWalletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textRestoreWallet: {
    marginVertical: '30@s',
    marginHorizontal: '15@s',
    textAlign: 'center',
    fontSize: '16@ms',
    color: '#000',
    ...Fonts.Ubuntu_Light,
  },

  inputRestoreWalletContainer: {
    flexDirection: 'row',
    width: '338@s',
    height: '56@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: '28@s',
    paddingHorizontal: '20@s',
    borderColor: '#cad1db',
    borderWidth: '1@s',
  },

  inputWallet: {
    width: '330@s',
    fontSize: '18@ms',
    textAlign: 'center',
    ...Fonts.Ubuntu_Light,
  },

  btnRestoreWaletContainer: {
    width: '247@s',
    height: '48@s',
    marginBottom: '20@s',
    marginHorizontal: '5@s',
  },
  textErrorInput: {
    color: '#f44030',
    textAlign: 'center',
    fontSize: '16@ms',
    margin: '15@s',
    ...Fonts.Ubuntu_Light,
  },
});
