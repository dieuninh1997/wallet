import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { initApp } from '../../App';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import I18n from '../i18n/i18n';
import AppConfig from '../utils/AppConfig';
import AppPreferences from '../utils/AppPreferences';
import Consts from '../utils/Consts';
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
    const { isEnableCodePin } = this.state;

    await initApp();

    try {
      if (AppConfig.ACCESS_TOKEN && AppConfig.PRIVATE_KEY) {
        if (isEnableCodePin) {
          // this.navigateAndClearStack('MainScreen');
          this.navigateAndClearStack('LoginUsePinScreen');
        } else {
          this.navigateAndClearStack('MainScreen');
        }
      } else {
        this.navigateAndClearStack('LandingScreen');
      }
    } catch (error) {
      console.log('SplashScreen._initMangoApp._error: ', error);
    }
  }

  _renderLogoGroup = () => (
    <View style={styles.logoGroupContainer}>
      <Image source={require('../../assets/logo/logoMangocoinNotxt.png')} style={styles.logoImage} />
      <Text style={styles.logoContent}>{I18n.t('landing.coinName')}</Text>
    </View>
  )

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          { this._renderLogoGroup() }
        </View>
        <ImageBackground
          source={require('../../assets/background/bg1.png')}
          style={{ flex: 1, height: undefined, width: '100%' }}
          resizeMode="stretch"
        />
      </SafeAreaView>
    );
  }
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },

  logoGroupContainer: {
    alignItems: 'center',
    marginTop: '40@s',
  },

  logoImage: {
    width: '140@s',
    height: '140@s',
  },

  logoContent: {
    color: '#2f64d1',
    fontWeight: 'bold',
    fontSize: '32@ms',
  },

  logoDescription: {
    color: '#BAC5E6',
  },
});
