import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

class GlobalButton extends Component {
  render() {
    const {
      title, btnStyle, btnTextStyle, onPressBtn,
    } = this.props;
    return (
      <TouchableOpacity
        style={btnStyle}
        onPress={onPressBtn}
      >
        <Text style={btnTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

export default GlobalButton;
