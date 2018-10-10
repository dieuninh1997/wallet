import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
} from 'react-native';
import { initApp } from '../../App';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import I18n from '../i18n/i18n';
import AppConfig from '../utils/AppConfig';
import AppPreferences from '../utils/AppPreferences';
import Consts from '../utils/Consts';
import { getUserSecuritySettings } from '../api/user/UserRequest';
import BaseScreen from './BaseScreen';

export default class SplashScreen extends BaseScreen {
  static navigationOptions = () => ({
    header: null,
  })

  constructor(props) {
    super(props);
    this.state = {
      isEnableCodePin: false,
    };
  }

  async componentWillMount() {
    await this._checkStatusPin();
    await this._initMangoApp();
  }

  _checkStatusPin = async () => {
    try {
      const checkCodePin = await AppPreferences.getGeneric();
      const isEnableCodePin = checkCodePin && checkCodePin.password.includes(Consts.PIN);

      this.setState({ isEnableCodePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }

  async _initMangoApp() {
    const { navigation } = this.props;
    const { isEnableCodePin } = this.state;

    await initApp();

    try {
      if (AppConfig.ACCESS_TOKEN && AppConfig.PRIVATE_KEY) {
        if (isEnableCodePin) {
          this.navigateAndClearStack('SettingScreen');
          return;
        }
        this.navigateAndClearStack('LoginScreen');
      } else {
        this.navigateAndClearStack('LandingScreen');
      }
    } catch (error) {
      console.log('SplashScreen._initMangoApp._error: ', error);
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
