import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import * as Keychain from 'react-native-keychain';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';
import Toast from "react-native-root-toast";

export default class AddPinScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    codePin: null
  };

  async componentDidMount() {
    await this._getCodePin();
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

  _successInputCodePin = () => {
    const { navigation } = this.props;
    navigation.navigate('LandingScreen');
  }

  async _saveCodePin(codePin) {
    try {
      await AppPreferences.saveCodePin(codePin);
    } catch (err) {
      console.log("SaveCodePin._error:", err);
    }
  }

  render() {
    const { codePin } = this.state;
    return (
      <View style={styles.container}>
        <PINCode
          titleConfirmFailed="Confirm Pin Code"
          status={`${codePin ? 'enter' : 'choose'}`}
          storePin={value => this._saveCodePin(value)}
          timeLocked={10000}
          finishProcess={() => this._successInputCodePin()}
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
