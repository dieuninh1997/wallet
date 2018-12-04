import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Fonts } from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';

export default class MangoConnectionLost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.lottieViewContainer}>
          <LottieView
            source={require('../../../assets/connection-lost-animation/material_wave_loading.json')}
            autoPlay
            loop
          />
        </View>
        <View>
          <Text style={styles.titleMessage}>
            {I18n.t('mangoConnectionLost.titleMessage')}
          </Text>
          <Text style={styles.contentMessage}>
            {I18n.t('mangoConnectionLost.contentMessageFirst')}
          </Text>
          <Text style={styles.contentMessage}>
            {I18n.t('mangoConnectionLost.contentMessageSecond')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    paddingTop: '75@s',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingHorizontal: '10@s',
  },
  lottieViewContainer: {
    width: '150@s',
    height: '150@s',
  },
  titleMessage: {
    ...Fonts.Ubuntu_Regular,
    fontSize: '22@ms',
    textAlign: 'center',
    color: '#000',
    marginVertical: '10@s',
  },
  contentMessage: {
    ...Fonts.Ubuntu_Light,
    fontSize: '16@ms',
    textAlign: 'center',
    color: '#000',
    marginVertical: '3@s',
  },
});
