import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

class MangoGradientButton extends Component {
  render() {
    const {
      btnText, btnStyle, onPress,
    } = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['#FFDD3B', '#FFCF38', '#FFC136']}
            style={[styles.container, btnStyle]}
          >
            <Text style={styles.buttonText}>{btnText}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MangoGradientButton;

const styles = ScaledSheet.create({
  container: {
    height: '50@s',
    borderRadius: '25@s',
    backgroundColor: 'transparent',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24@s',
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontWeight: '400',
    fontSize: '22@s',
  },
});