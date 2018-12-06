import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import UIUtils from '../../utils/UIUtils';
import MangoGradientButton from './MangoGradientButton';
import { CommonColors, CommonSize, Fonts } from '../../utils/CommonStyles';

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

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          isVisible={modalVisible}
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
    const {
      btnCancelName, btnConfirmName, handConfirmModal,
    } = this.props;
    return (
      <View style={styles.footer}>
        <MangoGradientButton
          btnText={btnCancelName}
          btnStyle={styles.btnCancel}
          buttonTextStyle={styles.buttonTextStyle}
          colorOptions={['#f5f7fa', '#f5f7fa', '#f5f7fa']}
          onPress={() => this._onCancelPress()}
        />
        <MangoGradientButton
          btnText={btnConfirmName}
          btnStyle={styles.btnconfirm}
          buttonTextStyle={styles.buttonTextStyle}
          onPress={() => handConfirmModal()}
        />
      </View>
    );
  }
}

ConfirmationModal.defaultProps = {
  title: I18n.t('genneralText.confirmation'),
  contentText: I18n.t('send.confirmationTextDefault'),
  btnCancelName: I18n.t('changePassword.cancel'),
  btnConfirmName: I18n.t('genneralText.ok'),
};

const styles = ScaledSheet.create({
  popup: {
    width: CommonSize.popupWidth,
    height: '221@s',
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '10@s',
    paddingTop: '20@s',
    paddingBottom: '20@s',
    paddingLeft: '24@s',
    paddingRight: '24@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow(),
  },
  popupHeader: {
    marginBottom: '16@s',
  },
  popupHeaderText: {
    color: '#000000',
    fontSize: CommonSize.inputFontSize,
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
    marginBottom: '10@s',
    marginHorizontal: '5@s',
  },
  btnconfirm: {
    width: '81@s',
    height: '40@s',
    marginBottom: '10@s',
    marginLeft: '12@s',
    marginHorizontal: '5@s',
  },
  buttonTextStyle: {
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  },
});
