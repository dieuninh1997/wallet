import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
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
    isShowError: false,
  };

  async componentDidMount() {
    await this._getCodePin();
  }

  async _getCodePin() {
    try {
      const responsePin = await AppPreferences.getGeneric();
      const codePin = responsePin.password.includes(Consts.PIN) ? JSON.parse(responsePin.password).pin : null;

      this.setState({ codePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }


  _checkCodePin(value) {
    const { codePin } = this.state;

    if (codePin === value) {
      this.setState({ isShowChanePin: true });
    } else {
      this.setState({isShowError: true});
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
        pinStatus={this.state.isShowError ? "failure" : "initial"}
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
    const { codePin, isShowChanePin, isShowError } = this.state;
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
