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
import {
  CommonColors, CommonSize, CommonStyles, Fonts,
} from '../../utils/CommonStyles';
import AppConfig from '../../utils/AppConfig';
import nodejs from 'nodejs-mobile-react-native';
import MangoLoading from '../common/MangoLoading';

const stripHexPrefix = require('strip-hex-prefix');

class ChangePasswordScreen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: null,
      confirmNewPassword: null,
      modalVisible: false,
      error: '',
      isEnableOtp: false,
      otp: '',
      privateKey: AppConfig.PRIVATE_KEY,
      isLoading: false,
    };
  }

  setModalVisible = (modalVisible, isEnableOtp) => {
    this.setState({ modalVisible, isEnableOtp });
  }

  _onCLickCancel = () => {
    this.setModalVisible(false);
    this.setState({
      error: '',
    });
  }

  _generateKeystore = data => new Promise((resolve, reject) => {
    try {
      nodejs.start('main.js');
      nodejs.channel.addListener(
        'generateKeystore',
        (message) => {
          resolve(JSON.parse(message));
        },
      );
      nodejs.channel.post('generateKeystore', JSON.stringify({
        action: 'generateKeystore',
        data: JSON.stringify(data),
      }));
    } catch (error) {
      console.log('CreateByEmailScreen._generateKeystore._error: ', error);
      reject(error);
    }
  })

  _onClickUpdate = async () => {
    const {
      currenPassword, newPassword, confirmNewPassword, otp, isEnableOtp, privateKey,
    } = this.state;

    if (isEnableOtp) {
      if (!otp || (otp && otp.length < 6)) {
        this.setState({
          error: I18n.t('changePassword.toastEnterFullInfo'),
        });
        return;
      }
    }

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

    const dataGenKeystore = {
      privateKey: stripHexPrefix(privateKey),
      password: newPassword,
    };

    try {
      this.setState({
        isLoading: true,
      })
  
      const keyStore = await this._generateKeystore(dataGenKeystore);
      AppConfig.KEYSTORE = JSON.parse(keyStore.keystore);
      await changePassword(currenPassword, newPassword, otp, keyStore.keystore);

      UIUtils.showToastMessage(I18n.t('changePassword.changeSuccess'), 'success');
      this.setState({
        isLoading: false,
      })
      this.setModalVisible(false);
    } catch (error) {
      this.setState({
        isLoading: false,
      })
      if (error.errors) {
        this.setState({
          error: error.errors[Object.keys(error.errors)[0]][0],
        });
      } else {
        this.setState({
          error: error.message,
        });
      }
    }
  }

  render() {
    const { modalVisible, error, isEnableOtp, isLoading } = this.state;
    let height = modalHeight;
    if (isEnableOtp) {
      height += scale(64);
    }
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
            {/* <View style={{ flex: 1 }}> */}
            {isLoading ? <MangoLoading/> : null}
            {this._renderHeader()}
            {this._renderContent()}
            {this._renderFooter()}
            {/* </View> */}
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
    const { error, isEnableOtp } = this.state;

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

        {isEnableOtp ? (
          <View style={styles.otpContainer}>
            <Image style={styles.imageKey} source={require('../../../assets/setting/graphicGauthLogo.png')} />
            <TextInput
              style={styles.textCurrenPassword}
              keyboardType="numeric"
              editable
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ otp: text, error: '' })}
              placeholder={I18n.t('changePassword.otp')}
            />
          </View>
        ) : null}

        {!!error && <Text style={[CommonStyles.errorMessage, styles.errorMessage]}>{error}</Text>}
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <View style={styles.ConfirmGroup}>
          <TouchableOpacity
            onPress={this._onCLickCancel}
            style={styles.cancelContainer}
          >
            <Text style={styles.textCancel}>
              {' '}
              {I18n.t('changePassword.cancel')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._onClickUpdate}
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
    ...Fonts.Ubuntu_Regular,
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
    borderColor: '#cad1db',
  },

  otpContainer: {
    borderWidth: '1@s',
    flexDirection: 'row',
    alignItems: 'center',
    height: '48@s',
    marginLeft: '24@s',
    marginRight: '24@s',
    borderRadius: '24@s',
    borderColor: '#cad1db',
    marginTop: '16@s',
  },
  imageKey: {
    height: '26@s',
    width: '26@s',
    marginLeft: '15@s',
  },
  textCurrenPassword: {
    marginLeft: '5@s',
    fontSize: '16@ms',
    width: '100%',
    marginRight: '10@s',
    ...Fonts.Ubuntu_Light,
  },
  newPasswordGroup: {
    borderWidth: '1@s',
    marginTop: '16@s',
    marginLeft: '24@s',
    marginRight: '24@s',
    height: '96@s',
    borderRadius: '24@s',
    borderColor: '#cad1db',
  },
  newPassword: {
    borderColor: '#cad1db',
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
    borderRadius: '20@s',
  },
  textCancel: {
    color: '#000000',
    fontSize: '16@ms',
    marginLeft: '10@s',
    marginRight: '10@s',
    ...Fonts.Ubuntu_Regular,
  },
  updateContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '40@s',
    marginLeft: '10@s',
    borderRadius: '20@s',
  },
  textUpdate: {
    color: '#000000',
    fontSize: '16@ms',
    marginLeft: '10@s',
    marginRight: '10@s',
    ...Fonts.Ubuntu_Regular,
  },
  errorMessage: {
    marginTop: '5@s',
    marginLeft: '24@s',
  },
});
