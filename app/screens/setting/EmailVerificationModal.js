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
import UIUtils from '../../utils/UIUtils';
import LinearGradient from 'react-native-linear-gradient';
import { sendVerificationEmail } from '../../api/user/UserRequest';

export default class EmailVerificationModal extends React.Component {
  state = {
    email: '',
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onResendPress() {

  }

  _onCancelPress() {
    this.setModalVisible(false);
  }

  async _onUpdatePress() {
    try {
      let response = await sendVerificationEmail(this.state.email)
      if (response.ok) {
        this.setModalVisible(true);
      } else {

      }
    } catch (e) {

    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          isVisible={this.state.modalVisible}
          backdropColor={'black'}
          backdropOpacity={0.7}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}>
          <View style={styles.popup}>
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
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{I18n.t('emailVerification.content')}</Text>
          <View style={styles.email}>
            <Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
            <TextInput
              style={styles.emailTextInput}
              editable
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder={I18n.t('emailVerification.emailAddress')} />
          </View>
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>{I18n.t('emailVerification.resend')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._onCancelPress.bind(this)}>
          <Text style={styles.buttonText}>{I18n.t('emailVerification.cancel')}</Text>
        </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this._onUpdatePress.bind(this)}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={['#FFDD3B', '#FFCF38', '#FFC136']}
          style={[styles.button, styles.updateButton]}>
          <Text style={styles.buttonText}>{I18n.t('emailVerification.update')}</Text>
        </LinearGradient>
      </TouchableOpacity>
      </View>
    );
  }
}

const margin = 3;

const styles = ScaledSheet.create({
  popup: {
    width: '284@s',
    height: '324@s',
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '10@s',
    padding: '20@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow()
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  popupHeaderText: {
    color: '#1f1f1f',
    fontSize: '20@ms',
    fontWeight: 'bold'
  },

  content: {
    flex: 1,
    marginTop: '10@s',
  },
  contentText: {
    color: '#444444',
    fontSize: '15@ms'
  },
  imageKey: {
    height: '20@s',
    width: '20@s',
    marginLeft: '20@s',
    marginRight: '10@s'
  },
  emailTextInput: {
    color: '#1f1f1f',
    fontSize: '15@ms'
  },
  email: {
    borderWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s',
    height: '50@s',
    borderRadius: '25@s',
    borderColor: '#e4e8ed'
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
    width: '75@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#ddd'
  },
  updateButton: {
    marginLeft: margin,
    marginRight: margin,
    marginBottom: margin
  },
  buttonText: {
    color: '#000',
    fontSize: '15@ms'
  }
});