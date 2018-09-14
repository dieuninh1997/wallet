import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

class MangoBackButton extends Component {
  _onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._onBack()}
      >
        <View style={styles.btnContainer}>
          <View style={styles.container}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={styles.btnIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default MangoBackButton;

const styles = ScaledSheet.create({
  btnContainer: {
    width: '50@s',
    height: '50@s',
    justifyContent: 'center',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '24@s',
    height: '24@s',
    borderWidth: '1@s',
    borderColor: '#7E8389',
    borderRadius: '12@s',
    marginLeft: '14@s',
  },

  btnIcon: {
    fontSize: '16@s',
  },
});
