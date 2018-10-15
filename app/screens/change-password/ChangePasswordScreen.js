import React, { Component } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { changePassword } from '../../api/user/UserRequest';
import I18n from '../../i18n/i18n';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import BaseScreen from '../BaseScreen';
import UIUtils from '../../utils/UIUtils';
import { CommonColors, CommonSize, CommonStyles, Fonts } from '../../utils/CommonStyles';

class ChangePasswordScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: null,
      confirmNewPassword: null,
      modalVisible: false,
      error: '',
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  _onCLickCancel = () => {
    this.setModalVisible(false);
    this.setState({
      error: '',
    });
  }

  _onClickUpdate = async () => {
    const { currenPassword, newPassword, confirmNewPassword } = this.state;

    if (!currenPassword || !newPassword || !confirmNewPassword) {
      this.setState({
        error: I18n.t('changePassword.toastEnterFullInfo'),
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      this.setState({
        error: I18n.t('changePassword.toastConfirmPassword'),
      });
      return;
    }

    try {
      await changePassword(currenPassword, newPassword);

      UIUtils.showToastMessage(I18n.t('changePassword.changeSuccess'));
      this.setModalVisible(false);
    } catch (error) {
      if (error.errors) {
        this.setState({
          error: error.errors[Object.keys(error.errors)[0]],
        });
      } else {
        this.setState({
          error: error.message,
        });
      }
    }
  }

  render() {
    const { modalVisible, error } = this.state;
    let height = modalHeight;
    if (error) {
      height += scale(20);
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          isVisible={modalVisible}
          backdropColor={CommonColors.modalBackdropColor}
          backdropOpacity={CommonColors.modalBackdropAlpha}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}
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
    );
  }

  _renderHeader() {
    return (
      <View style={styles.popupHeader}>
        <Text style={styles.textPopupHeader}>{I18n.t('changePassword.title')}</Text>
      </View>
    );
  }

  _renderContent() {
    const { error } = this.state;

    return (
      <View style={styles.content}>
        <View style={styles.currenPassword}>
          <Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
          <TextInput
            style={styles.textCurrenPassword}
            secureTextEntry
            editable
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ currenPassword: text, error: '' })}
            placeholder={I18n.t('changePassword.curentPassword')}
          />
        </View>

        <View style={styles.newPasswordGroup}>
          <View style={styles.newPassword}>
            <Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
            <TextInput
              style={styles.textCurrenPassword}
              secureTextEntry
              onChangeText={text => this.setState({ newPassword: text, error: '' })}
              placeholder={I18n.t('changePassword.newPassword')}
            />
          </View>
          <View style={styles.comfirmNewPassword}>
            <Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
            <TextInput
              style={styles.textCurrenPassword}
              secureTextEntry
              onChangeText={text => this.setState({ confirmNewPassword: text, error: '' })}
              placeholder={I18n.t('changePassword.confirmNewPassword')}
            />
          </View>
        </View>
        {!!error && <Text style={[CommonStyles.errorMessage, styles.errorMessage]}>{error}</Text>}
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <View style={styles.ConfirmGroup}>
          <TouchableOpacity
            onPress={() => this._onCLickCancel()}
            style={styles.cancelContainer}
          >
            <Text style={styles.textCancel}>
              {' '}
              {I18n.t('changePassword.cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._onClickUpdate()}
            style={styles.updateContainer}
          >
            <Text style={styles.textUpdate}>
              {' '}
              {I18n.t('changePassword.update')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChangePasswordScreen;

const modalHeight = scale(296);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    width: CommonSize.popupWidth,
    backgroundColor: '#FFF',
    borderRadius: '15@s',
    margin: '16@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow(),
  },
  popupHeader: {
    justifyContent: 'center',
    marginLeft: '24@s',
    marginTop: '19@s',
  },
  textPopupHeader: {
    color: '#1f1f1f',
    fontSize: '19@ms',
    ...Fonts.Ubuntu_Regular
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginTop: '20@s',
  },
  footer: {
    marginTop: '30@s',
    marginRight: '24@s',
    marginBottom: '17@s',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  currenPassword: {
    borderWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    height: '48@s',
    marginLeft: '24@s',
    marginRight: '24@s',
    borderRadius: '24@s',
    borderColor: '#e4e8ed',
  },
  imageKey: {
    height: '30@s',
    width: '30@s',
    marginLeft: '20@s',
  },
  textCurrenPassword: {
    marginLeft: '10@s',
    fontSize: '16@ms',
    width: '100%',
    color: '#a6a6a6',
    marginRight: '20@s',
    ...Fonts.Ubuntu_Light
  },
  newPasswordGroup: {
    borderWidth: '1@s',
    marginTop: '16@s',
    marginLeft: '24@s',
    marginRight: '24@s',
    height: '96@s',
    borderRadius: '24@s',
    borderColor: '#e4e8ed',
  },
  newPassword: {
    borderColor: '#e4e8ed',
    borderBottomWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    height: '48@s',
  },
  comfirmNewPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '48@s',
  },
  ConfirmGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '25@s',
  },
  cancelContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    height: '40@s',
    width: '75@s',
    borderRadius: '20@s',
  },
  textCancel: {
    color: '#000000',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  },
  updateContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '40@s',
    marginLeft: '10@s',
    width: '90@s',
    borderRadius: '20@s',
  },
  textUpdate: {
    color: '#000000',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Regular,
  },
  errorMessage: {
    marginTop: '5@s',
    marginLeft: '24@s',
  },
});
