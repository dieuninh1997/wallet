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
    width: '26@s',
    height: '26@s',
    borderWidth: '2@s',
    borderColor: '#000000',
    borderRadius: '13@s',
    marginLeft: '14@s',
  },

  btnIcon: {
    fontSize: '20@s',
    color: '#000000',
  },
});
