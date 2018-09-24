import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { initApp } from '../../App';
import { CommonColors } from '../utils/CommonStyles';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import I18n from '../i18n/i18n';

export default class SplashScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  async componentWillMount() {
    await this._initMangoApp();
  }

  async _initMangoApp() {
    const { navigation } = this.props;
    await initApp();
    navigation.navigate('LandingScreen');
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
