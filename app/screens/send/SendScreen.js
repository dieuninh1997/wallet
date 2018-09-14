import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import MangoMenuButton from '../common/MangoMenuButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonStyles } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';

class SendScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoMenuButton navigation={navigation} />,
    title: I18n.t('send.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
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
          placeholder="Wallet Address"
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
        <MaterialCommunityIcons
          style={styles.selectFeeIcon}
          name="chevron-down"
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

  textCoin: {
    color: '#FFF',
    fontSize: '18@s',
    marginHorizontal: '15@s',
  },

  coinIcon: {
    color: '#FFF',
    fontSize: '30@s',
  },

  selectCoinIcon: {
    color: '#FFF',
    fontSize: '18@s',
  },

  selectFeeIcon: {
    color: '#DEE3E9',
    fontSize: '24@s',
  },

  // Section form send coin
  formSendContainer: {
    marginTop: '30@s',
  },

  inputAddressContainer: {
    width: '340@s',
    height: '46@s',
    borderRadius: '23@s',
    borderWidth: 1,
    borderColor: '#DEE3E9',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: '#FFF',
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

  inputCoinValueContainer: {
    flexDirection: 'row',
    marginVertical: '15@s',
  },

  inputCoinValue: {
    width: '160@s',
    height: '46@s',
    borderRadius: '23@s',
    borderWidth: 1,
    borderColor: '#DEE3E9',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  inputTextLabel: {
    fontSize: '17@s',
    color: '#000',
    marginRight: '5@s',
  },

  inputFeeContainer: {
    width: '340@s',
    height: '46@s',
    borderRadius: '23@s',
    borderWidth: 1,
    borderColor: '#DEE3E9',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  // Section button continue
  btnContinue: {
    width: '260@s',
  },
});
