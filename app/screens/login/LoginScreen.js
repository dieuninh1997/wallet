import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';


class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('signin.title'),
    headerTitleStyle: styles.headerTitle,
    headerRight: (<View />),
  })

  _renderFormLogin = () => (
    <View style={styles.formLoginContainer}>
      <View style={styles.inputWalletContainer}>
        <MaterialCommunityIcons
          name="watermark"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Wallet ID"
          editable
          underlineColorAndroid="transparent"
          style={styles.inputText}
        />
      </View>

      <View style={styles.inputPasswordContainer}>
        <MaterialCommunityIcons
          name="key-variant"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Password"
          editable
          underlineColorAndroid="transparent"
          style={styles.inputText}
        />
      </View>
    </View>
  )

  _renderBtnForgotPassword = () => (
    <View style={styles.btnForgotPassContainer}>
      <TouchableOpacity
        style={styles.btnForgotPass}
      >
        <MaterialCommunityIcons
          name="key-variant"
        />
        <Text style={styles.btnForgotPassText}>{I18n.t('signin.forgotPassword')}</Text>
      </TouchableOpacity>
    </View>
  )

  _renderBtnLogin = () => (
    <MangoGradientButton
      btnText={I18n.t('signin.title')}
      btnStyle={styles.btnSigninContainer}
      onPress={() => true}
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  formLoginContainer: {
    marginTop: '34@s',
    height: '120@s',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '25@s',
    borderWidth: 1,
    borderColor: '#DEE3E9',
  },

  inputWalletContainer: {
    flex: 1,
    width: '340@s',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DEE3E9',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },

  inputPasswordContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '340@s',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },

  inputIcon: {
    flex: 1,
    fontSize: '22@s',
  },

  inputText: {
    flex: 7,
    fontSize: '18@s',
    fontWeight: '100',
  },

  btnForgotPassContainer: {
    marginTop: '15@s',
    alignItems: 'flex-end',
  },

  btnForgotPass: {
    flexDirection: 'row',
    width: '160@s',
    height: '34@s',
    backgroundColor: '#E5EAF1',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '17@s',
  },

  btnForgotPassText: {
    color: '#5F7AC7',
    marginLeft: '10@s',
  },

  btnSigninContainer: {
    width: '220@s',
  },
});
