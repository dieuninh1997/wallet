import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';
import Toast from "react-native-root-toast";


export default class LoginUsePinScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    codePin: null
  };

  async componentDidMount() {
    await this._getCodePin();
  }

  _checkValuePin(value) {
    const { codePin } = this.state;
    const { navigation } = this.props;

    if(codePin === value) {
      navigation.navigate('MainScreen');
    } else {
      Toast.show('Error Code Pin!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }

  async _getCodePin() {
    try {
      const responsePin = await AppPreferences.getGeneric();
      const codePin = JSON.parse(responsePin.password).pin;

      this.setState({ codePin });
    } catch (err) {
      console.log("CheckStatusPin._error:", err)
    }
  }


   render() {
     return (
       <View style={styles.container}>
         <PINCode
           status="enter"
           storePin={value => {console.log("ma pin:", value)}}
           handleResultEnterPin={(value) => this._checkValuePin(value)}
           timeLocked={10000}
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
