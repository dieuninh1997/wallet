import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import I18n from '../../i18n/i18n';
import { CommonStyles } from '../../utils/CommonStyles';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

export default class AddPinScreen extends Component {
  static navigationOptions = () => ({
    headerLeft: <View />,
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
      <View style={styles.containerPassword} />
      <PINCode
        status="choose"
        passwordLength={6}
        storePin={value => this._saveCodePin(value)}
        timeLocked={10000}
        numbersButtonOverlayColor="#fcd800"
        stylePinCodeMainContainer={styles.pinCodeContainer}
        styleMainContainer={styles.mainContainer}
        colorPassword="#ebedf2"
        stylePinCodeButtonNumber="#000"
        stylePinCodeHiddenPasswordSizeEmpty={scale(20)}
        stylePinCodeHiddenPasswordSizeFull={scale(20)}
        stylePinCodeButtonCircle={styles.buttonCircle}
        buttonDeleteText
        stylePinCodeColumnDeleteButton={styles.buttonDelete}
        stylePinCodeTextTitle={styles.textTitlePinCode}
        stylePinCodeRowButtons={styles.pincodeRowButton}
        stylePinCodeTextButtonCircle={styles.textButtonCircle}
        stylePinCodeHiddenPasswordCircle={styles.borderPassword}
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
        pin: codePin
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
  pinCodeContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30@s',
  },
  textTitlePinCode: {
    fontSize: '20@ms',
    fontWeight: '200',
    textAlign: 'center',
    paddingTop: '10@s',
  },
  buttonDelete: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60@s',
    paddingTop: '11@s',
    height: '60@s',
    borderRadius: '30@s',
    marginBottom: '10@s',
    marginLeft: '2@s',
    marginRight: '2@s',
    elevation: '6@s',
  },
  buttonCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60@s',
    height: '60@s',
    backgroundColor: '#ffffff',
    borderRadius: '30@s',
    elevation: '6@s',
  },
  containerPassword: {
    width: '100%',
    height: '175@s',
    position: 'absolute',
    backgroundColor: '#fcd800',
  },
  borderPassword: {
    backgroundColor: '#ffffff',
    borderRadius: '37@s',
    flexDirection: 'row',
    height: '74@s',
    paddingBottom: '27@s',
    width: '319@s',
    marginBottom: '60@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pincodeRowButton: {
    marginTop: '13@s',
  },
  textButtonCircle: {
    fontSize: '30@ms',
    fontWeight: '400',
    color: '#26304c',
  },
  pincodeTitle: {
    fontSize: '16@ms',
    textAlign: 'center',
  },
});
