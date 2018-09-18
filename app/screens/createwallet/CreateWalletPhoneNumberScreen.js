import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import I18n from '../../i18n/i18n';

export default class CreateWalletPhoneNumberScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createByPhoneNumber.title'),
    headerTitleStyle: styles.headerTitle,
    headerRight: (<View />),
  })

  constructor() {
    super();
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      cca2: 'vn',
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag() {
    this.countryPicker.openModal();
  }

  _onClickCreateWallet =() => {
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputTextNumber}>
          <View style={styles.country}>
            <PhoneInput
              ref={(ref) => { this.phone = ref; }}
              onPressFlag={this.onPressFlag}
            />
            <CountryPicker
              ref={(ref) => {
                this.countryPicker = ref;
              }}
              onChange={value => this.selectCountry(value)}
              translation="eng"
              cca2={this.state.cca2}
            >
              <View />
            </CountryPicker>
          </View>
          <TextInput
            style={styles.phoneNumber}
            underlineColorAndroid="transparent"
            placeholder="Phone number"
          />
        </View>

        <View>
          <CheckBox
            containerStyle={styles.checkboxs}
            title={I18n.t('createByPhoneNumber.iAccept')}
          />
        </View>
        <View style={styles.viewcreate}>
          <TouchableOpacity
            style={styles.createWallet}
            onPress={() => this._onClickCreateWallet()}
          >
            <Text style={styles.textCreate}>
              {I18n.t('createByPhoneNumber.createWallet')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '20@s',
  },
  inputTextNumber: {
    borderRadius: '24@s',
    flexDirection: 'row',
    borderColor: '#7F7F7F',
    height: '55@s',
    marginLeft: '30@s',
    marginRight: '30@s',
    marginTop: '50@s',
    alignSelf: 'stretch',
  },
  checkboxs: {
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 0,
  },
  createWallet: {
    borderRadius: '20@s',
    alignSelf: 'stretch',
    marginLeft: '50@s',
    marginRight: '50@s',
    height: '45@s',
    backgroundColor: '#FFC125',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewcreate: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    marginBottom: '30@s',
  },
  textCreate: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
  country: {
    borderWidth: 1,
    justifyContent: 'center',
    borderTopLeftRadius: '23@s',
    borderBottomLeftRadius: '23@s',
    paddingLeft: '20@s',
    borderColor: '#7F7F7F',
    backgroundColor: '#FFFFFF',
    width: '100@s',
    height: '55@s',
  },
  phoneNumber: {
    borderWidth: 1,
    borderTopRightRadius: '23@s',
    borderBottomRightRadius: '23@s',
    borderColor: '#7F7F7F',
    width: '215@s',
    backgroundColor: '#FFFFFF',
    fontSize: '20@s',
    paddingLeft: '15@s',
  },
  codeCountry: {
    width: '30@s',
  },
  textCountry: {
    fontWeight: 'bold',
  },
});
