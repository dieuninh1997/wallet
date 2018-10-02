import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';


export default class LoginUsePinScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    codePin: null,
    isShowError: false,
  };

  async componentDidMount() {
    await hasUserSetPinCode();
    await this._getCodePin();
  }

  _checkValuePin(value) {
    const { codePin } = this.state;
    const { navigation } = this.props;

    if (codePin === value) {
      navigation.navigate('MainScreen');
    } else {
      this.setState({ isShowError: true });
      AppPreferences.showToastMessage('Error Code Pin!');
    }
    setTimeout(() => this.setState({ isShowError: false }), 1000);
  }

  async _getCodePin() {
    try {
      const responsePin = await AppPreferences.getGeneric();
      const codePin = JSON.parse(responsePin.password).pin;

      this.setState({ codePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }


  render() {
    const { isShowError } = this.state;

    return (
      <View style={styles.container}>
        <PINCode
          status="enter"
          passwordLength={6}
          pinStatus={isShowError ? 'failure' : 'initial'}
          storePin={(value) => { console.log('ma pin:', value); }}
          handleResultEnterPin={value => this._checkValuePin(value)}
          timeLocked={10000}
          touchIDDisabled
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
