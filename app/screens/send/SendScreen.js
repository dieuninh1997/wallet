import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  AsyncStorage,
} from 'react-native';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';
import WalletService from '../../services/wallet';
import AppPreferences from '../../utils/AppPreferences';
import AppConfig from '../../utils/AppConfig';

class SendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
    };
  }

  _handleSendCoin = async () => {
    try {
      const walletAddress = await AsyncStorage.getItem('address');
      const privateKey = AppConfig.PRIVATE_KEY;
      console.log('walletAddress', walletAddress);
      console.log('privateKey', privateKey);

      const transaction = await WalletService.sendTransaction('mgc4', '0x5C7738b67a3403F349782244E59E776DdB3581c3', '0xd007d3be383aa5c890b4728e570ddc9d05bcc021', '0xC5CB8DAB4FAC56FE48C830BE9F2912D1189E6C0EBA9CA278A85124CF195A997D', 0, 0.0005);
      console.log('SendScreen.transaction: ', transaction);
    } catch (error) {
      console.log('SendScreen._error: ', error);
    }
  }

  _renderFormSend = () => (
    <View style={styles.formSendContainer}>
      <View style={styles.inputAddressContainer}>
        <Image
          source={require('../../../assets/wallet/wallet.png')}
          style={styles.imageWallet}
        />
        <TextInput
          editable
          placeholder={I18n.t('send.walletAddress')}
          underlineColorAndroid="transparent"
          style={styles.inputText}
        />
      </View>

      <View style={styles.inputCoinValueContainer}>
        <View style={styles.inputCoinValue}>
          <Text style={styles.inputTextLabel}>MGC</Text>
          <TextInput
            keyboardType="numeric"
            editable
            placeholder="0.0000"
            underlineColorAndroid="transparent"
            style={styles.inputText}
          />
        </View>
        <View
          style={[
            styles.inputCoinValue,
            { marginLeft: 'auto' },
          ]}
        >
          <Text style={styles.inputTextLabel}>USD</Text>
          <TextInput
            editable
            keyboardType="numeric"
            placeholder="0.0000"
            underlineColorAndroid="transparent"
            style={styles.inputText}
          />
        </View>
      </View>

      <View style={styles.inputFeeContainer}>
        <Text style={styles.inputTextLabel}>FEE</Text>
        <TextInput
          editable
          placeholder="Regular"
          placeholderTextColor="#000"
          underlineColorAndroid="transparent"
          style={styles.inputTextFee}
        />
        <Image
          source={require('../../../assets/arrow-down/down-arrow.png')}
          style={styles.imageDropdownIcon}
        />
      </View>
    </View>
  )

  _renderBtnContinue = () => (
    <MangoGradientButton
      btnText={I18n.t('send.continue')}
      btnStyle={styles.btnContinue}
      onPress={() => this._handleSendCoin()}
    />
  )

  render() {
    return (
      <View style={[styles.container]}>
        <MangoDropdown />
        <ScrollView>
          {this._renderFormSend()}
        </ScrollView>
        {this._renderBtnContinue()}
      </View>
    );
  }
}
export default SendScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  formSendContainer: {
    marginTop: '30@s',
  },

  inputAddressContainer: {
    flexDirection: 'row',
    width: '340@s',
    height: '54@s',
    borderRadius: '27@s',
    borderWidth: 1,
    borderColor: CommonColors.customBorderColor,
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  imageWallet: {
    width: '24@s',
    height: '24@s',
    marginRight: '5@s',
  },

  inputText: {
    width: '92%',
    fontSize: '18@s',
    fontWeight: '100',
  },

  inputTextFee: {
    flex: 7,
    marginLeft: '7@s',
    fontSize: '16@s',
  },

  imageDropdownIcon: {
    width: '18@s',
    height: '18@s',
  },

  inputCoinValueContainer: {
    flexDirection: 'row',
    marginVertical: '15@s',
  },

  inputCoinValue: {
    flexDirection: 'row',
    width: '160@s',
    height: '46@s',
    borderRadius: '23@s',
    borderWidth: 1,
    borderColor: CommonColors.customBorderColor,
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  inputTextLabel: {
    fontSize: '17@s',
    color: CommonColors.headerTitleColor,
    marginRight: '5@s',
  },

  inputFeeContainer: {
    width: '340@s',
    height: '46@s',
    borderRadius: '23@s',
    borderWidth: 1,
    borderColor: CommonColors.customBorderColor,
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  // Section button continue
  btnContinue: {
    width: '260@s',
    marginBottom: '24@s',
    marginHorizontal: '5@s',
  },
});
