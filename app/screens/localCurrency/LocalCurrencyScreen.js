import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { updateUserSettings } from '../../api/user/UserRequest';
import AppPreferences from '../../utils/AppPreferences';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const RADIO_PROPS = [
  { label: 'U.S Dollar ($)', value: 0 },
  { label: 'Philippines Peso (₱)', value: 1 }
];

class LocalCurrencyScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  constructor(props) {
    super(props);
    this.state = {
      currency: 'usd',
    }
  }

  _onCLickCancel() {
    const { navigation } = this.props;
    navigation.navigate('SettingScreen');
  }

  _onClickConfirm = async () => {
    const { currency } = this.state;
    const { navigation } = this.props;
    const params = {
      currency,
    };

    try {
      const updateCurrency = await updateUserSettings(params);
      const currencyMesseger = updateCurrency.message;
      const statusCurrency = updateCurrency.status;
    
      AppPreferences.showToastMessage(currencyMesseger);
      if(statusCurrency === 0){
        navigation.navigate('SettingScreen');
      }
    } catch (error) {
      AppPreferences.showToastMessage(error.message);
    }

  }

  _onChooseRadioButton(value) {
    if (value === 0) {
      this.setState({
        currency: 'usd',
      });
    } else {
      this.setState({
        currency: 'peso',
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currencyGroupContainer}>
          <Text style={styles.textLocalCurrency}> Local Currency</Text>

          <View style={styles.groupCurrency}>
            <RadioForm
              style={styles.groupDolla}
              animation={true}
              radio_props={RADIO_PROPS}
              initial={0}
              onPress={(value) => this._onChooseRadioButton(value)}
              buttonColor={'#2f64d1'}
              buttonSize={scale(17)}
              buttonOuterSize={scale(25)}
              selectedButtonColor={'#2f64d1'}
              labelStyle={styles.textUsDollar} />
          </View>

          <View style={styles.groupConfim}>
            <TouchableOpacity
              onPress={() => this._onCLickCancel()}
              style={styles.cancelContainer}>
              <Text style={styles.textCancel}> Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onClickConfirm()}
              style={styles.confirmContainer}>
              <Text style={styles.textConfirm}> Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default LocalCurrencyScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d9db',
  },
  currencyGroupContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '10@s',
    height: '210@s',
    marginLeft: '20@s',
    marginTop: '66@s',
    marginRight: '20@s',
    elevation: '10@s',
    padding: '15@s',
  },
  textLocalCurrency: {
    color: '#1f1f1f',
    fontSize: '25@ms'
  },
  groupCurrency: {
    marginTop: '30@s',
    height: '60@s',
  },
  groupDolla: {
    padding: '5@s',
  },
  textUsDollar: {
    marginLeft: '10@s',
    fontSize: '18@ms',
    color: '#363f59',
  },
  textPeso: {
    fontSize: '16@ms',
    width: '100%',
    color: '#363f59',
    marginRight: '20@s',
  },
  groupConfim: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '6@s',
    marginTop: '25@s',
  },
  cancelContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    height: '32@s',
    width: '75@s',
    borderRadius: '16@s',
  },
  textCancel: {
    color: '#000000',
    fontSize: '18@ms',
  },
  confirmContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '32@s',
    marginLeft: '10@s',
    width: '90@s',
    borderRadius: '16@s',
  },
  textConfirm: {
    color: '#000000',
    fontSize: '18@ms',
  },
})