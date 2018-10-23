import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import Modal from "react-native-modal";
import _ from 'lodash';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import UIUtils from '../../utils/UIUtils';
import { CommonColors, CommonSize, CommonStyles, Fonts } from '../../utils/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import { sendVerificationEmail } from '../../api/user/UserRequest';

export default class EmailVerificationModal extends React.Component {
  state = {
    email: '',
    emailEditable: true,
    modalVisible: false,
    error: ''
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (!visible && this.closeCallback) {
      this.closeCallback();
    }
  }

  show = (email, callback) => {
    this.setState({
      email,
      modalVisible: true,
      // emailEditable: !email
    });
    this.closeCallback = callback;
  }

  _onCancelPress() {
    this.setModalVisible(false);
  }

  _onUpdatePress = async () => {
    try {
      let response = await sendVerificationEmail(this.state.email)
      this.setModalVisible(false);
      UIUtils.showToastMessage(I18n.t('emailVerification.verificationEmailSent'));
    } catch (e) {
      console.log('EmailVerificationModal._onUpdatePress', e);
      if (e.errors && e.errors.email) {
        this.setState({
          error: e.errors.email[0]
        });
      } else {
        this.setState({
          error: I18n.t('emailVerification.errors.' + e.message)
        });
      }
    }
  }

  _onTextChange = (text) => {
    this.setState({
      email: text,
      error: ''
    });
  }

  render() {
    const { error } = this.state;
    let height = modalHeight;
    if (!!error) {
      height += scale(20); // one line message
    }

    return (
      <View>
        <Modal
          animationType="slide"
          isVisible={this.state.modalVisible}
          backdropColor={CommonColors.modalBackdropColor}
          backdropOpacity={CommonColors.modalBackdropAlpha}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}>
          <View style={[styles.popup, {height: height}]}>
            <View style={{flex: 1}}>
              {this._renderHeader()}
              {this._renderContent()}
              {this._renderFooter()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.popupHeader}>
        <Text style={styles.popupHeaderText}>{I18n.t('emailVerification.title')}</Text>
      </View>
    );
  }

  _renderContent() {
    const { email, error, emailEditable } = this.state;
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{I18n.t('emailVerification.content')}</Text>
        <View style={styles.email}>
          <Image style={styles.emailIcon} source={require('../../../assets/setting/email.png')} />
          <TextInput
            style={styles.emailTextInput}
            editable={emailEditable}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={this._onTextChange}
            placeholder={I18n.t('emailVerification.emailAddress')} />
        </View>
        {!!error && <Text style={[CommonStyles.errorMessage, styles.errorMessage]}>{error}</Text>}
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onUpdatePress}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#53a1ff', '#1c43b8']}
            style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextResend]}>{I18n.t('emailVerification.resend')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={this._onCancelPress.bind(this)}>
          <Text style={styles.buttonText}>{I18n.t('emailVerification.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this._onUpdatePress}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#ffdd00', '#fcc203']}
            style={styles.button}>
            <Text style={styles.buttonText}>{I18n.t('emailVerification.update')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const modalHeight = scale(327);

const styles = ScaledSheet.create({
  popup: {
    width: CommonSize.popupWidth,
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '16@s',
    paddingLeft: '24@s',
    paddingRight: '24@s',
    paddingTop: '16@s',
    paddingBottom: '16@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow()
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  popupHeaderText: {
    color: '#1f1f1f',
    fontSize: '19@ms',
    ...Fonts.Ubuntu_Regular
  },

  content: {
    marginTop: '15@s',
  },
  contentText: {
    color: '#26304d',
    fontSize: '16@ms',
    lineHeight: '21@s',
    ...Fonts.Ubuntu_Light
  },
  emailIcon: {
    height: '28@s',
    width: '28@s',
    marginLeft: '22@s',
    marginRight: '10@s'
  },
  emailTextInput: {
    flex: 1,
    marginRight: '10@s',
    color: '#1f1f1f',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light
  },
  email: {
    borderWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s',
    height: '48@s',
    borderRadius: '28@s',
    borderColor: '#cad1db'
  },

  footer: {
    marginTop: '20@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '86@s',
    height: '40@s',
    borderRadius: '28@s',
    backgroundColor: '#f5f7fa'
  },
  cancelButton: {
    marginLeft: '10@s',
  },
  buttonText: {
    color: '#000',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular
  },
  buttonTextResend: {
    color: '#fff'
  },
  errorMessage: {
    marginTop: '5@s'
  }
});