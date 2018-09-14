import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import {CheckBox} from 'react-native-elements';
import BackButton from '../common/BackButton';
import PhoneInput from 'react-native-phone-input';
import SettingScreen from '../setting/SettingScreen';

export default class CreateWalletPhoneNumberScreen extends Component{
	constructor(){
		super();
		this.state={
			valid: "",
			type: "",
			value: "",
		};
		this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
	}

	updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }

	renderInfo() {
    if (this.state.value) {
      return (
        <View>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }

	static navigationOptions = ({navigation}) => ({
      headerLeft: <BackButton navigation={navigation} />,
      title: 'Create by Phone Number',
      headerTitleStyle: styles.headerTitle,
  })

  _onClickCreateWallet(){
		const { navigation } = this.props;
    navigation.navigate('SettingScreen');
  }

  render(){
		return(
			<View style={styles.imageview}>
					<View style={styles.inputTextNumber}>
							<View style={styles.country}>
								<PhoneInput ref={ ref =>{ this.phone = ref }}></PhoneInput>
								<TouchableOpacity onPress={this.updateInfo} style={styles.codeCountry}>
									</TouchableOpacity>
								{this.renderInfo()}
							</View>
							<TextInput style={styles.phoneNumber}
							 underlineColorAndroid='transparent'
							 placeholder="Phone number"></TextInput>
					</View>

					<View>
						<CheckBox 
							containerStyle={styles.checkboxs}
							title='I accept the terms and conditions'/>
					</View>
					<View style={styles.viewcreate}>
					<TouchableOpacity
					 style={styles.createWallet}
					 onPress={this._onClickCreateWallet.bind(this)}>
							<Text style={styles.textCreate}>Create Wallet</Text>
					</TouchableOpacity>
					</View>
			</View>
	)
  }
};

const styles = ScaledSheet.create({
    imageview:{
      flex: 1,
      flexDirection: 'column',
			alignItems: 'center',
			backgroundColor: '#F5F7FA'
		},
		headerTitle: {
			flex: 1,
			textAlign: 'center',
			fontWeight: '400',
		},
    inputTextNumber: {
      borderRadius: 24,
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
				backgroundColor: 'transparent',
				borderWidth: 0
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
        borderColor: "#7F7F7F",
        backgroundColor: '#FFFFFF',
        width: '100@s',
        height: '55@s',
    },
    phoneNumber: {
        borderWidth: 1,
        borderTopRightRadius: '23@s',
        borderBottomRightRadius: '23@s',
        borderColor: "#7F7F7F",
        width:'215@s',
        backgroundColor: '#FFFFFF',
        fontSize: '20@s',
        paddingLeft: '15@s',
		},
		codeCountry: {
			width: '30@s',
		}
});