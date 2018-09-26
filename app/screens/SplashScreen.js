import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { initApp } from '../../App';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import I18n from '../i18n/i18n';
import AppConfig from '../utils/AppConfig';
import AppPreferences from '../utils/AppPreferences';
import Consts from '../utils/Consts';

export default class SplashScreen extends Component {
  state = {
    isCodePin: false,
  };

  static navigationOptions = () => ({
    header: null,
  })

  async componentWillMount() {
    await this._checkStatusPin();
    await this._initMangoApp();
  }

  async _checkStatusPin() {
    try {
      const checkCodePin = await AppPreferences.getGeneric();
      const isCodePin = checkCodePin && checkCodePin.password.includes(Consts.PIN);

      this.setState({ isCodePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }

  async _initMangoApp() {
    const { navigation } = this.props;
    const { isCodePin } = this.state;

    await initApp();

    if (AppConfig.ACCESS_TOKEN) {
      if (isCodePin) {
        navigation.navigate('LoginUsePinScreen');
        return;
      }

      navigation.navigate('MainScreen');
    } else {
      navigation.navigate('LandingScreen');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo/logo.png')} />
        <Text style={styles.logoContent}>{I18n.t('landing.coinName')}</Text>
        <Text style={styles.logoDescription}>{I18n.t('landing.coinDescription')}</Text>
      </View>
    );
  }
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCB38',
  },
  logoContent: {
    color: '#1F42B3',
    fontWeight: 'bold',
    fontSize: '32@s',
  },
  logoDescription: {
    color: '#BAC5E6',
  },
});
