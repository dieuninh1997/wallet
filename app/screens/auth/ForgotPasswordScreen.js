import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import AppConfig from '../../utils/AppConfig';
import MangoBackButton from '../common/MangoBackButton';
import MangoGradientButton from '../common/MangoGradientButton';
import I18n from '../../i18n/i18n';
import { ressetPassword } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';

export default class ForgotPasswordScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    headerLeft: AppConfig.ACCESS_TOKEN ? <View /> : <MangoBackButton navigation={navigation} />,
    title: 'Forgot Password',
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isSubmitSuccess: false,
    };
  }

  _handleChangeInputEmail = (value) => {
    this.setState({
      email: value,
    });
  }

  _handleResetPassword = async () => {
    try {
      const responseUser = await ressetPassword(this.state.email);
      console.log('===================> success', responseUser);
      this.setState({
        isSubmitSuccess: true,
      });
    } catch (error) {
      console.log('===================> error', error);
      this.setState({
        isSubmitSuccess: false,
      });
      AppPreferences.showToastMessage(error.message);
    }
  }

  render() {
    const isSuccess = this.state.isSubmitSuccess;
    let contentShow;
    if (!isSuccess) {
      contentShow = <View style={styles.forgotPassword}><View style={styles.inputContainer}>
          <Image
            source={require('../../../assets/createwalet/email.png')}
            style={styles.emailIcon}
          />
          <TextInput
            placeholder="Email Address"
            editable
            underlineColorAndroid="transparent"
            style={styles.inputText}
            onChangeText={value => this._handleChangeInputEmail(value)}
          />
        </View>
        <MangoGradientButton
          btnText="Reset Password"
          btnStyle={styles.btnResetPassword}
          onPress={() => this._handleResetPassword()}
        />
      </View>
    } else {
      contentShow = <View style={styles.forgotPassword}><Text style={styles.messageSuccess}>Reset password link was sent to your email/phone number. Please follow the instruction to reset password.</Text></View>
    }

    return (contentShow);
  }
}

const styles = ScaledSheet.create({
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: '50@s',
    borderRadius: '25@s',
    backgroundColor: CommonColors.screenBgColor,
    borderColor: CommonColors.customBorderColor,
    width: '90%',
    flexDirection: 'row',
  },
  emailIcon: {
    width: '24@s',
    height: '24@s',
    marginTop: '10@s',
    marginLeft: '12@s',
  },
  inputText: {
    fontSize: '18@s',
    fontWeight: '100',
    width: '270@s',
    marginLeft: '10@s',
  },
  btnResetPassword: {
    marginTop: '50@s',
    width: '220@s',
  },
  messageSuccess: {
    width: '90%',
    marginTop: '50@s',
  }
});
