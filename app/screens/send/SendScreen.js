import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors, Fonts } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';
import WalletService from '../../services/wallet';
import AppPreferences from '../../utils/AppPreferences';
import AppConfig from '../../utils/AppConfig';

class SendScreen extends Component {
  static FORM_SEND = {
    RECIEVED_ADDRESS: 'recievedAddress',
    COIN_VALUE: 'coinValue',
  }

  static LIST_FEE = [
    {
      title: 'Slowly',
      value: 3.0,
    },
    {
      title: 'Regular',
      value: 5.0,
    },
    {
      title: 'Fast',
      value: 20.0,
    },
  ];

  constructor(props) {
    super(props);
    const listFee = SendScreen.LIST_FEE;
    const feeSelected = listFee[0];

    this.state = {
      formSendCoin: {
        recievedAddress: null,
        coinValue: 0.0000,
        feeValue: feeSelected.value,
      },
      isShowMenuSelectFee: false,
      feeSelected,
      listFee,
    };
  }

  componentDidMount = async () => {
    try {
      const { listFee, formSendCoin } = this.state;
      const currentGasPrices = await WalletService.getCurrentGasPrices();
      console.log('currentGasPrices', currentGasPrices);

      listFeeNew = listFee.map((fee) => {
        fee.value = currentGasPrices[fee.title.toLowerCase()];
        return fee;
      });
      console.log('<-----------listFeeNew----------->', listFeeNew);
      formSendCoin.feeValue = listFeeNew[0].value;
      this.setState({
        listFee: listFeeNew,
        feeSelected: listFeeNew[0],
        formSendCoin,
      });
    } catch (error) {
      console.log('SendScreen.componentDidMount._error: ', error);
    }
  }

  _toggleMenu() {
    const { isShowMenuSelectFee } = this.state;
    this.setState({ isShowMenuSelectFee: !isShowMenuSelectFee });
  }

  _hideMenu() {
    this.setState({ isShowMenuSelectFee: false });
  }

  _handleChangeTextInput = (input, value) => {
    const { formSendCoin } = this.state;
    formSendCoin[input] = value;
    this.setState({
      formSendCoin,
    });
  }

  _validateSendCoin = (formSendCoin = {}) => {
    if (!formSendCoin.recievedAddress) {
      AppPreferences.showToastMessage('Recieved address is required!');
      return false;
    }
    if (!WalletService.isValidAddress('mgc', formSendCoin.recievedAddress)) {
      AppPreferences.showToastMessage('Recieved address is not valid!');
      return false;
    }

    if (!formSendCoin.coinValue) {
      AppPreferences.showToastMessage('Coin value is not valid!');
      return false;
    }
    return true;
  }

  _handleSendCoin = async () => {
    const { formSendCoin } = this.state;
    console.log('formSendCoin', formSendCoin);
    if (!this._validateSendCoin(formSendCoin)) {
      return;
    }

    try {
      const walletAddress = await AsyncStorage.getItem('address');
      const privateKey = AppConfig.PRIVATE_KEY;
      console.log('walletAddress', walletAddress);
      console.log('privateKey', privateKey);

      const transaction = await WalletService.sendTransaction('mgc4', walletAddress, formSendCoin.recievedAddress, privateKey, formSendCoin.coinValue, formSendCoin.feeValue);
      console.log('SendScreen.transaction: ', transaction);
    } catch (error) {
      AppPreferences.showToastMessage(error.message);
      console.log('SendScreen._error: ', error);
    }
  }

  _handleChangeFee = (feeSelected) => {
    const { formSendCoin } = this.state;

    formSendCoin.feeValue = feeSelected.value;

    this.setState({
      feeSelected,
      formSendCoin,
      isShowMenuSelectFee: false,
    });
  }

  _renderItemMenu(item, index) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleChangeFee(item)}
        key={index}
      >
        <View style={styles.itemMenuGroup}>
          <Text style={styles.contentMenuOption}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderMenuOptions() {
    const { isShowMenuSelectFee, listFee } = this.state;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isShowMenuSelectFee}
        avoidKeyboard
        useNativeDriver
        // backdropOpacity={0}
        onBackButtonPress={() => this._hideMenu()}
        onBackdropPress={() => this._hideMenu()}
      >
        <View style={styles.modalListCoinContainer}>
          <View style={styles.modalListCoin}>
            {listFee.map((fee, index) => this._renderItemMenu(fee, index))}
          </View>
        </View>
      </Modal>
    );
  }

  _renderFormSend = () => {
    const { formSendCoin, feeSelected } = this.state;
    return (
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
            onChangeText={value => this._handleChangeTextInput(SendScreen.FORM_SEND.RECIEVED_ADDRESS, value)}
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
              onChangeText={value => this._handleChangeTextInput(SendScreen.FORM_SEND.COIN_VALUE, value)}
            />
          </View>
          <View
            style={[
              styles.inputCoinValue,
              { marginLeft: 'auto', backgroundColor: '#f5f7fa' },
            ]}
          >
            <Text style={styles.inputTextLabel}>USD</Text>
            <TextInput
              editable={false}
              value={formSendCoin.coinValue.toString()}
              underlineColorAndroid="transparent"
              style={styles.inputText}
            />
          </View>
        </View>

        <TouchableWithoutFeedback
          onPress={() => this._toggleMenu()}
        >
          <View style={styles.inputFeeContainer}>
            <Text style={styles.inputTextLabel}>FEE</Text>
            <Text style={styles.textFeeSelected}>{feeSelected.title}</Text>
            <Image
              source={require('../../../assets/arrow-down/down-arrow.png')}
              style={styles.imageDropdownIcon}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _renderBtnContinue = () => (
    <View style={styles.buttonFixBottom}>
      <MangoGradientButton
        btnText={I18n.t('send.continue')}
        btnStyle={styles.btnContinue}
        buttonTextStyle={styles.buttonTextStyle}
        onPress={() => this._handleSendCoin()}
      />
    </View>

  )

  render() {
    const { isShowMenuSelectFee } = this.state;

    return (
      <View style={[styles.container]}>
        <MangoDropdown />
        {this._renderFormSend()}
        {isShowMenuSelectFee ? this._renderMenuOptions() : null}
        {this._renderBtnContinue()}

        {/* <ImageBackground source={require('../../../assets/image-button/rectangle.png')} style={styles.btnContinuee}>
          <Text> adasd</Text>
        </ImageBackground> */}
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
    height: '48@s',
    borderRadius: '29@s',
    borderWidth: 1,
    borderColor: '#cad1db',
    paddingHorizontal: '22@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  imageWallet: {
    width: '21@s',
    height: '18@s',
    marginRight: '5@s',
  },

  inputText: {
    width: '92%',
    fontSize: '16@s',
    fontWeight: '100',
  },

  inputTextFee: {
    flex: 7,
    marginLeft: '7@s',
    fontSize: '16@s',
  },

  imageDropdownIcon: {
    marginLeft: 'auto',
    width: '12@s',
    height: '6@s',
  },

  inputCoinValueContainer: {
    flexDirection: 'row',
    marginVertical: '15@s',
  },

  inputCoinValue: {
    flexDirection: 'row',
    width: '165@s',
    height: '40@s',
    borderRadius: '29@s',
    borderWidth: 1,
    borderColor: '#cad1db',
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  inputTextLabel: {
    fontSize: '16@ms',
    color: CommonColors.headerTitleColor,
    marginRight: '5@s',
    ...Fonts.Ubuntu_Regular,
  },

  inputFeeContainer: {
    width: '340@s',
    height: '40@s',
    borderRadius: '29@s',
    borderWidth: 1,
    borderColor: '#cad1db',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  textFeeSelected: {
    fontSize: '16@ms',
    marginLeft: '20@s',
    ...Fonts.Ubuntu_Light,
  },

  buttonTextStyle: {
    fontSize: '20@ms',
    ...Fonts.Ubuntu_Regular,
  },

  modalListCoinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalListCoin: {
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20@s',
    marginTop: '20@s',
    width: '176@s',
    height: '148@s',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  itemMenuGroup: {
    paddingVertical: '10@s',
  },

  contentMenuOption: {
    color: '#2f64d1',
    fontSize: '18@ms',
    ...Fonts.Ubuntu_Light,
  },

  // Section button continue
  buttonFixBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  btnContinue: {
    width: '247@s',
    height: '48@s',
    borderRadius: '28@s',
    marginBottom: '130@s',
    marginHorizontal: '5@s',
  },
  btnContinuee: {
    width: '262@s',
    height: '64@s',
    borderRadius: '28@s',
    marginBottom: '130@s',
    marginHorizontal: '5@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
