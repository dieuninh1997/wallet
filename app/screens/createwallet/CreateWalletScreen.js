import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, AsyncStorage,
} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import CryptoJS from 'crypto-js';

import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize } from '../../utils/CommonStyles';
import UIUtils from '../../utils/UIUtils';
import Consts from '../../utils/Consts';
import { register } from '../../api/user/UserRequest';
import AppConfig from '../../utils/AppConfig';
import AppPreferences from '../../utils/AppPreferences';

export default class CreateWalletScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWallet.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (
      <TouchableOpacity
        style={styles.viewRedirectSignin}
        onPress={() => { navigation.navigate('LoginListScreen'); }}
      >
        <View>
          <Text style={styles.textBtnRedirectSignin}>{I18n.t('createWallet.signin')}</Text>
        </View>
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props);

    this.walletInfo = null;
  }

  static SCREEN = {
    CREATE_BY_EMAIL: 'CreateWalletByEmailScreen',
    CREATE_BY_PHONE: 'CreateWalletPhoneNumberScreen',
    CREATE_BY_PASSPORT: 'CreateWalletByPassportScreen',
  }

  componentDidMount = async () => {
    await this._generateWallet();
  }

  _generateWallet = () => new Promise((resolve, reject) => {
    try {
      nodejs.start('main.js');
      nodejs.channel.addListener(
        'message',
        (message) => {
          console.log(`Wallet created: ${message}`);
          this.walletInfo = JSON.parse(message);
          resolve(JSON.parse(message));
        },
      );
      nodejs.channel.send(JSON.stringify({ action: 'generateWallet', data: '' }));
    } catch (error) {
      console.log('CreateByEmailScreen._generateWallet: ', error);
      reject(error);
    }
  })

  _handleClickCreateWallet = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
  }

  _handleClickCreateWalletByFacebook = async () => {
    if (!this.walletInfo) {
      return;
    }
    const { navigation } = this.props;

    try {
      await LoginManager.logOut();
      const loginInfoFace = await LoginManager.logInWithReadPermissions(Consts.FACEBOOK_LOGIN_PERMISSIONS);

      if (loginInfoFace.isCancelled) {
        return;
      }

      const accessTokenFacebook = await AccessToken.getCurrentAccessToken();

      const { privateKey, address, mnemonic } = this.walletInfo;

      const mnemonicHash = CryptoJS.SHA256(mnemonic).toString();

      const registerInfo = {
        mnemonic: mnemonicHash,
        login_type: Consts.LOGIN_TYPES.FACEBOOK,
        eth_address: address,
        facebook_access_token: accessTokenFacebook.accessToken,
      };

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

      await AsyncStorage.setItem('address', address);

      UIUtils.showToastMessage(I18n.t('createWalletByEmailScreen.createWaletSuccess'), 'success');
      navigation.navigate('BackupPassphraseScreenCompact');
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]][0], 'error');
      } else {
        UIUtils.showToastMessage(error.message, 'error');
      }
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageWalletContainer}>
          <Image style={styles.imageWallet} source={require('../../../assets/wallet-create/graphicWallet.png')} resizeMode="stretch" />
        </View>

        <View style={styles.groupBtnContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            disabled
            style={[styles.btnCreateWalletContainer, styles.btnCreateDisable]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_PHONE)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/createwalet/phone.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('createWallet.phoneNumber')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_EMAIL)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/email/email.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('createWallet.emailAddress')}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_PASSPORT)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/passport/passport.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('createWallet.passportNumber')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={() => this._handleClickCreateWalletByFacebook()}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/facebook/facebook.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('createWallet.facebook')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },

  btnRedirectSignin: {
    marginRight: '19@s',
  },

  viewRedirectSignin: {
    flexDirection: 'row',
    height: '100%',
    marginRight: '5@s',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtnRedirectSignin: {
    fontSize: CommonSize.headerFontSize,
    color: '#8d96b1',
    ...Fonts.Ubuntu_Regular,
  },

  imageWalletContainer: {
    flex: 1,
    alignItems: 'center',
  },

  imageWallet: {
    width: '300@s',
    height: '274@s',
  },

  groupBtnContainer: {
    flex: 1,
  },

  btnCreateWalletContainer: {
    flexDirection: 'row',
    marginBottom: '16@s',
    marginHorizontal: '40@s',
    alignItems: 'center',
  },

  btnCreateActive: {
    height: '56@s',
    borderRadius: '29@s',
    backgroundColor: '#FFFFFF',
    ...UIUtils.generateShadowStyle(),
  },

  btnCreateDisable: {
    height: '48@s',
    borderRadius: '29@s',
    backgroundColor: '#e6ebf2',
  },

  iconCreateWallet: {
    width: '32@s',
    height: '32@s',
    marginLeft: '25@s',
  },

  textCreateEnable: {
    fontSize: '19@ms',
    marginLeft: '15@s',
    color: '#2f64d1',
    ...Fonts.Ubuntu_Regular,
  },

  textCreateDisable: {
    fontSize: '18@ms',
    marginLeft: '15@s',
    color: '#2f64d1',
    ...Fonts.Ubuntu_Light,
  },
});
