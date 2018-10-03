import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import RNRestart from 'react-native-restart';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import AppPreferences from '../../utils/AppPreferences';
import I18n from '../../i18n/i18n';
import { CommonStyles } from '../../utils/CommonStyles';
import Consts from '../../utils/Consts';

export default class AddPinScreen extends Component {
  static navigationOptions = (navigation) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('addPinScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerRight: <View />,
  });

  state = {
    codePin: null,
    isShowChanePin: false,
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
      this.setState({ isShowChanePin: true });
    } else {
      this.setState({ isShowError: true });
    }
    setTimeout(() => this.setState({ isShowError: false }), 1000);
  }

  _renderChangePin = () => (
    <View style={styles.container}>
      <View style={styles.containerPassword}></View>
      <View style={styles.borderPassword}></View>
      <PINCode
        status="choose"
        passwordLength={4}
        storePin={value => this._saveCodePin(value)}
        timeLocked={10000}
        numbersButtonOverlayColor="#fcd800"
        stylePinCodeMainContainer={styles.pinCodeContainer}
        styleMainContainer={styles.mainContainer}
        colorPassword="#ebedf2"
        stylePinCodeHiddenPasswordSizeEmpty={20}
        stylePinCodeHiddenPasswordSizeFull={20}
        stylePinCodeButtonCircle={styles.buttonCircle}
        buttonDeleteText
        stylePinCodeColumnDeleteButton={styles.buttonDelete}
        stylePinCodeTextTitle={styles.textTitlePinCode}
        stylePinCodeRowButtons={styles.pincodeRowButton}
        stylePinCodeTextButtonCircle={styles.textButtonCircle}
        touchIDDisabled
      />
    </View>
  )

  _renderCheckPinCode() {
    return (
      <View style={styles.container}>
        <View style={styles.containerPassword}></View>
        <View style={styles.borderPassword}></View>
        <PINCode
          status="enter"
          passwordLength={4}
          pinStatus={this.state.isShowError ? 'failure' : 'initial'}
          timeLocked={10000}
          handleResultEnterPin={value => this._checkCodePin(value)}
          numbersButtonOverlayColor="#fcd800"
          stylePinCodeMainContainer={styles.pinCodeContainer}
          styleMainContainer={styles.mainContainer}
          colorPassword="#ebedf2"
          stylePinCodeHiddenPasswordSizeEmpty={20}
          stylePinCodeHiddenPasswordSizeFull={20}
          stylePinCodeButtonCircle={styles.buttonCircle}
          buttonDeleteText
          stylePinCodeColumnDeleteButton={styles.buttonDelete}
          stylePinCodeTextTitle={styles.textTitlePinCode}
          stylePinCodeRowButtons={styles.pincodeRowButton}
          stylePinCodeTextButtonCircle={styles.textButtonCircle}
          touchIDDisabled
        />
      </View>
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
      <View style={styles.main}>
        {codePin && !isShowChanePin ? this._renderCheckPinCode() : null}
        {!codePin || isShowChanePin ? this._renderChangePin() : null}
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
    justifyContent: 'space-around',
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
    height: '190@s',
    position: 'absolute',
    backgroundColor: '#fcd800',
  },
  borderPassword: {
    position: 'absolute',
    width: '300@s',
    height: '60@s',
    backgroundColor: '#ffffff',
    borderRadius: '30@s',
    marginTop: '113@s',
    borderWidth: '12@s',
    borderColor: '#f1cf00',
  },
  pincodeRowButton: {
    marginTop: '13@s',
  },
  textButtonCircle: {
    fontSize: '30@ms',
    fontWeight: '400',
    color: '#26304c',
  },
});
