import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

class MangoMenuButton extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.btnContainer}>
          <MaterialCommunityIcons
            name="menu"
            style={styles.btnIcon}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
export default MangoMenuButton;

const styles = ScaledSheet.create({
  btnContainer: {
    width: '50@s',
    height: '50@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    fontSize: '24@s',
    color: '#000',
  },
});
