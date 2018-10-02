import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-root-toast';
import RNRestart from 'react-native-restart';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';
import Consts from '../../utils/Consts';

export default class AddPinScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    codePin: null,
    isShowChanePin: false,
  };

  async componentDidMount() {
    await this._getCodePin();
  }

  _getCodePin = async () => {
    try {
      const responsePin = await AppPreferences.getGeneric();
      const codePin = responsePin.password.includes(Consts.PIN) ? JSON.parse(responsePin.password).pin : null;

      this.setState({ codePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }


  _checkCodePin = (value) => {
    const { codePin } = this.state;

    if (codePin === value) {
      this.setState({ isShowChanePin: true });
    }
  }

  _successInputCodePin = () => {
    const { navigation } = this.props;
    navigation.navigate('LandingScreen');
  }

  _renderChangePin = () => (
    <PINCode
      titleConfirmFailed="Confirm Pin Code"
      status="choose"
      storePin={value => this._saveCodePin(value)}
      timeLocked={10000}
    />
  )

  _renderCheckPinCode() {
    return (
      <PINCode
        status="enter"
        timeLocked={10000}
        handleResultEnterPin={value => this._checkCodePin(value)}
      />
    );
  }

  async _saveCodePin(codePin) {
    try {
      await AppPreferences.saveCodePin(codePin);

      RNRestart.Restart();
    } catch (err) {
      console.log('SaveCodePin._error:', err);
    }
  }

  render() {
    const { codePin, isShowChanePin } = this.state;
    return (
      <View style={styles.container}>
        {codePin && !isShowChanePin ? this._renderCheckPinCode() : null}
        {!codePin || isShowChanePin ? this._renderChangePin() : null}
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
