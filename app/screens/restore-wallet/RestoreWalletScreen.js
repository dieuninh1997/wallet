import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import crypto from 'crypto';

import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';
import MangoGradientButton from '../common/MangoGradientButton';
import AppConfig from '../../utils/AppConfig';
import { restoreAccount } from '../../api/user/UserRequest';
import WalletService from '../../services/wallet';
import AppPreferences from '../../utils/AppPreferences';

class RestoreWalletScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('restoreWalletScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  static RESTORE_INFO = {
    MNEMONIC: 'mnemonic',
  };

  constructor(props) {
    super(props);

    this.state = {
      restoreInfo: {
        mnemonic: null,
      },
    };
  }

  _handleChangeInput = (typeInput, value) => {
    const { restoreInfo } = this.state;

    restoreInfo[typeInput] = value;
    this.setState({
      restoreInfo,
    });
  }

  _handleClickRestore = async () => {
    const { restoreInfo } = this.state;
    const { navigation } = this.props;
    const { mnemonic } = restoreInfo;

    try {
      const mnemonicHash = crypto.createHmac('sha256', mnemonic)
        .update(AppConfig.getClientSecret())
        .digest('hex');

      const restoreAccountInfo = await restoreAccount(mnemonicHash);
      console.log('restoreAccountInfo', restoreAccountInfo);

      const wallet = await WalletService.importWalletFromMnemonic('eth', mnemonic);

      await AppPreferences.saveAccessToken(restoreAccountInfo.data.accessToken);
      await AppPreferences.savePrivateKey(wallet.privateKey);
      window.GlobalSocket.connect();
      Keyboard.dismiss();

      await AsyncStorage.setItem('address', wallet.address);
      navigation.navigate('MainScreen');
    } catch (error) {
      console.log('RestoreWalletScreen._error: ', error);
    }
  }

  _renderFormRestore() {
    return (
      <View style={styles.restoreWalletContainer}>
        <Text style={styles.textRestoreWallet}>{I18n.t('restoreWalletScreen.titleForm')}</Text>
        <View style={styles.inputRestoreWalletContainer}>
          <TextInput
            placeholder={I18n.t('restoreWalletScreen.inputPlaceholder')}
            editable
            underlineColorAndroid="transparent"
            style={styles.inputWallet}
            onChangeText={value => this._handleChangeInput(RestoreWalletScreen.RESTORE_INFO.MNEMONIC, value)}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this._renderFormRestore()}
        </ScrollView>

        <MangoGradientButton
          btnText={I18n.t('restoreWalletScreen.title')}
          btnStyle={styles.btnRestoreWaletContainer}
          onPress={() => this._handleClickRestore()}
        />
      </View>
    );
  }
}

export default RestoreWalletScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.screenBgColor,
    alignItems: 'center',
  },

  restoreWalletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textRestoreWallet: {
    marginVertical: '30@s',
    marginHorizontal: '15@s',
    textAlign: 'center',
    fontSize: '16@ms',
    color: '#000',
    fontWeight: '200',
  },

  inputRestoreWalletContainer: {
    width: '340@s',
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: '27@s',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    borderColor: '#e4e8ed',
    borderWidth: '1@s',
  },

  inputWallet: {
    width: '300@s',
    fontSize: '18@s',
    textAlign: 'center',
  },

  btnRestoreWaletContainer: {
    width: '240@s',
    marginBottom: '20@s',
    marginHorizontal: '5@s',
  },
});