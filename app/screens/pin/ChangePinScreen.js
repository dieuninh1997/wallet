import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import MangoBackButton from '../common/MangoBackButton';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import I18n from '../../i18n/i18n';
import { CommonStyles } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import Consts from '../../utils/Consts';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

export default class ChangePinScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('ChangePinScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
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
    <View style={styles.container}>
      <View style={styles.containerPassword} />
      <PINCode
        status="choose"
        passwordLength={6}
        storePin={value => this._saveCodePin(value)}
        timeLocked={10000}
        numbersButtonOverlayColor="#fcd800"
        stylePinCodeButtonNumber="#000"
        stylePinCodeHiddenPasswordSizeEmpty={scale(20)}
        stylePinCodeHiddenPasswordSizeFull={scale(20)}
        titleChoose={I18n.t('ChangePinScreen.newPin')}
        titleConfirm={I18n.t('ChangePinScreen.confirmNewPin')}
        subtitleChoose
        titleConfirmFailed={I18n.t('ChangePinScreen.confirmFail')}
        subtitleError={I18n.t('ChangePinScreen.pleaseAgain')}
        stylePinCodeTextTitle={styles.pincodeTitle}
        stylePinCodeColorTitle="#26304c"
        stylePinCodeDeleteButtonColorHideUnderlay="#000"
        touchIDDisabled
      />
    </View>
  )

  _renderCheckPinCode() {
    const { isShowError } = this.state;

    return (
      <View style={styles.container}>
        <PINCode
          status="enter"
          passwordLength={6}
          pinStatus={isShowError ? 'failure' : 'initial'}
          timeLocked={10000}
          handleResultEnterPin={value => this._checkCodePin(value)}
          numbersButtonOverlayColor="#fcd800"
          stylePinCodeButtonNumber="#000"
          stylePinCodeHiddenPasswordSizeEmpty={scale(20)}
          stylePinCodeHiddenPasswordSizeFull={scale(20)}
          titleEnter={I18n.t('ChangePinScreen.currentPin')}
          titleAttemptFailed={I18n.t('ChangePinScreen.incorrectPincode')}
          subtitleError={I18n.t('ChangePinScreen.pleaseAgain')}
          stylePinCodeTextTitle={styles.pincodeTitle}
          stylePinCodeColorTitle="#26304c"
          stylePinCodeDeleteButtonColorHideUnderlay="#000"
          touchIDDisabled
        />
      </View>
    );
  }

  async _saveCodePin(codePin) {
    try {
      const { navigation } = this.props;

      await AppPreferences.saveToKeychain({
        pin: codePin,
      });
      UIUtils.showToastMessage(I18n.t('ChangePinScreen.changePinSuccess'));
      setTimeout(() => {
        navigation.navigate('SettingScreen');
      }, 1000);
    } catch (err) {
      console.log('SaveCodePin._error:', err);
    }
  }

  render() {
    const { codePin, isShowChangePin } = this.state;
    return (
      <View style={styles.main}>
        {codePin && !isShowChangePin ? this._renderCheckPinCode() : null}
        {!codePin || isShowChangePin ? this._renderChangePin() : null}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  main: {
    flex: 1,
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
