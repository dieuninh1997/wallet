import React, { Component } from 'react';
import {
  View, TouchableOpacity, TextInput, Image,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import { CommonStyles, CommonColors, CommonSize, Fonts } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import Consts from '../../utils/Consts';
import CreateWalletBaseScreen from './CreateWalletBaseScreen';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
export default class CreateWalletPhoneNumberScreen extends CreateWalletBaseScreen {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createByPhoneNumber.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  })

  getLoginType = () => Consts.LOGIN_TYPES.PHONE_NUMBER


  _handlePressFlag = () => {
    this.countryPicker.openModal();
  }
  
  selectCountry = (country) => {
    const parseCountry = country.cca2.toLowerCase();
    this.phone.selectCountry(parseCountry);
    this.setState({ cca2: country.cca2 });
  }

  parse(number, iso2) {
    try {
      return phoneUtil.parse(number, iso2);
    } catch (err) {
      console.log(`Exception was thrown: ${err.toString()}`);
      return null;
    }
  }

  isValidNumber = () => {
    const {createWalletInfo} = this.state;
    const phoneNumber = this.phone.state.formattedNumber + createWalletInfo.phoneNumber;
    createWalletInfo.phone_number = phoneNumber;
    this.setState({
      createWalletInfo,
    })
    console.log(this.state.createWalletInfo);
    const phoneInfo = this.parse(phoneNumber, this.state.cca2);

    if (phoneInfo) {
      return phoneUtil.isValidNumber(phoneInfo);
    }

    return false;
  }

  _validateUsername = () => {
    if (!this.isValidNumber()){
      throw new Error('Phone number is not valid');
    }
  }

  _renderUsernameInput = () => {

    return (
    <View style={styles.inputTextNumber}>
      <View style={styles.country}>
        <View style={styles.inputDialCode}>
          <PhoneInput
            ref= {(ref) => this.phone = ref}
            style={styles.dialCode}
            textStyle={styles.dialCodeText}
            flagStyle={{display: "none"}}
          />
          <TouchableOpacity 
            onPress={this._handlePressFlag}
            style={{marginLeft: 3}}
          >
            <Image
              source={require('../../../assets/arrow-down/down-arrow.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <CountryPicker
          ref={(ref)=> this.countryPicker = ref}
          onChange={value => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}
        >
         <View/>
        </CountryPicker>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
          placeholder={I18n.t('createWallet.phoneNumber')}
          onChangeText={(value)=>this._handleChangeInput(CreateWalletPhoneNumberScreen.WALLET_INFO.PHONE, value)}
        />
      </View>
    </View>
  )}
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  createWallet: {
    borderRadius: '25@s',
    alignSelf: 'stretch',
    marginLeft: '50@s',
    marginRight: '50@s',
    height: '50@s',
    backgroundColor: '#ffd900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewcreate: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    marginBottom: '30@s',
  },
  textCreate: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
  country: {
    borderRightWidth: '1@s',
    justifyContent: 'center',
    paddingLeft: '20@s',
    borderColor: '#eef0f4',
    width: '87.5@s',
    height: '56@s',
  },
  phoneNumber: {
    fontSize: '18@s',
    fontWeight: '100',
    color: '#c4c4c4',
    paddingLeft: '15@s',
  },
  codeCountry: {
    width: '30@s',
  },
  textCountry: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    width: '340@s',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  inputTextNumber: {
    flex: 1,
    flexDirection: 'row',
    width: '330@s',
    alignItems: 'center'
  },
  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '10@s',
  },
  formLoginContainer: {
    marginTop: '46@s',
    height: '170@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '25@s',
    borderWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },
  inputWalletIdContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },
  inputText: {
    flex: 7,
    fontSize: CommonSize.inputFontSize,
    ...Fonts.Ubuntu_Light,
  },
  arrow: {
    width: '15@s',
    height: '15@s',
    paddingLeft: '0@s',
    opacity: 0.5,
  },
  inputDialCode: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dialCode: {
    width: '60@s', 
    marginLeft: -17,
  },
  dialCodeText: { 
    textAlign: 'center',
    fontSize: CommonSize.inputFontSize,
    ...Fonts.Ubuntu_Light,
  }
});
