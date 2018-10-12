import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize} from '../../utils/CommonStyles';
import UIUtils from '../../utils/UIUtils';

export default class CreateWalletScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWallet.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (
      <TouchableOpacity
        style={styles.viewRedirectSignin}
        onPress={() => { navigation.navigate('LoginScreen'); }}
      >
        <View>
          <Text style={styles.textBtnRedirectSignin}>{I18n.t('createWallet.signin')}</Text>
        </View>
      </TouchableOpacity>
    ),
  })

  static SCREEN = {
    CREATE_BY_EMAIL: 'CreateWalletByEmailScreen',
    CREATE_BY_PHONE: 'CreateWalletPhoneNumberScreen',
    CREATE_BY_PASSPORT: 'CreateWalletByPassportScreen',
  }

  _handleClickCreateWallet = (screen) => {
    const { navigation } = this.props;

    navigation.navigate(screen);
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
            style={[styles.btnCreateWalletContainer, styles.btnCreateDisable]}
            // onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_PHONE)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/phone/phone.png')} />
            <Text style={styles.textCreateDisable}>
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
            style={[styles.btnCreateWalletContainer, styles.btnCreateDisable]}
            // onPress={() => this._handleClickCreateWallet(CreateWalletScreen.SCREEN.CREATE_BY_EMAIL)}
          >
            <Image style={styles.iconCreateWallet} source={require('../../../assets/facebook/facebook.png')} />
            <Text style={styles.textCreateDisable}>
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
    fontSize: '20@ms',
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
