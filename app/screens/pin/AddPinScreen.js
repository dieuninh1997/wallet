import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import I18n from '../../i18n/i18n';
import { CommonStyles } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';

export default class AddPinScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('addPinScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  state = {
    codePin: null,
    isShowChangePin: false,
  };

  _renderAddPin = () => (
    <View style={styles.container}>
      <PINCode
        status="choose"
        passwordLength={6}
        storePin={value => this._saveCodePin(value)}
        timeLocked={10000}
        numbersButtonOverlayColor="#fcd800"
        stylePinCodeButtonNumber="#000"
        stylePinCodeHiddenPasswordSizeEmpty={scale(20)}
        stylePinCodeHiddenPasswordSizeFull={scale(20)}
        titleChoose={I18n.t('addPinScreen.newPin')}
        titleConfirm={I18n.t('addPinScreen.confirmNewPin')}
        subtitleChoose
        titleConfirmFailed={I18n.t('addPinScreen.confirmFail')}
        subtitleError={I18n.t('addPinScreen.pleaseAgain')}
        stylePinCodeTextTitle={styles.pincodeTitle}
        stylePinCodeColorTitle="#26304c"
        stylePinCodeDeleteButtonColorHideUnderlay="#000"
        touchIDDisabled
      />
    </View>
  )

  async _saveCodePin(codePin) {
    try {
      const { navigation } = this.props;

      await AppPreferences.saveToKeychain({
        pin: codePin,
      });
      UIUtils.showToastMessage(I18n.t('addPinScreen.changePinSuccess'));
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
      <View style={styles.main}>
        {!codePin || isShowChangePin ? this._renderAddPin() : null}
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
  mainContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pincodeTitle: {
    fontSize: '16@ms',
    textAlign: 'center',
  },
});
