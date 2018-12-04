import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { Fonts } from '../../utils/CommonStyles';

class MangoGradientButton extends Component {
  render() {
    const {
      btnText, btnStyle, onPress, colorOptions, buttonTextStyle,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={colorOptions}
          style={[styles.container, btnStyle]}
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>{btnText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

MangoGradientButton.defaultProps = {
  colorOptions: ['#FFDD3B', '#FFCF38', '#FFC136'],
};

export default MangoGradientButton;


const styles = ScaledSheet.create({
  container: {
    height: '50@s',
    borderRadius: '28@s',
    backgroundColor: 'transparent',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: '#000',
    fontSize: '20@ms',
    ...Fonts.Ubuntu_Regular,
  },
});
