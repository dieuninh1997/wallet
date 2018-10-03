import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-root-toast';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { changePassword } from '../../api/user/UserRequest';
import I18n from '../../i18n/i18n';

class ChangePasswordScreen extends Component {
	static navigationOptions = () => ({
		header: null,
	})

	constructor(props) {
		super(props);
		this.state = {
			currentPassword: null,
			newPassword: null,
			confirmNewPassword: null,
		}
	}

	_onCLickCancel = () => {
		const { navigation } = this.props;
		navigation.navigate('SettingScreen');
	}

	_onClickUpdate = async () => {
		const { currenPassword, newPassword, confirmNewPassword } = this.state;
		const { navigation } = this.props;

		console.log('change-password', currenPassword, newPassword, confirmNewPassword);
		if (!currenPassword || !newPassword || !confirmNewPassword) {
			Toast.show(I18n.t('changePassword.toastEnterFullInfo'), {
				duration: Toast.durations.SHORT,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
			return;
		}
		if (newPassword !== confirmNewPassword) {
			Toast.show(I18n.t('changePassword.toastConfirmPassword'), {
				duration: Toast.durations.SHORT,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
			return;
		}

		try {
			const responChangePass = await changePassword(currenPassword, newPassword, '0');
			const getMessage = responChangePass.message;

			Toast.show(responChangePass.message , {
				duration: Toast.durations.SHORT,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
			
			if(!getMessage.includes('Change password success')){
				return;
			}

			navigation.navigate('SettingScreen');
		} catch (error) {
			Toast.show(error.message, {
				duration: Toast.durations.SHORT,
				position: Toast.positions.CENTER,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0,
			});
			console.log('changePassword._error: ', error);
		}

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.changeGroupContainer}>
					<Text style={styles.textChangePassword}>{I18n.t('changePassword.title')}</Text>

					<View style={styles.currenPassword}>
						<Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
						<TextInput
							style={styles.textCurrenPassword}
							secureTextEntry
							editable
							underlineColorAndroid="transparent"
							onChangeText={(text) => this.setState({ currenPassword: text })}
							placeholder={I18n.t('changePassword.curentPassword')} />
					</View>

					<View style={styles.newPasswordGroup}>
						<View style={styles.newPassword}>
							<Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
							<TextInput
								style={styles.textCurrenPassword}
								secureTextEntry
								onChangeText={(text) => this.setState({ newPassword: text })}
								placeholder={I18n.t('changePassword.newPassword')} />
						</View>
						<View style={styles.comfirmNewPassword}>
							<Image style={styles.imageKey} source={require('../../../assets/change-password/key.png')} />
							<TextInput
								style={styles.textCurrenPassword}
								secureTextEntry
								onChangeText={(text) => this.setState({ confirmNewPassword: text })}
								placeholder={I18n.t('changePassword.confirmNewPassword')} />
						</View>
					</View>

					<View style={styles.ConfirmGroup}>
						<TouchableOpacity
							onPress={() => this._onCLickCancel()}
							style={styles.cancelContainer}>
							<Text style={styles.textCancel}> {I18n.t('changePassword.cancel')}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this._onClickUpdate()}
							style={styles.updateContainer}>
							<Text style={styles.textUpdate}> {I18n.t('changePassword.update')}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

export default ChangePasswordScreen;

const styles = ScaledSheet.create({
	container: {
		backgroundColor: '#d6d9db',
		flex: 1,
	},
	changeGroupContainer: {
		backgroundColor: '#ffffff',
		borderRadius: '10@s',
		height: '340@s',
		marginLeft: '20@s',
		marginTop: '50@s',
		marginRight: '20@s',
		elevation: '10@s',
		padding: '15@s',
	},
	textChangePassword: {
		color: '#1f1f1f',
		fontSize: '20@ms'
	},
	currenPassword: {
		borderWidth: '1@s',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: '20@s',
		height: '60@s',
		borderRadius: '30@s',
		borderColor: '#e4e8ed'
	},
	imageKey: {
		height: '30@s',
		width: '30@s',
		marginLeft: '20@s',
	},
	textCurrenPassword: {
		marginLeft: '10@s',
		fontSize: '16@ms',
		width: '100%',
		color: '#a6a6a6',
		marginRight: '20@s',
	},
	newPasswordGroup: {
		borderWidth: '1@s',
		marginTop: '20@s',
		height: '120@s',
		borderRadius: '30@s',
		borderColor: '#e4e8ed'
	},
	newPassword: {
		borderColor: '#e4e8ed',
		borderBottomWidth: '1@s',
		flexDirection: 'row',
		alignItems: 'center',
		height: '60@s',
	},
	comfirmNewPassword: {
		flexDirection: 'row',
		alignItems: 'center',
		height: '60@s',
	},
	ConfirmGroup: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '25@s'
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
	updateContainer: {
		alignItems: 'center',
		backgroundColor: '#fbc405',
		justifyContent: 'center',
		height: '30@s',
		marginLeft: '10@s',
		width: '90@s',
		borderRadius: '15@s',
	},
	textUpdate: {
		color: '#000000',
		fontSize: '15@ms',
	}
});