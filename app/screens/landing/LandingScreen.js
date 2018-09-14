import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoButton from '../common/MangoButton';
import { CommonColors } from '../../utils/CommonStyles';

class LandingScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  _navigateLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('LoginScreen');
  }

  _renderSelectLanguage = () => (
    <View style={styles.selectLanguageContainer}>
      <View style={styles.selectLanguageContent}>
        <Image
          source={require('../../../assets/language/language-blue.png')}
          style={styles.imageSelectLanguage}
        />
        <Text style={styles.textLanguage}>Eng</Text>
        <Image
          source={require('../../../assets/arrow-down/down-arrow-blue.png')}
          style={styles.imageSelectLanguage}
        />
      </View>
    </View>
  )

  _renderLogoGroup() {
    return (
      <View style={styles.logoGroupContainer}>
        <Image source={require('../../../assets/logo/logo.png')} />
        <Text style={styles.logoContent}>{I18n.t('landing.coinName')}</Text>
        <Text style={styles.logoDescription}>{I18n.t('landing.coinDescription')}</Text>
      </View>
    );
  }

  _renderButtonGroup() {
    return (
      <View style={styles.btnGroupContainer}>
        <MangoButton
          title={I18n.t('landing.createWallet')}
          btnStyle={styles.btnCreateWalletContainer}
          btnTextStyle={styles.btnTextCreateWalletStyle}
        />
        <MangoButton
          title={I18n.t('landing.signin')}
          btnStyle={styles.btnAuthContainer}
          btnTextStyle={styles.btnTextAuthStyle}
          onPressBtn={this._navigateLogin}
        />
        <MangoButton
          title={I18n.t('landing.restoreAccount')}
          btnStyle={styles.btnAuthContainer}
          btnTextStyle={styles.btnTextAuthStyle}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        { this._renderSelectLanguage() }
        { this._renderLogoGroup() }
        { this._renderButtonGroup() }
      </View>
    );
  }
}
export default LandingScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFCB38',
  },

  selectLanguageContainer: {
    marginTop: '10@s',
  },

  selectLanguageContent: {
    flexDirection: 'row',
    width: '124@s',
    height: '36@s',
    borderRadius: '18@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  textLanguage: {
    color: '#006AEB',
    fontSize: '18@s',
    marginHorizontal: '8@s',
  },

  imageSelectLanguage: {
    width: '18@s',
    height: '18@s',
  },

  logoGroupContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: '40@s',
  },

  logoContent: {
    color: '#1F42B3',
    fontWeight: 'bold',
    fontSize: '32@s',
  },

  logoDescription: {
    color: '#BAC5E6',
  },

  btnGroupContainer: {
    flex: 3,
    alignItems: 'center',
    paddingTop: '80@s',
  },

  btnCreateWalletContainer: {
    width: '290@s',
    height: '56@s',
    borderRadius: '28@s',
    backgroundColor: CommonColors.headerBarBgColor,
    borderColor: CommonColors.headerTitleColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2@s',
    elevation: 4,
  },

  btnTextCreateWalletStyle: {
    color: '#1F42B3',
    fontSize: '20@s',
  },

  btnAuthContainer: {
    width: '210@s',
    height: '36@s',
    borderRadius: '20@s',
    backgroundColor: '#DBA92F',
    borderColor: CommonColors.headerTitleColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20@s',
  },

  btnTextAuthStyle: {
    color: CommonColors.headerBarBgColor,
    fontSize: '18@s',
  },
});
