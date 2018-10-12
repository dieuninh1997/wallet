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

export default class CreateWalletByPassportScreen extends CreateWalletBaseScreen {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createWalletByPassportScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  })

  getLoginType = () => Consts.LOGIN_TYPES.PASSPORT

  _renderUsernameInput = () => (
    <View style={[styles.inputContainer]}>
      <Image
        source={require('../../../assets/passport/passport.png')}
        style={styles.inputImageIcon}
      />
      <TextInput
        placeholder={I18n.t('createWalletByPassportScreen.inputEmail')}
        editable
        keyboardType="numeric"
        underlineColorAndroid="transparent"
        style={styles.inputText}
        onChangeText={value => this._handleChangeInput(CreateWalletByPassportScreen.WALLET_INFO.PASSPORT, value)}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  inputContainer: {
    flex: 1,
    width: '330@s',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },


  inputImageIcon: {
    width: '24@s',
    height: '24@s',
    marginRight: '10@s',
  },


  inputText: {
    flex: 7,
    fontSize: CommonSize.inputFontSize,
    ...Fonts.Ubuntu_Light,
  },
});
