import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import UIUtils from '../../utils/UIUtils';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors, Fonts } from '../../utils/CommonStyles';

export default class VerifyYourEmailModal extends React.Component {
  state = {
    email: '',
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onCancelPress() {
    this.setModalVisible(false);
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          isVisible={this.state.modalVisible}
          backdropColor={CommonColors.modalBackdropColor}
          backdropOpacity={CommonColors.modalBackdropAlpha}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}
        >
          <View style={styles.popup}>
            <View style={{ flex: 1 }}>
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
        <Text style={styles.popupHeaderText}>{I18n.t('resetPassword.verifyYourEmail')}</Text>
      </View>
    );
  }

  _renderContent() {
    return (
      <View style={styles.content}>
        <View style={styles.email}>
          <Image style={styles.imageKey} source={require('../../../assets/email/email.png')} />
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.contentTextUp}>{I18n.t('resetPassword.checkEmailToResetPassword')}</Text>
          {/* <Text style={styles.contentText}>
            {I18n.t('genneralText.password').toLowerCase()}
.
          </Text> */}
        </View>
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <MangoGradientButton
          btnText={I18n.t('genneralText.ok')}
          btnStyle={styles.btnCancel}
          buttonTextStyle={styles.buttonTextStyle}
          onPress={() => this._onCancelPress()}
        />
      </View>
    );
  }
}
const margin = 3;
const styles = ScaledSheet.create({
  popup: {
    width: '335@s',
    height: '290@s',
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '10@s',
    paddingTop: '20@s',
    paddingBottom: '20@s',
    padding: '10@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow(),
  },
  popupHeader: {
    alignItems: 'center',
  },
  popupHeaderText: {
    color: '#1f1f1f',
    fontSize: '20@ms',
    ...Fonts.Ubuntu_Regular,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  wrapText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16.5@s',
  },
  contentTextUp: {
    marginTop: '20@s',
    color: 'rgb(38, 48, 77)',
    fontSize: '15.5@ms',
    ...Fonts.Ubuntu_Light,
  },
  contentText: {
    color: 'rgb(38, 48, 77)',
    fontSize: '16@ms',
    textAlign: 'center',
    ...Fonts.Ubuntu_Light,
  },
  imageKey: {
    height: '102@s',
    width: '102@s',
  },
  email: {
    alignItems: 'center',
    marginTop: '15@s',
  },
  footer: {
    alignItems: 'center',
  },
  btnCancel: {
    width: '128@s',
    height: '40@s',
    marginBottom: '10@s',
    marginHorizontal: '5@s',
  },
  buttonTextStyle: {
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  },
});
