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
import TouchID from 'react-native-touch-id';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import {
  CommonStyles, CommonColors, CommonSize, Fonts,
} from '../../utils/CommonStyles';
import { login } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import UIUtils from '../../utils/UIUtils';
import AppConfig from '../../utils/AppConfig';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: AppConfig.ACCESS_TOKEN ? <View /> : <MangoBackButton navigation={navigation} />,
    title: I18n.t('signin.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (
      <View>
        <TouchableOpacity
          style={styles.btnCreate}
          onPress={() => { navigation.navigate('CreateWalletScreen'); }}
        >
          <View>
            <Text style={styles.txtLblCreate}>{I18n.t('signin.btnCreate')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ),
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

  componentDidMount = () => {
    // if (AppConfig.ACCESS_TOKEN && AppConfig.PRIVATE_KEY) {
    //   this._handlerLoginWithTouchId();
    // }
  }

  _handleClickLogin = async () => {
    const { loginInfo } = this.state;
    const { navigation } = this.props;
    const { email, password } = loginInfo;

    try {
      const responseUser = await login(email, password);
      console.log('responseUser', responseUser);

      AppPreferences.saveToKeychain('access_token', responseUser.access_token);
      window.GlobalSocket.connect();
      Keyboard.dismiss();
      navigation.navigate('RestoreWalletScreen');
    } catch (error) {
      if (error.errors) {
        UIUtils.showToastMessage(error.errors[Object.keys(error.errors)[0]]);
      } else {
        UIUtils.showToastMessage(error.message);
      }
    }
  }

  _handleChangeInput = (typeInput, value) => {
    const { loginInfo } = this.state;

    loginInfo[typeInput] = value;
    this.setState({
      loginInfo,
    });
  }

  _handleForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('ForgotPasswordScreen');
  }

  _handlerLoginWithTouchId = () => {
    const { navigation } = this.props;

    const optionalConfigObject = {
      title: 'Authentication Required',
      color: '#e00606',
      sensorDescription: 'Open',
      cancelText: 'Cancel',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
    };

    TouchID.authenticate('Touch to unlock your phone', optionalConfigObject)
      .then(() => {
        navigation.navigate('DashboardScreen');
      })
      .catch(() => {
        UIUtils.showToastMessage('Authentication Failed');
      });
  }

  _renderFormLogin = () => (
    <View style={styles.formLoginContainer}>
      <View style={[styles.inputContainer, styles.inputWalletIdContainer]}>
        <Image
          source={require('../../../assets/wallet/wallet.png')}
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
          source={require('../../../assets/forgot-password/forgotPass.png')}
          style={styles.inputImageIcon}
        />
        <Text onPress={() => this._handleForgotPassword()} style={styles.btnForgotPassText}>{I18n.t('signin.forgotPassword')}</Text>
      </TouchableOpacity>
    </View>
  )

  // _renderBtnLoginWithTouchId = () => (
  //   <View style={{ alignSelf: 'center' }}>
  //     <TouchableOpacity
  //       onPress={() => this._handlerLoginWithTouchId()}
  //     >
  //       <Image
  //         source={require('../../../assets/fingerprint/fingerprint.png')}
  //         style={styles.fingerPrintImage}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // )

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
          {this._renderBtnLogin()}
          {/* { AppConfig.ACCESS_TOKEN ? this._renderBtnLoginWithTouchId() : null } */}
          {this._renderBtnForgotPassword()}
        </ScrollView>

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
    marginTop: '24@s',
    height: '112@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '28@s',
    borderWidth: 1,
    borderColor: '#cad1db',
  },

  inputContainer: {
    flex: 1,
    width: '338@s',
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

  fingerPrintImage: {
    width: '50@s',
    height: '50@s',
    marginBottom: '24@s',
  },

  inputText: {
    flex: 7,
    fontSize: '18@ms',
    fontWeight: '100',
  },

  btnForgotPassContainer: {
    alignItems: 'center',
  },

  btnForgotPass: {
    flexDirection: 'row',
    width: '158@s',
    height: '40@s',
    borderRadius: '20@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6ebf2',
  },

  btnCreate: {
    flexDirection: 'row',
    width: '80@s',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtLblCreate: {
    fontSize: CommonSize.headerFontSize,
    color: '#8d96b1',
    ...Fonts.Ubuntu_Regular,
  },

  btnForgotPassText: {
    color: '#26304d',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },

  btnSigninContainer: {
    width: '247@s',
    height: '48@s',
    marginBottom: '24@s',
    marginTop: '21@s',
    alignSelf: 'center',
  },
});
