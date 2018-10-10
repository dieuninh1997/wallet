import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';
import { moderateScale, scale } from '../libs/reactSizeMatter/scalingUtils';
import { CommonColors, CommonStyles, Fonts } from './CommonStyles';

export default class UIUtils {

  static isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 || dimen.width === 812)
    );
  }

  static getStatusBarHeight() {
    if (Platform.OS === 'ios') {
      return UIUtils.isIphoneX() ? scale(44) : scale(20);
    }

    return StatusBar.currentHeight;
  }

  static getBottomInsetHeight() {
    if (Platform.OS === 'ios') {
      return UIUtils.isIphoneX() ? scale(17) : 0;
    }
    return 0;
  }

  static getIphoneXBottomInsetHeight() {
    return scale(17);
  }

  static generateShadowStyle(height = 4) {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: '#0530b0',
        shadowOpacity: 0.4,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        zIndex: 999,
      };
    }
    return {
      elevation: height,
    };
  }

  static generatePopupShadow() {
    return UIUtils.generateShadowStyle(8);
  }

  static createBottomPadding() {
    return (<View style={{ width: 0, height: scale(90) }} />);
  }

  static showToastMessage(message) {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  static validateEmail(email) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  }
}
