import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { updateUserSettings } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import I18n from '../../i18n/i18n';
import AppConfig from '../../utils/AppConfig';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import UIUtils from '../../utils/UIUtils';
import Modal from 'react-native-modal';

class LocalCurrencyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: AppConfig.USER_SETTING_DATA.currency,
      modalVisible: false,
      valueRadio: 0,
    };
  }

  componentDidMount = () => {
    const userSettingData = AppConfig.USER_SETTING_DATA;
    if (userSettingData.currency === 'PHP') {
      this.setState({
        valueRadio: 1,
      })
    } else {
      this.setState({
        valueRadio: 0,
      })
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  _onChooseRadioButton(index, value) {
    this.setState({
      currency: value,
    });
  }

  _onCLickCancel = () => {
    this.setModalVisible(false);
  }

  _onClickConfirm = async () => {
    const { showChangeLocalCurrency } = this.props;
    let userSettingData = AppConfig.USER_SETTING_DATA;
    const { currency } = this.state;
    const params = {
      currency,
    };
    userSettingData.currency = currency;

    try {
      const updateCurrency = await updateUserSettings(params);
      const currencyMesseger = updateCurrency.message;
      const statusCurrency = updateCurrency.status;

      AppPreferences.showToastMessage(currencyMesseger);
      if (statusCurrency === 0) {
        if (currency === 'PHP') {
          this.setState({
            valueRadio: 1,
          })
        } else {
          this.setState({
            valueRadio: 0,
          })
        }
        await AsyncStorage.setItem('userSettingData', JSON.stringify(userSettingData));
        AppConfig.USER_SETTING_DATA = userSettingData;
        showChangeLocalCurrency(currency);
        this.setModalVisible(false);
      }
    } catch (error) {
      AppPreferences.showToastMessage(error.message);
    }
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          isVisible={modalVisible}
          backdropColor='#9ea0a5'
          backdropOpacity={0.98}
          onBackButtonPress={() => this.setModalVisible(false)}
          onBackdropPress={() => this.setModalVisible(false)}
        >
          <View style={styles.popup}>
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
    const { valueRadio } = this.state;
    return (
      <View style={styles.content}>
        <RadioGroup
          color='#2f64d1'
          size={scale(22)}
          selectedIndex={valueRadio}
          style={styles.groupRadio}
          onSelect={(index, value) => this._onChooseRadioButton(index, value)}>
          <RadioButton
            style={styles.groupDolla}
            value='USD'
            color='#2f64d1'>
            <Text style={styles.textUsDollar}>U.S Dollar ($)</Text>
          </RadioButton>
          <RadioButton
            style={styles.groupPeso}
            value='PHP'
            color='#2f64d1'>
            <Text style={styles.textUsDollar}>Philippines Peso (₱)</Text>
          </RadioButton>
        </RadioGroup>
      </View>
    )
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => this._onCLickCancel()}
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    width: '343@s',
    height: '213@s',
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
})