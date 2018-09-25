import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import * as Keychain from 'react-native-keychain';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';


export default class LoginUsePinScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

   _SuccessInputCodePin = () => {
     const { navigation } = this.props;
     navigation.navigate('LandingScreen');
   }


   render() {
     return (
       <View style={styles.container}>
         <PINCode
           titleConfirmFailed="sai cmnr"
           status="enter"
           timeLocked={10000}
           finishProcess={() => this._SuccessInputCodePin()}
         />
       </View>
     );
   }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
