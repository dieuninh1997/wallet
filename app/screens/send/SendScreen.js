import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import { withNavigationFocus } from 'react-navigation';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoGradientButton from '../common/MangoGradientButton';
import { CommonColors, Fonts } from '../../utils/CommonStyles';
import { getPrices } from '../../api/common/BaseRequest';
import MangoDropdown from '../common/MangoDropdown';
import WalletService from '../../services/wallet';
import UIUtils from '../../utils/UIUtils';
import AppConfig from '../../utils/AppConfig';
import ConfirmationModal from '../common/ConfirmationModal';
import Events from '../../utils/Events';
import BaseScreen from '../BaseScreen';
import Consts from '../../utils/Consts';
import AppPreferences from '../../utils/AppPreferences';
import { getUserSettings } from '../../api/user/UserRequest';
import { sendMailTransaction } from '../../api/transaction-history/TransactionRequest';
import MangoLoading from '../common/MangoLoading';

class SendScreen extends BaseScreen {
  static FORM_SEND = {
    RECIEVED_ADDRESS: 'recievedAddress',
    COIN_VALUE: 'coinValue',
  }

  static LIST_FEE = [
    {
      title: I18n.t('send.titleSlowly'),
      value: 3.0,
      time: I18n.t('send.speedSlowly'),
    },
    {
      title: I18n.t('send.titleRegular'),
      value: 5.0,
      time: I18n.t('send.speedRegular'),
    },
    {
      title: I18n.t('send.titleFast'),
      value: 20.0,
      time: I18n.t('send.speedFast'),
    },
  ];

  constructor(props) {
    super(props);
    const listFee = SendScreen.LIST_FEE;
    const feeSelected = listFee[0];

    this.state = {
      formSendCoin: {
        recievedAddress: '',
        coinValue: '0',
        feeValue: feeSelected.value,
      },
      isShowMenuSelectFee: false,
      feeSelected,
      listFee,
      coinSelected: Consts.LIST_COIN[0],
      currency: 'USD',
      prices: {},
      realValueCoin: 0,
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    super.componentDidMount();
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
      await this._loadData();
    } catch (error) {
      console.log('SendScreen.componentDidMount._error: ', error);
    }
  }

  // componentDidUpdate(previousProps) {
  //   if (this.props.isFocused && !previousProps.isFocused) {
  //     this._resetFormSendCoin();
  //   }
  // }

  async _loadData() {
    await this._loadCoinSelected();
    await this._loadUserSettings();
    await this._loadPrices();
  }

  async _loadPrices() {
    const { coinSelected, formSendCoin } = this.state;
    const prices = await getPrices(coinSelected.name);

    this.setState({ prices });
    this._setRealValueCoin(formSendCoin.coinValue);
  }

  _setRealValueCoin = (value) => {
    try {
      const { coinSelected, prices, currency } = this.state;
      const newPrice = prices.RAW[coinSelected.name][currency].PRICE;
      this.setState({
        realValueCoin: parseFloat(value * newPrice).toFixed(2),
      });
    } catch (error) {
      console.log('SendScreen._setRealValueCoin._erorr: ', error);
    }
  }

  _loadCoinSelected = async () => {
    const indexCoin = await AppPreferences.getCoinSelected();
    const coinSelected = indexCoin ? Consts.LIST_COIN[parseInt(indexCoin, 10)] : Consts.LIST_COIN[0];
    this.setState({
      coinSelected,
    });
  };

  async _loadUserSettings() {
    try {
      const response = await getUserSettings();
      const settings = response.data;
      for (const setting of settings) {
        if (setting.key === Consts.USER_SETTINGS.CURRENCY) {
          this.setState({ currency: setting.value });
          break;
        }
      }
    } catch (e) {
      console.log('SendScreen._loadUserSettings', e);
    }
  }

  getDataEventHandlers() {
    return {
      [Events.COIN_SELECTED_UPDATED]: this._loadData.bind(this),
      [Events.USER_SETTINGS_UPDATED]: this._loadData.bind(this),
    };
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

  _handleChangeCoinValue = (value) => {
    const { formSendCoin } = this.state;
    formSendCoin.coinValue = value;

    this._setRealValueCoin(value);
    this.setState({
      formSendCoin,
    });
  }

  _validateSendCoin = (formSendCoin = {}) => {
    const { coinSelected } = this.state;

    if (!formSendCoin.recievedAddress) {
      UIUtils.showToastMessage(I18n.t('send.addressRequired'));
      return false;
    }
    if (!WalletService.isValidAddress(coinSelected.symbol, formSendCoin.recievedAddress)) {
      UIUtils.showToastMessage(I18n.t('send.addressInValid'));
      return false;
    }

    if (!formSendCoin.coinValue) {
      UIUtils.showToastMessage(I18n.t('send.coinValueInValid'));
      return false;
    }
    return true;
  }

  _resetFormSendCoin = () => {
    this.setState({
      feeSelected: SendScreen.LIST_FEE[0],
      formSendCoin: {
        recievedAddress: '',
        coinValue: '0',
        feeValue: SendScreen.LIST_FEE[0].value,
      },
      realValueCoin: 0,
    });
  }

  _handleSendCoin = async () => {
    try {
      this.setState({
        isLoading: true,
      });

      const { formSendCoin, coinSelected } = this.state;

      const walletAddress = await AsyncStorage.getItem('address');
      const privateKey = AppConfig.PRIVATE_KEY;
      console.log('walletAddress', walletAddress);
      console.log('privateKey', privateKey);

      const transaction = await WalletService.sendTransaction(coinSelected.symbol, walletAddress, formSendCoin.recievedAddress, privateKey, formSendCoin.coinValue, formSendCoin.feeValue);
      console.log('SendScreen.transaction: ', transaction);


      const params = {
        destination_address: walletAddress,
        amount: formSendCoin.coinValue,
        transaction_url: transaction.transactionUrl,
        coin_name: coinSelected.name,
      };
      await sendMailTransaction(params);

      this._resetFormSendCoin();

      this.setState({ isLoading: false });
      UIUtils.showToastMessage(I18n.t('send.submitted'));
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      UIUtils.showToastMessage(error.message);
      console.log('SendScreen._error: ', error);
    }
  }

  _handClickContinueBtn = () => {
    const { formSendCoin } = this.state;
    if (!this._validateSendCoin(formSendCoin)) {
      return;
    }
    this._confirmModal.setModalVisible(true);
  }

  _handConfirmModal = () => {
    this._confirmModal.setModalVisible(false);
    this._handleSendCoin();
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
    const {
      formSendCoin, feeSelected, coinSelected, currency, realValueCoin,
    } = this.state;
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
            style={styles.inputTextAddress}
            value={formSendCoin.recievedAddress.toString()}
            onChangeText={value => this._handleChangeTextInput(SendScreen.FORM_SEND.RECIEVED_ADDRESS, value)}
          />
        </View>

        <View style={styles.inputCoinValueContainer}>
          <View style={styles.inputCoinValue}>
            <Text style={styles.inputTextLabel}>{coinSelected.name}</Text>
            <TextInput
              editable
              keyboardType="numeric"
              placeholder="0.00"
              underlineColorAndroid="transparent"
              value={formSendCoin.coinValue.toString()}
              style={styles.inputText}
              onChangeText={value => this._handleChangeCoinValue(value.replace(/[^0-9\.]/g, ''))}
            />
          </View>
          <View
            style={[
              styles.inputCoinValue,
              { marginLeft: 'auto', backgroundColor: '#f5f7fa' },
            ]}
          >
            <Text style={styles.inputTextLabel}>{currency}</Text>
            <TextInput
              editable={false}
              placeholder="0.00"
              value={`${realValueCoin}`}
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
            <View style={styles.textSendTimeContainer}>
              <Text style={styles.textSendTime}>{feeSelected.time}</Text>
              <Image
                source={require('../../../assets/arrow-down/down-arrow.png')}
                style={styles.imageDropdownIcon}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>

        <View style={styles.textNoticeContainer}>
          <Text style={styles.textNotice}>{I18n.t('send.notice')}</Text>
        </View>
      </View>
    );
  }

  _renderBtnContinue = () => (
    <View style={styles.buttonFixBottom}>
      <MangoGradientButton
        btnText={I18n.t('send.continue')}
        btnStyle={styles.btnContinue}
        buttonTextStyle={styles.buttonTextStyle}
        onPress={() => this._handClickContinueBtn()}
      />
    </View>

  )

  render() {
    const {
      isShowMenuSelectFee, formSendCoin, coinSelected, isLoading,
    } = this.state;

    return (
      <View style={[styles.container]}>
        {isLoading ? <MangoLoading /> : null}
        <ConfirmationModal
          ref={ref => this._confirmModal = ref}
          contentText={I18n.t('send.confirmationText', { amount: formSendCoin.coinValue, coinName: coinSelected.name, address: formSendCoin.recievedAddress })}
          handConfirmModal={this._handConfirmModal}
        />
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

export default withNavigationFocus(SendScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
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

  inputTextAddress: {
    // marginTop: '2@s',
    width: '94%',
    fontSize: '18@ms',
    ...Fonts.Ubuntu_Light,
  },

  inputText: {
    width: '100@s',
    paddingBottom: '8@s',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },

  inputTextFee: {
    flex: 7,
    marginLeft: '7@s',
    fontSize: '16@ms',
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

  textSendTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  textSendTime: {
    marginRight: '10@s',
    color: '#8d93a6',
    fontSize: '14@ms',
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

  textNoticeContainer: {
    marginTop: '15@s',
    width: '320@s',
  },

  textNotice: {
    textAlign: 'center',
    color: 'red',
    fontSize: '14@ms',
    ...Fonts.Ubuntu_Light,
  },

  // Section button continue
  buttonFixBottom: {
    // flex: 1,
    // justifyContent: 'flex-end',
    marginTop: '100@s',
    marginBottom: '10@s',
  },

  btnContinue: {
    width: '247@s',
    height: '48@s',
    borderRadius: '28@s',
    marginHorizontal: '5@s',
    marginBottom: '10@s',
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
