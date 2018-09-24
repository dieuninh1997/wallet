import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import { CommonStyles } from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';

export default class CreateWalletPhoneNumberScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('createByPhoneNumber.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (<View />),
  })

  constructor() {
    super();
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      cca2: 'vn',
      isChecked: true,
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

  _handleToggleCheckBox = () => {
    const { isChecked } = this.state;

    this.setState({
      isChecked: !isChecked,
    });
  }

  _onClickCreateWallet =() => {
    const { navigation } = this.props;

    navigation.navigate('MainScreen');
  }

  selectCountry(country) {
    const parseCountry = country.cca2.toLowerCase();

    this.phone.selectCountry(parseCountry);
    this.setState({ cca2: country.cca2 });
  }

  render() {
    const { isChecked } = this.state;

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
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            placeholder="Phone number"
          />
        </View>

        <View style={styles.checkBoxAccept}>
          <CheckBox
            containerStyle={styles.checkboxs}
            checked={isChecked}
            checkedIcon="check-square"
            uncheckedIcon="square"
            checkedColor="#1c43b8"
            onPress={() => this._handleToggleCheckBox()}
          />
          <TouchableWithoutFeedback
            activeOpacity={0.5}
            onPress={() => this._handleToggleCheckBox()}
          >
            <View
              style={styles.touchIAccept}
            >
              <Text style={styles.textIAccept}>{I18n.t('createByPhoneNumber.iAccept')}</Text>
              <Text style={styles.textTerms}>{I18n.t('createByPhoneNumber.termsAndConditions')}</Text>
            </View>
          </TouchableWithoutFeedback>
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
  inputTextNumber: {
    borderRadius: '30@s',
    borderWidth: '2@s',
    flexDirection: 'row',
    borderColor: '#eef0f4',
    backgroundColor: '#FFFFFF',
    height: '60@s',
    marginLeft: '30@s',
    marginRight: '30@s',
    marginTop: '50@s',
    alignSelf: 'stretch',
  },
  checkboxs: {
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 0,
    width: '50@s',
  },
  createWallet: {
    borderRadius: '25@s',
    alignSelf: 'stretch',
    marginLeft: '50@s',
    marginRight: '50@s',
    height: '50@s',
    backgroundColor: '#ffd900',
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
    borderRightWidth: '1@s',
    justifyContent: 'center',
    paddingLeft: '20@s',
    borderColor: '#eef0f4',
    width: '100@s',
    height: '60@s',
  },
  phoneNumber: {
    width: '215@s',
    fontSize: '20@s',
    color: '#c4c4c4',
    paddingLeft: '15@s',
  },
  codeCountry: {
    width: '30@s',
  },
  textCountry: {
    fontWeight: 'bold',
  },
  textIAccept: {
    color: '#4d4e4e',
    fontSize: '16@s',
    alignItems: 'center',
    alignSelf: 'center',
  },
  checkBoxAccept: {
    flexDirection: 'row',
    marginTop: '15@s',
  },
  textTerms: {
    color: '#6580ce',
    fontSize: '16@s',
    alignItems: 'center',
    alignSelf: 'center',
  },
  touchIAccept: {
    flexDirection: 'row',
  },
});