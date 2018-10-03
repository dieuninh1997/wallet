import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';
import Consts from '../../utils/Consts';
import I18n from '../../i18n/i18n';

export default class AddPinScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    codePin: null,
    isShowChangePin: false,
    isShowError: false,
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
      this.setState({ isShowChangePin: true });
    } else {
      this.setState({ isShowError: true });
    }
    setTimeout(() => this.setState({ isShowError: false }), 1000);
  }

  _renderChangePin = () => (
    <PINCode
      status="choose"
      passwordLength={4}
      storePin={value => this._saveCodePin(value)}
      timeLocked={10000}
    />
  )

  _renderCheckPinCode() {
    const { isShowError } = this.state;

    return (
      <PINCode
        status="enter"
        passwordLength={4}
        pinStatus={isShowError ? 'failure' : 'initial'}
        timeLocked={10000}
        handleResultEnterPin={value => this._checkCodePin(value)}
        touchIDDisabled
      />
    );
  }

  async _saveCodePin(codePin) {
    try {
      const { navigation } = this.props;

      await AppPreferences.saveCodePin(codePin);
      AppPreferences.showToastMessage(I18n.t('addPinScreen.createPinSuccess'));
      setTimeout(() => {
        navigation.navigate('MainScreen');
      }, 1000);
    } catch (err) {
      console.log('SaveCodePin._error:', err);
    }
  }

  render() {
    const { codePin, isShowChangePin } = this.state;
    return (
      <View style={styles.container}>
        {codePin && !isShowChangePin ? this._renderCheckPinCode() : null}
        {!codePin || isShowChangePin ? this._renderChangePin() : null}
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
