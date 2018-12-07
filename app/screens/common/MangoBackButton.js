import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
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
          {/* <View style={styles.container}> */}
          {/* <MaterialCommunityIcons
              name="chevron-left"
              style={styles.btnIcon}
            /> */}
          <Image
            source={require('../../../assets/arrow-left/left-arrow.png')}
            style={styles.container}
          />
          {/* </View> */}
        </View>
      </TouchableOpacity>
    );
  }
}
export default MangoBackButton;

const styles = ScaledSheet.create({
  btnContainer: {
    width: '80@s',
    height: '100%',
    justifyContent: 'center',
  },

  container: {
    width: '28@s',
    height: '28@s',
    marginLeft: '10@s',
  },

  btnIcon: {
    fontSize: '20@s',
    color: '#000000',
  },
});
