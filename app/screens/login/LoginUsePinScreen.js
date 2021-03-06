import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
import TouchID from 'react-native-touch-id';
import SplashScreen from 'react-native-splash-screen';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { CommonSize, CommonStyles } from '../../utils/CommonStyles';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';

export default class LoginUsePinScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params && params.navigateScreen) {
      return {
        headerLeft: <MangoBackButton navigation={navigation} />,
        title: I18n.t('loginUserPin.enterPincode'),
        headerTitleStyle: CommonStyles.headerTitle,
        headerStyle: CommonStyles.header,
        headerRight: <View />,
      };
    }
    return {
      headerLeft: <View />,
      headerStyle: styles.header,
    };
  };

  state = {
    codePin: null,
    isShowError: false,
  };

  isRootScreen() {
    return true;
  }

  async componentDidMount() {
    SplashScreen.hide();
    const isEnableTouchId = await AsyncStorage.getItem('isEnableTouchId');

    await hasUserSetPinCode();
    await this._getCodePin();
    if (isEnableTouchId === 'true') {
      this._renderLoginByTouchId();
    }
  }

  _checkValuePin(value) {
    const { codePin } = this.state;
    const { navigation } = this.props;
    if (codePin === value) {
      const { params } = navigation.state;
      if (params && params.navigateScreen) {
        const { navigateScreen } = params;
        return navigateScreen(navigation);
      }

      navigation.replace('MainScreen');
      return;
    }
    this.setState({ isShowError: true });
    UIUtils.showToastMessage(I18n.t('loginUserPin.errorCodePin'), 'error');

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
      color: '#e00606',
      cancelText: 'Cancel', // Android
      // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: true,
    };

    TouchID.authenticate(I18n.t('loginUserPin.touchID'), optionalConfigObject)
      .then(() => {
        const { params } = navigation.state;
        if (params && params.navigateScreen) {
          const { navigateScreen } = params;
          return navigateScreen(navigation);
        }

        navigation.replace('MainScreen');
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === 'LOCKOUT') {
          UIUtils.showToastMessage(I18n.t('loginUserPin.touchIdDisabled'), 'warning');
          return;
        }
        if (error.code === 'USER_CANCELED') {
          return;
        }
        this._renderLoginByTouchId();
      });
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
    borderBottomColor: '#fcd800',
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
