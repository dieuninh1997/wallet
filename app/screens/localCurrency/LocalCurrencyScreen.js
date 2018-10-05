import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var radio_props = [
  { label: 'U.S Dollar ($)', value: 0 },
  { label: 'Philippines Peso (₱)', value: 1 }
];


class LocalCurrencyScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  _onCLickCancel() {
    const { navigation } = this.props;
    navigation.navigate('SettingScreen');
  }

  _onClickConfirm() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currencyGroupContainer}>
          <Text style={styles.textLocalCurrency}> Local Currency</Text>

           <View style={styles.groupDolla}>
            {/* <CheckBox
              containerStyle={styles.checkboxs}
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="#1c43b8"
            />
            <Text style={styles.textUsDollar}>U.S Dollar ($)</Text> */}
            <RadioForm
              //animation={true}
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {}}
              buttonColor={'#2f64d1'}
              labelStyle={styles.textUsDollar}
            >
            </RadioForm>
          </View>

           {/* <View style={styles.groupPeso}>
            <CheckBox
              containerStyle={styles.checkboxs}
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="#1c43b8"
            />
            <Text style={styles.textPeso}>Philippines Peso (₱)</Text>
          </View> */}
          
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
    height: '200@s',
    marginLeft: '20@s',
    marginTop: '66@s',
    marginRight: '20@s',
    elevation: '10@s',
    padding: '15@s',
  },
  textLocalCurrency: {
    color: '#1f1f1f',
    fontSize: '20@ms'
  },
  groupDolla: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '40@s',
    height: '30@s',
  },
  checkboxs: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0,
    width: '50@s',
    borderRadius: 0,
  },
  textUsDollar: {
    marginLeft: '10@s',
    fontSize: '16@ms',
    width: '100%',
    color: '#363f59',
    marginRight: '20@s',
  },
  groupPeso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5@s',
    height: '30@s',
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
    marginTop: '25@s',
  },
  cancelContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    height: '30@s',
    width: '75@s',
    borderRadius: '15@s',
  },
  textCancel: {
    color: '#000000',
    fontSize: '15@ms',
  },
  confirmContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '30@s',
    marginLeft: '10@s',
    width: '90@s',
    borderRadius: '15@s',
  },
  textConfirm: {
    color: '#000000',
    fontSize: '15@ms',
  },
})