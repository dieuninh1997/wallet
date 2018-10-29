import React from 'react';
import {
  View,
  TextInput,
  Image,
} from 'react-native';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import {
  CommonStyles, CommonSize, Fonts,
} from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import Consts from '../../utils/Consts';
import CreateWalletBaseScreen from './CreateWalletBaseScreen';

export default class CreateWalletByEmailScreen extends CreateWalletBaseScreen {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWalletByEmailScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  })

  getLoginType = () => Consts.LOGIN_TYPES.EMAIL

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _validateUsername = () => {
    const { createWalletInfo } = this.state;

    if (!this.validateEmail(createWalletInfo.email)) {
      throw new Error(I18n.t('createWalletByEmailScreen.emailInvalid'));
    }
  }

  _renderUsernameInput = () => (
    <View style={[styles.inputContainer]}>
      <Image
        source={require('../../../assets/email/email.png')}
        style={styles.inputImageIcon}
      />
      <TextInput
        placeholder={I18n.t('createWalletByEmailScreen.inputEmail')}
        editable
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        style={styles.inputText}
        onChangeText={value => this._handleChangeInput(CreateWalletBaseScreen.WALLET_INFO.EMAIL, value)}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  inputContainer: {
    flex: 1,
    width: '330@s',
    flexDirection: 'row',
    paddingHorizontal: '10@s',
    alignItems: 'center',
  },

  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '5@s',
  },

  inputText: {
    flex: 7,
    fontSize: CommonSize.inputFontSize,
    ...Fonts.Ubuntu_Light,
  },
});
