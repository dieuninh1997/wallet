import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import Modal from "react-native-modal";
import _ from 'lodash';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import UIUtils from '../../utils/UIUtils';
import MangoGradientButton from '../common/MangoGradientButton';
import { Fonts } from '../../utils/CommonStyles';

export default class ConfirmationModal extends React.Component {
  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onCancelPress() {
    this.setModalVisible(false);
  }

  _onConfirmPress(callBackFunction) {
    callBackFunction();
    this.setModalVisible(false);
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          isVisible={this.state.modalVisible}
          backdropColor={'#ccc'}
          backdropOpacity={0.8}
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
    const { title } = this.props;
    return (
      <View style={styles.popupHeader}>
        <Text style={styles.popupHeaderText}>{title}</Text>
      </View>
    );
  }
  _renderContent() {
    const { contentText } = this.props;
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{contentText}</Text>
      </View>
    );
  }
  _renderFooter() {
    const { btnCancelName, btnConfirmName, onClick, handConfirmModal } = this.props;
    return (
      <View style={styles.footer}>
        <MangoGradientButton
          btnText={btnCancelName}
          btnStyle={styles.btnCancel}
          colorOptions={['#f5f7fa', '#f5f7fa', '#f5f7fa']}
          onPress={() => this._onCancelPress()}
        />
        <MangoGradientButton
          btnText={btnConfirmName}
          btnStyle={styles.btnconfirm}
          onPress={() => handConfirmModal()}
        />
      </View>
    );
  }
}

ConfirmationModal.defaultProps = {
  title: I18n.t('genneralText.confirmation'),
  contentText: I18n.t('send.confirmationText'),
  btnCancelName: I18n.t('changePassword.cancel'),
  btnConfirmName: I18n.t('genneralText.ok'),
}

const margin = 3;
const styles = ScaledSheet.create({
  popup: {
    width: '343@s',
    height: '221@s',
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '10@s',
    paddingTop: '20@s',
    paddingBottom: '20@s',
    paddingLeft: '24@s',
    paddingRight: '24@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow()
  },
  popupHeader: {
    marginBottom: '16@s',
  },
  popupHeaderText: {
    color: '#000000',
    fontSize: '20@ms',
    ...Fonts.Ubuntu_Regular,
  },
  content: {
    height: '100@s',
  },
  contentText: {
    color: 'rgb(38, 48, 77)',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnCancel: {
    width: '81@s',
    height: '40@s',
    fontSize: '16@ms',
    marginBottom: '10@s',
    ...Fonts.Ubuntu_Regular,
  },
  btnconfirm: {
    width: '81@s',
    height: '40@s',
    fontSize: '16@ms',
    marginBottom: '10@s',
    marginLeft: '12@s',
    ...Fonts.Ubuntu_Regular,
  }
});
