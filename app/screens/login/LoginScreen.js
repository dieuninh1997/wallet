import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-root-toast';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import { login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('signin.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  static LOGIN_INFO = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        email: null,
        password: null,
      },
    };
  }

  _handleClickLogin = async () => {
    const { loginInfo } = this.state;
    const { navigation } = this.props;

    const { email, password } = loginInfo;

    try {
      const responseUser = await login(email, password);

      AppPreferences.saveAccessToken(responseUser.access_token);
      window.GlobalSocket.connect();
      Keyboard.dismiss();
      navigation.navigate('MainScreen');
    } catch (error) {
      Toast.show(error.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      console.log('LoginRequest._error: ', error);
    }
  }

  _handleChangeInput = (typeInput, value) => {
    const { loginInfo } = this.state;

    loginInfo[typeInput] = value;
    this.setState({
      loginInfo,
    });
  }

  _renderFormLogin = () => (
    <View style={styles.formLoginContainer}>
      <View style={[styles.inputContainer, styles.inputWalletIdContainer]}>
        <Image
          source={require('../../../assets/wallet/wallet-login.png')}
          style={styles.inputImageIcon}
        />
        <TextInput
          placeholder={I18n.t('signin.inputWalletId')}
          editable
          underlineColorAndroid="transparent"
          style={styles.inputText}
          onChangeText={value => this._handleChangeInput(LoginScreen.LOGIN_INFO.EMAIL, value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require('../../../assets/password/key.png')}
          style={styles.inputImageIcon}
        />
        <TextInput
          placeholder={I18n.t('signin.inputPassword')}
          editable
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.inputText}
          onChangeText={value => this._handleChangeInput(LoginScreen.LOGIN_INFO.PASSWORD, value)}
        />
      </View>
    </View>
  )

  _renderBtnForgotPassword = () => (
    <View style={styles.btnForgotPassContainer}>
      <TouchableOpacity
        style={styles.btnForgotPass}
      >
        <Image
          source={require('../../../assets/forgot-password/forgot-password.png')}
          style={styles.inputImageIcon}
        />
        <Text style={styles.btnForgotPassText}>{I18n.t('signin.forgotPassword')}</Text>
      </TouchableOpacity>
    </View>
  )

  _renderBtnLogin = () => (
    <MangoGradientButton
      btnText={I18n.t('signin.title')}
      btnStyle={styles.btnSigninContainer}
      onPress={() => this._handleClickLogin()}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this._renderFormLogin()}
          {this._renderBtnForgotPassword()}
        </ScrollView>
        {this._renderBtnLogin()}
      </View>
    );
  }
}

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: CommonColors.screenBgColor,
  },

  formLoginContainer: {
    marginTop: '46@s',
    height: '130@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '25@s',
    borderWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  inputContainer: {
    flex: 1,
    width: '340@s',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },

  inputWalletIdContainer: {
    borderBottomWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '10@s',
  },

  inputText: {
    flex: 7,
    fontSize: '18@s',
    fontWeight: '100',
  },

  btnForgotPassContainer: {
    marginTop: '18@s',
    alignItems: 'flex-end',
  },

  btnForgotPass: {
    flexDirection: 'row',
    width: '180@s',
    height: '36@s',
    borderRadius: '18@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5EAF1',
  },

  btnForgotPassText: {
    color: '#5F7AC7',
  },

  btnSigninContainer: {
    width: '220@s',
    marginBottom: '24@s',
  },
});
