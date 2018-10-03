import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native';
import { moderateScale, scale } from '../libs/reactSizeMatter/scalingUtils';

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

  static generateShadowStyle(height = 4) {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: '#A4AECE',
        shadowOpacity: 0.8,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 10,
        zIndex:999
      };
    } else {
      return {
        elevation: height
      };
    }
  }

  static generatePopupShadow() {
    return UIUtils.generateShadowStyle(8);
  }
};
