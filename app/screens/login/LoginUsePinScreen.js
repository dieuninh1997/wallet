import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import TouchID from 'react-native-touch-id';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { CommonSize } from '../../utils/CommonStyles';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import I18n from '../../i18n/i18n';

export default class LoginUsePinScreen extends Component {
  static navigationOptions = () => ({
    headerLeft: <View />,
    headerStyle: styles.header,
  });

  state = {
    codePin: null,
    isShowError: false,
    isEnableTouchId: false,
  };

  async componentDidMount() {
    const isEnableTouchId = await AsyncStorage.getItem('isEnableTouchId');
    console.log('isEnableTouchId', isEnableTouchId);

    this.setState({
      isEnableTouchId: isEnableTouchId === 'true',
    });

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
      UIUtils.showToastMessage('Error Code Pin!');
    }
    setTimeout(() => this.setState({ isShowError: false }), 1000);
  }

  async _getCodePin() {
    try {
      const responsePin = await AppPreferences.getGeneric();
      console.log('responsePin', responsePin);

      const codePin = JSON.parse(responsePin.password).pin;

      this.setState({ codePin });
    } catch (err) {
      console.log('CheckStatusPin._error:', err);
    }
  }

  _renderLoginByTouchId = () => {
    const { navigation } = this.props;

    const optionalConfigObject = {
      title: 'Login by Touch ID',
      color: '#e00606',
      sensorDescription: I18n.t('loginUserPin.touchID'), // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
    };

    TouchID.authenticate(I18n.t('loginUserPin.touchID'), optionalConfigObject)
      .then(() => {
        navigation.navigate('MainScreen');
      })
      .catch((error) => {
        console.log('error', error);
        if (error.details === 'cancelled') {
          this.setState({ isEnableTouchId: false });
        }
      });
  }

  render() {
    const { isShowError, isEnableTouchId } = this.state;

    return (
      <View style={styles.container}>
        {isEnableTouchId ? this._renderLoginByTouchId() : null}
        <PINCode
          status="enter"
          passwordLength={6}
          pinStatus={isShowError ? 'failure' : 'initial'}
          storePin={(value) => { console.log('ma pin:', value); }}
          handleResultEnterPin={value => this._checkValuePin(value)}
          timeLocked={10000}
          numbersButtonOverlayColor="#fcd800"
          stylePinCodeButtonNumber="#000"
          stylePinCodeHiddenPasswordSizeEmpty={scale(20)}
          stylePinCodeHiddenPasswordSizeFull={scale(20)}
          titleEnter={I18n.t('loginUserPin.enterPincode')}
          titleAttemptFailed={I18n.t('loginUserPin.incorrectPincode')}
          subtitleError={I18n.t('loginUserPin.pleaseAgain')}
          stylePinCodeTextTitle={styles.pincodeTitle}
          stylePinCodeColorTitle="#26304c"
          stylePinCodeDeleteButtonColorHideUnderlay="#000"
          touchIDDisabled
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  header: {
    backgroundColor: '#fcd800',
    height: CommonSize.headerHeight,
    elevation: 0,
    borderBottomColor: '#E7E7E9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  pincodeTitle: {
    fontSize: '16@ms',
    textAlign: 'center',
  },
});
