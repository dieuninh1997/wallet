import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode';
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


  render() {
    const { isShowError } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerPassword} />
        <PINCode
          status="enter"
          passwordLength={6}
          pinStatus={isShowError ? 'failure' : 'initial'}
          storePin={(value) => { console.log('ma pin:', value); }}
          handleResultEnterPin={value => this._checkValuePin(value)}
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
    height: '184@s',
    position: 'absolute',
    backgroundColor: '#fcd800',
  },
  borderPassword: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: '74@s',
    borderRadius: '37@s',
    paddingBottom: '27@s',
    width: '319@s',
    marginBottom: '70@s',
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
  }
});
