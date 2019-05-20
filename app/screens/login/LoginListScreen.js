import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, Keyboard,
} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize } from '../../utils/CommonStyles';
import UIUtils from '../../utils/UIUtils';
import Consts from '../../utils/Consts';
import { login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';

export default class LoginListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('loginListScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (
      <TouchableOpacity
        style={styles.viewRedirectSignin}
        onPress={() => { navigation.navigate('CreateWalletScreen'); }}
      >
        <View>
          <Text style={styles.textBtnRedirectSignin}>{I18n.t('loginListScreen.createWallet')}</Text>
        </View>
      </TouchableOpacity>
    ),
  })

  static SCREEN = {
    SIGNIN_BY_PHONE: 'phone',
    SIGNIN_BY_EMAIL: 'email',
    SIGNIN_BY_PASSPORT: 'passport',
  }

  _handleClickLogin = (screen) => {
    const { navigation } = this.props;
    navigation.navigate('LoginBaseScreen', { screen });
  }

  _handleLoginByFacebook = async () => {
    const { navigation } = this.props;

    try {
      await LoginManager.logOut();
      const loginInfoFacebook = await LoginManager.logInWithReadPermissions(Consts.FACEBOOK_LOGIN_PERMISSIONS);

      if (loginInfoFacebook.isCancelled) {
        return;
      }

      const accessTokenRaw = await AccessToken.getCurrentAccessToken();
      const { accessToken } = accessTokenRaw;
      const responseUser = await login('', '', '', 3, accessToken);

      AppPreferences.saveToKeychain({
        access_token: responseUser.access_token,
      });

      // window.GlobalSocket.connect();
      Keyboard.dismiss();

      const loginInfo = {
        email: '',
        password: '',
        loginType: 3,
        accessToken,
      };
      navigation.navigate('RestoreWalletScreen', { loginInfo });
    } catch (errors) {
      if (errors.error === 'invalid_otp') {
        navigation.navigate('GoogleOtpVerifyScreen', { email, password });
        return;
      }
      if (errors.errors) {
        UIUtils.showToastMessage(errors.errors[Object.keys(errors.errors)[0]], 'error');
      } else {
        UIUtils.showToastMessage(errors.message, 'error');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageWalletContainer}>
          <Image style={styles.imageWallet} source={require('../../../assets/wallet-login/graphicLogin.png')} resizeMode="stretch" />
        </View>

        <View style={styles.groupBtnContainer}>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={() => this._handleClickLogin(LoginListScreen.SCREEN.SIGNIN_BY_PHONE)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/phone/phone.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('loginListScreen.phoneNumber')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={() => this._handleClickLogin(LoginListScreen.SCREEN.SIGNIN_BY_EMAIL)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/email/email.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('loginListScreen.emailAddress')}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={() => this._handleClickLogin(LoginListScreen.SCREEN.SIGNIN_BY_PASSPORT)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/passport/passport.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('loginListScreen.passportNumber')}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btnCreateWalletContainer, styles.btnCreateActive]}
            onPress={this._handleLoginByFacebook}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/facebook/facebook.png')} />
            <Text style={styles.textCreateEnable}>
              {I18n.t('loginListScreen.facebook')}
            </Text>
          </TouchableOpacity> */}
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
    width: '80@s',
    height: '100%',
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
    width: '290@s',
    height: '260@s',
  },

  groupBtnContainer: {
    flex: 1,
    justifyContent: 'center',
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
