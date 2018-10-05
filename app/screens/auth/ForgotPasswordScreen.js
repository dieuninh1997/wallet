import React, { Component } from 'react';
import {
  View, Text, Image, TextInput,
} from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import AppConfig from '../../utils/AppConfig';
import MangoBackButton from '../common/MangoBackButton';
import MangoGradientButton from '../common/MangoGradientButton';
import I18n from '../../i18n/i18n';
import { ressetPassword } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';

export default class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: AppConfig.ACCESS_TOKEN ? <View /> : <MangoBackButton navigation={navigation} />,
    title: I18n.t('resetPassword.forgotPassword'),
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

  _handleChangeInputEmail = (email) => {
    this.setState({
      email,
    });
  }

  _backToLogin = () => {
    const { navigation } = this.props;

    navigation.navigate('LoginScreen');
  }

  _handleResetPassword = async () => {
    try {
      const responseUser = await ressetPassword(this.state.email);

      this.setState({
        isSubmitSuccess: true,
      });
    } catch (error) {
      this.setState({
        isSubmitSuccess: false,
      });
      if (error.errors) {
        AppPreferences.showToastMessage(error.errors[Object.keys(error.errors)[0]]);
      } else {
        AppPreferences.showToastMessage(error.message);
      }
    }
  }

  render() {
    const { isSubmitSuccess } = this.state;
    let contentShow;

    if (!isSubmitSuccess) {
      contentShow = (
        <View style={styles.forgotPassword}>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../../assets/createwalet/email.png')}
              style={styles.emailIcon}
            />
            <TextInput
              placeholder={I18n.t('resetPassword.emailAddress')}
              editable
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
    } else {
      contentShow = (
        <View style={styles.forgotPassword}>
          <Text style={styles.messageSuccess}>{I18n.t('resetPassword.resetPasswordSuccessMessage')}</Text>
          <MangoGradientButton
            btnText={I18n.t('genneralText.back')}
            btnStyle={styles.btnResetPassword}
            onPress={() => this._backToLogin()}
          />
        </View>
      );
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
    marginBottom: '20@s',
  },
  messageSuccess: {
    width: '90%',
    marginTop: '50@s',
  },
});
