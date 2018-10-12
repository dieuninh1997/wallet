import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { updateUserSettings } from '../../api/user/UserRequest';
import I18n from '../../i18n/i18n';
import { CommonColors, CommonSize, CommonStyles } from '../../utils/CommonStyles';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Consts from '../../utils/Consts';
import UIUtils from '../../utils/UIUtils';
import Modal from 'react-native-modal';

class LocalCurrencyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: null,
      modalVisible: false,
      radioValue: 0,
      error: '',
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  show(currency, callback) {
    console.log(currency);
    let radioValue = Consts.CURRENCIES.indexOf(currency) || 0;
    this.setState({
      currency,
      radioValue,
      modalVisible: true
    });
  }

  _onChooseCurrency(index, value) {
    this.setState({
      currency: value,
    });
  }

  _onClickCancel = () => {
    this.setModalVisible(false);
    this.setState({
      error: '',
    });
  }

  _onClickConfirm = async () => {
    const { onLocalCurrencyUpdated } = this.props;
    const { currency } = this.state;
    const params = {
      currency,
    };

    try {
      const response = await updateUserSettings(params);
      const message = response.message;

      onLocalCurrencyUpdated(currency);
      this.setModalVisible(false);
      UIUtils.showToastMessage(message);
    } catch (error) {
      this.setState({
        error: error.message,
      });
      console.log('LocalCurrencyScreen._onClickConfirm', error);
    }
  }

  render() {
    const { modalVisible, error } = this.state;
    let height = modalHeight;
    if (!!error) {
      height += scale(20);
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          isVisible={modalVisible}
          backdropColor={CommonColors.modalBackdropColor}
          backdropOpacity={CommonColors.modalBackdropAlpha}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}
        >
          <View style={[styles.popup, { height: height }]}>
            <View style={{ flex: 1 }}>
              {this._renderHeader()}
              {this._renderContent()}
              {this._renderFooter()}
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  _renderHeader() {
    return (
      <View style={styles.popupHeader}>
        <Text style={styles.textPopupHeader}>{I18n.t('localCurrencyScreen.title')}</Text>
      </View>
    )
  }

  _renderContent() {
    const { radioValue, error } = this.state;

    return (
      <View style={styles.content}>
        <RadioGroup
          color='#2f64d1'
          size={scale(22)}
          selectedIndex={radioValue}
          style={styles.groupRadio}
          onSelect={(index, value) => this._onChooseCurrency(index, value)}>
          {
            Consts.CURRENCIES.map((currency, index) => {
              return (
                <RadioButton
                  key={currency}
                  style={styles.groupDolla}
                  value={currency}
                  color='#2f64d1'>
                  <Text style={styles.textUsDollar}>{I18n.t(`currency.${currency}.settingLabel`)}</Text>
                </RadioButton>
              )
            })
          }
        </RadioGroup>
        {!!error && <Text style={[CommonStyles.errorMessage, styles.errorMessage]}>{error}</Text>}
      </View>
    )
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => this._onClickCancel()}
          style={styles.cancelContainer}>
          <Text style={styles.textCancel}> {I18n.t('localCurrencyScreen.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._onClickConfirm()}
          style={styles.confirmContainer}>
          <Text style={styles.textConfirm}> {I18n.t('localCurrencyScreen.confirm')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default LocalCurrencyScreen;

const modalHeight = scale(213);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '375@s'
  },
  popup: {
    width: CommonSize.popupWidth,
    backgroundColor: '#FFF',
    borderRadius: '10@s',
    margin: '16@s',
    alignSelf: 'center',
    ...UIUtils.generatePopupShadow()
  },
  popupHeader: {
    justifyContent: 'center',
    marginLeft: '24@s',
    marginTop: '22@s',
  },
  textPopupHeader: {
    color: '#1f1f1f',
    fontSize: '20@ms',
  },
  content: {
    flex: 1,
    marginTop: '10@s',
  },
  groupRadio: {
    marginLeft: '0@s',
  },
  groupDolla: {
    alignItems: 'center',
    marginLeft: '18@s',
  },
  textUsDollar: {
    marginLeft: '10@s',
    fontSize: '18@ms',
    color: '#363f59',
  },
  groupPeso: {
    alignItems: 'center',
    marginLeft: '18@s',
  },
  footer: {
    marginTop: '30@s',
    marginRight: '24@s',
    marginBottom: '17@s',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    height: '40@s',
    width: '81@s',
    borderRadius: '20@s',
  },
  textCancel: {
    color: '#000000',
    fontSize: '16@ms',
  },
  confirmContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '40@s',
    marginLeft: '12@s',
    width: '95@s',
    borderRadius: '20@s',
  },
  textConfirm: {
    color: '#000000',
    fontSize: '16@ms',
  },
  errorMessage: {
    marginTop: '5@s',
    marginLeft: '24@s',
  },
})