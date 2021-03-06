import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import UIUtils from '../../utils/UIUtils';
import { CommonColors, CommonStyles, Fonts } from '../../utils/CommonStyles';
import { sendPhoneVerificationCode, verifyPhoneNumber } from '../../api/user/UserRequest';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export default class MobileNumberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      modalVisibleUpdate: false,
      modalVisibleVerify: false,
      error: '',
      codePhoneCountry: '+84',
      cca2: 'vn',
      codeVerify: '',
    };
  }

  setModalVisibleUpdate(visible) {
    this.setState({ modalVisibleUpdate: visible });
  }

  setModalVisibleVerify(visible) {
    this.setState({ modalVisibleVerify: visible });
  }

  _handlePressFlag = () => {
    this.countryPicker.openModal();
  }

  selectCountry = async (country) => {
    const parseCountry = country.cca2.toLowerCase();

    await this.phone.selectCountry(parseCountry);
    this.setState({
      cca2: country.cca2,
      codePhoneCountry: this.phone.state.formattedNumber,
    });
  }

  show = (phoneNumber, visible) => {
    this.setState({
      phoneNumber,
      modalVisibleUpdate: visible,
    });
  }

  _onCancelPress = () => {
    this.setModalVisibleUpdate(false);
    this.setState({
      phoneNumber: '',
      error: '',
    });
  }

  _onCancelPressVerify = () => {
    this.setModalVisibleVerify(false);
    this.setState({
      phoneNumber: '',
      codeVerify: '',
      error: '',
    });
  }

  parse(number, iso2) {
    try {
      return phoneUtil.parse(number, iso2);
    } catch (err) {
      console.log(`Exception was thrown: ${err.toString()}`);
      return null;
    }
  }

  isValidNumber = async () => {
    const { phoneNumber, codePhoneCountry } = this.state;
    const phoneNumberFull = codePhoneCountry + phoneNumber;
    const phoneInfo = this.parse(phoneNumberFull, this.state.cca2);
    const phoneNUmberValidate = phoneInfo.values_[2] + "";
    await this.setState({
      phoneNumber: phoneNUmberValidate,
      loadNumber: true,
    });
    console.log(this.state.phoneNumber, phoneNUmberValidate);

    if (phoneInfo) {
      return phoneUtil.isValidNumber(phoneInfo);
    }

    return false;
  }

  _validatePhoneNumber = async () => {
    if (!(await this.isValidNumber())) {
      throw new Error('Phone number is not valid');
    }
  }

  _onUpdatePress = async () => {
    const { phoneNumber, codePhoneCountry } = this.state;

    if (!phoneNumber) {
      this.setState({
        error: I18n.t('mobileNumberVerification.message'),
      });
      return;
    }

    try {
      await this._validatePhoneNumber();
      const response = await sendPhoneVerificationCode(codePhoneCountry, this.state.phoneNumber);
      const message = response.message;

      UIUtils.showToastMessage(message, 'success');
      this.setModalVisibleUpdate(false);
      setTimeout(() => this.setModalVisibleVerify(true), 1000);
    } catch (error) {
      this.setState({
        error: error.message,
      });
      console.log('mobileNumberModal', error.message);
    }
  }

  _onUpdateVerify = async () => {
    const { codeVerify } = this.state;
    const { onMobileNumber } = this.props;

    try {
      const response = await verifyPhoneNumber(codeVerify);
      const { message } = response;

      onMobileNumber();
      this.setModalVisibleVerify(false);
      UIUtils.showToastMessage(message, 'success');
      this.setState({
        phoneNumber: '',
        codeVerify: '',
        error: '',
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
      console.log('mobileNumberModal', error.message);
    }
  }

  _onTextChange = (text) => {
    this.setState({
      phoneNumber: text,
      error: '',
    });
  }

  _onTextChangeVerify = (text) => {
    this.setState({
      codeVerify: text,
      error: '',
    });
  }

  render() {
    const { error, modalVisibleUpdate, modalVisibleVerify } = this.state;
    let height = modalHeight;
    if (error) {
      height += scale(20);
    }

    return (
      <View>
        <View>
          <Modal
            animationType="slide"
            isVisible={modalVisibleUpdate}
            backdropColor={CommonColors.modalBackdropColor}
            backdropOpacity={CommonColors.modalBackdropAlpha}
            onBackButtonPress={() => this.setModalVisibleUpdate(false)}
            onBackdropPress={() => this.setModalVisibleUpdate(false)}
          >
            <View style={[styles.popup, { height }]}>
              <View style={{ flex: 1 }}>
                {this._renderHeader()}
                {this._renderContent()}
                {this._renderFooter()}
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <Modal
            animationType="slide"
            isVisible={modalVisibleVerify}
            backdropColor={CommonColors.modalBackdropColor}
            backdropOpacity={CommonColors.modalBackdropAlpha}
            onBackButtonPress={() => this.setModalVisibleVerify(false)}
            onBackdropPress={() => this.setModalVisibleVerify(false)}
          >
            <View style={[styles.popup, { height }]}>
              <View style={{ flex: 1 }}>
                {this._renderHeader()}
                {this._renderContentVerify()}
                {this._renderFooterVerify()}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.popupHeader}>
        <Text style={styles.popupHeaderText}>{I18n.t('mobileNumberVerification.title')}</Text>
      </View>
    );
  }

  _renderContent() {
    const { phoneNumber, error, cca2 } = this.state;
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{I18n.t('mobileNumberVerification.contentUpdate')}</Text>
        <View style={styles.phoneNumber}>
          <TouchableWithoutFeedback onPress={() => this.countryPicker.openModal()}>
            <View style={styles.codePhoneNumber}>
              <PhoneInput
                ref={(ref) => { this.phone = ref; }}
                onPressFlag={this._handlePressFlag}
                initialCountry="vn"
                disabled
                flagStyle={styles.flagIcon}
                style={styles.phoneInput}
                textStyle={styles.textCodePhone}
                offset={0}
              />
              <CountryPicker
                ref={(ref) => {
                  this.countryPicker = ref;
                }}
                onChange={value => this.selectCountry(value)}
                translation="eng"
                filterable
                showCallingCode
                renderFilter={({ value, onChange, onClose }) => (
                  <View style={styles.searchCountryPicker}>
                    <View style={styles.groupSearchCountryPicker}>
                      <Image style={styles.iconSearchCountryPicker} source={require('../../../assets/mobile-number-verify/searchCountryPicker.png')} />
                      <TextInput
                        placeholder={I18n.t('mobileNumberVerification.searchCountry')}
                        style={styles.inputSearchCountryPicker}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    <TouchableWithoutFeedback onPress={onClose}>
                      <Text style={styles.textCancelCountryPicker}>{I18n.t('mobileNumberVerification.cancel')}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                )}
                hideAlphabetFilter
                cca2={cca2}
              >
                <View />
              </CountryPicker>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.countryPicker.openModal()}>
            <MaterialCommunityIcons
              style={styles.iconExpandMore}
              name="chevron-down"
            />
          </TouchableWithoutFeedback>

          <TextInput
            style={styles.numberPhoneTextInput}
            editable
            keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            value={phoneNumber}
            onChangeText={this._onTextChange}
            placeholder={I18n.t('mobileNumberVerification.phoneNumber')}
          />
        </View>
        {!!error && <Text style={[CommonStyles.errorMessage, styles.errorMessage]}>{error}</Text>}
      </View>
    );
  }

  _renderContentVerify() {
    const { codeVerify, error } = this.state;
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{I18n.t('mobileNumberVerification.contentVerify')}</Text>
        <View style={styles.phoneNumberVerify}>
          <TextInput
            keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
            value={codeVerify}
            maxLength={6}
            onChangeText={this._onTextChangeVerify}
            style={codeVerify ? styles.textCodeVerifyEnter : styles.textCodeVerify}
            placeholder={I18n.t('mobileNumberVerification.enterCode')}
          />
        </View>
        {!!error && <Text style={[CommonStyles.errorMessage, styles.errorMessage]}>{error}</Text>}
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelUpdate} onPress={this._onCancelPress}>
          <Text style={styles.buttonText}>{I18n.t('mobileNumberVerification.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onUpdatePress}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#ffdd00', '#fcc203']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{I18n.t('mobileNumberVerification.update')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  _renderFooterVerify() {
    return (
      <View style={styles.footerVerify}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onUpdatePress}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#53a1ff', '#1c43b8']}
            style={styles.button}
          >
            <Text style={[styles.buttonText, styles.buttonTextResend]}>{I18n.t('mobileNumberVerification.resend')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={this._onCancelPressVerify}>
          <Text style={styles.buttonText}>{I18n.t('mobileNumberVerification.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onUpdateVerify}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#ffdd00', '#fcc203']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{I18n.t('mobileNumberVerification.verify')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const modalHeight = scale(285);

const styles = ScaledSheet.create({
  popup: {
    width: '343@s',
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '16@s',
    paddingLeft: '24@s',
    paddingRight: '24@s',
    paddingTop: '16@s',
    paddingBottom: '16@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow(),
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupHeaderText: {
    color: '#1f1f1f',
    fontSize: '20@ms',
    ...Fonts.Ubuntu_Regular,
  },
  content: {
    marginTop: '15@s',
  },
  contentText: {
    color: '#26304d',
    fontSize: '16@ms',
    lineHeight: '21@s',
    ...Fonts.Ubuntu_Light,
  },
  codePhoneNumber: {
    height: '22@s',
    width: '49@s',
    alignItems: 'center',
    marginLeft: '7@s',
  },
  numberPhoneTextInput: {
    borderLeftWidth: '1@s',
    borderColor: '#cad1db',
    paddingLeft: '11@s',
    color: '#1f1f1f',
    fontSize: '16@ms',
    width: '100%',
    ...Fonts.Ubuntu_Light,
  },
  phoneNumber: {
    borderWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s',
    height: '48@s',
    borderRadius: '28@s',
    borderColor: '#cad1db',
  },
  phoneNumberVerify: {
    borderWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s',
    height: '48@s',
    borderRadius: '28@s',
    borderColor: '#cad1db',
    justifyContent: 'center',
  },
  textCodeVerify: {
    width: '150@s',
    fontSize: '20@ms',
    textAlign: 'center',
    ...Fonts.Ubuntu_Light,
  },
  textCodeVerifyEnter: {
    width: '150@s',
    fontSize: '25@ms',
    textAlign: 'center',
    ...Fonts.Ubuntu_Medium,
  },
  footer: {
    marginTop: '20@s',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerVerify: {
    marginTop: '20@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelUpdate: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40@s',
    borderRadius: '28@s',
    backgroundColor: '#f5f7fa',
    marginRight: '12@s',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40@s',
    borderRadius: '28@s',
    backgroundColor: '#f5f7fa',
  },
  cancelButton: {
    marginLeft: '10@s',
  },
  buttonText: {
    color: '#000',
    fontSize: '16@ms',
    marginLeft: '10@s',
    marginRight: '10@s',
    ...Fonts.Ubuntu_Regular,
  },
  errorMessage: {
    marginTop: '5@s',
  },
  flagIcon: {
    width: '0@s',
    height: '0@s',
  },
  phoneInput: {
    alignItems: 'center',
    padding: '0@s',
    margin: '0@s',
  },
  iconExpandMore: {
    fontSize: '25@ms',
    marginRight: '7@s',
  },
  textCodePhone: {
    fontSize: '16@ms',
    color: '#000000',
    ...Fonts.Ubuntu_Bold,
  },
  buttonTextResend: {
    color: '#fff',
  },
  searchCountryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '10@s',
    paddingRight: '10@s',
    justifyContent: 'space-between',
    width: '100%',
    height: '60@s',
    backgroundColor: CommonColors.screenBgColor,
  },
  groupSearchCountryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '15@s',
    backgroundColor: '#fff',
  },
  iconSearchCountryPicker: {
    width: '30@s',
    height: '30@s',
  },
  inputSearchCountryPicker: {
    height: '40@s',
    width: '70%',
    marginLeft: '10@s',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },
  textCancelCountryPicker: {
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  },
});
