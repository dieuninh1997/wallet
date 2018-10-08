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
    width: '23@s',
    height: '23@s',
    marginTop: '16.5@s',
    marginLeft: '25@s',
  },
  inputText: {
    fontSize: '18@s',
    fontWeight: '100',
    width: '270@s',
    marginLeft: '10@s',
  },
  btnResetPassword: {
    marginTop: '27@s',
    width: '247@s',
    height: '48@s',
    marginBottom: '20@s',
  },
  messageSuccess: {
    width: '90%',
    marginTop: '50@s',
  },
});
