import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

class MangoButton extends Component {
  render() {
    const {
      title, btnStyle, btnTextStyle, onPressBtn,
    } = this.props;
    return (
      <TouchableOpacity
        style={btnStyle}
        onPress={onPressBtn}
        activeOpacity={0.6}
      >
        <Text style={btnTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

export default MangoButton;
