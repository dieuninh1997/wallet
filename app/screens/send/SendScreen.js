import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import I18n from '../../i18n/i18n';
import MangoMenuButton from '../common/MangoMenuButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';

class SendScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoMenuButton navigation={navigation} />,
    title: I18n.t('send.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.headerWithDropdown,
  })

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
      onPress={() => true}
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

  // Section form send coin
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
  },
});