import React, { Component } from 'react';
import {
  View, Image, TextInput,
} from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize } from '../../utils/CommonStyles';
import MangoBackButton from '../common/MangoBackButton';
import MangoGradientButton from '../common/MangoGradientButton';
import I18n from '../../i18n/i18n';
import { ressetPassword } from '../../api/user/UserRequest';
import VerifyYourEmailModal from './VerifyYourEmailModal';
import UIUtils from '../../utils/UIUtils';

export default class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('resetPassword.forgotPassword'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }

  _handleChangeInputEmail = (email) => {
    this.setState({
      email,
    });
  }

  _validateEmail = () => {
    const { email } = this.state;

    if (!email) {
      UIUtils.showToastMessage(I18n.t('resetPassword.emailFieldRequired'));
      return false;
    }

    if (!UIUtils.validateEmail(email)) {
      UIUtils.showToastMessage(I18n.t('resetPassword.invalidEmail'));
      return false;
    }
    return true;
  }

  _handleResetPassword = async () => {
    const { email } = this.state;

    if (!this._validateEmail()) {
      return;
    }
    try {
      const responseUser = await ressetPassword(email);

      this.emailAddress.clear();
      this.setState({
        email: '',
      });
      this._emailModal.setModalVisible(true);
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]]);
      } else {
        UIUtils.showToastMessage(error.message);
      }
    }
  }

  render() {
    return (
      <View style={styles.forgotPassword}>
        <VerifyYourEmailModal ref={ref => this._emailModal = ref} />
        <View style={styles.inputContainer}>
          <Image
            source={require('../../../assets/email/email.png')}
            style={styles.emailIcon}
          />
          <TextInput
            placeholder={I18n.t('resetPassword.emailAddress')}
            editable
            ref={(input) => { this.emailAddress = input; }}
            underlineColorAndroid="transparent"
            style={styles.inputText}
            onChangeText={value => this._handleChangeInputEmail(value)}
          />
        </View>
        <MangoGradientButton
          btnText={I18n.t('resetPassword.resetPassword')}
          btnStyle={styles.btnResetPassword}
          onPress={() => this._handleResetPassword()}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  forgotPassword: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
  inputContainer: {
    marginTop: '52@s',
    borderRadius: '28@s',
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(202, 209, 219)',
    width: '90%',
    height: '56@s',
    flexDirection: 'row',
    borderWidth: 1,
  },
  emailIcon: {
    width: '30@s',
    height: '30@s',
    marginTop: '13@s',
    marginLeft: '25@s',
  },
  inputText: {
    fontSize: CommonSize.inputFontSize,
    width: '270@s',
    marginLeft: '10@s',
    ...Fonts.Ubuntu_Light,
  },
  btnResetPassword: {
    marginTop: '27@s',
    width: '247@s',
    height: '48@s',
    marginBottom: '20@s',
    marginHorizontal: '5@s',
  },
  messageSuccess: {
    width: '90%',
    marginTop: '50@s',
  },
});
