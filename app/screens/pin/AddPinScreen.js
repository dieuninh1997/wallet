import React, { Component } from 'react';
import { View } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import MangoBackButton from '../common/MangoBackButton';
import AppPreferences from '../../utils/AppPreferences';
import I18n from '../../i18n/i18n';
import { CommonStyles } from '../../utils/CommonStyles';
import Consts from '../../utils/Consts';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

export default class AddPinScreen extends Component {
  static navigationOptions = navigation => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('addPinScreen.title'),
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
      <View style={styles.borderPassword} />
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
    const { isShowError } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerPassword} />
        <View style={styles.borderPassword} />
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
    height: '195@s',
    position: 'absolute',
    backgroundColor: '#fcd800',
  },
  borderPassword: {
    position: 'absolute',
    width: '300@s',
    height: '60@s',
    backgroundColor: '#ffffff',
    borderRadius: '30@s',
    marginTop: '115@s',
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
