import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
// import CreateWalletScreen from '../createwallet/CreateWalletScreen';
import MangoButton from '../common/MangoButton';

class LandingScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  _navigateLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('LoginScreen');
  }

  _navigateCreate = () => {
    const { navigation } = this.props;
    navigation.navigate('CreateWalletScreen');
  }

  _renderSelectLanguage = () => (
    <View style={styles.selectLanguageContainer}>
      <View style={styles.selectLanguageContent}>
        <MaterialCommunityIcons
          style={styles.dropdownIcon}
          name="google-translate"
        />
        <Text style={styles.textLanguage}>Eng</Text>
        <MaterialCommunityIcons
          style={styles.dropdownIcon}
          name="chevron-down"
        />
      </View>
    </View>
  )

  _renderSelectLanguage() {
    return (
      <View style={styles.selectLanguageContainer}>
        <View style={styles.selectLanguageContent}>
          <MaterialCommunityIcons
            style={styles.dropdownIcon}
            name="google-translate"
          />
          <Text style={styles.textLanguage}>Eng</Text>
          <MaterialCommunityIcons
            style={styles.dropdownIcon}
            name="chevron-down"
          />
        </View>
      </View>
    );
  }

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
          onPressBtn={this._navigateCreate}
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
    flex: 1,
    marginTop: '10@s',
  },

  selectLanguageContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120@s',
    height: '40@s',
    borderRadius: '20@s',
    borderColor: '#C9D1EA',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },

  textLanguage: {
    color: '#6EBFFA',
    fontSize: '18@s',
    marginHorizontal: '5@s',
  },

  dropdownIcon: {
    color: '#6EBFFA',
    fontSize: '22@s',
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
    backgroundColor: '#FFF',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '28@s',
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
    backgroundColor: '#DBA92F',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@s',
    marginTop: '20@s',
  },

  btnTextAuthStyle: {
    color: '#FFF',
    fontSize: '18@s',
  },
});
