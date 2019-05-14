import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import {
  CommonStyles, Fonts, CommonSize, CommonColors,
} from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import UIUtils from '../../../utils/UIUtils';
import { scale } from '../../../libs/reactSizeMatter/scalingUtils';
import { getCurrentUser } from '../../../api/user/UserRequest';
import Consts from '../../../utils/Consts';

export default class BackupKeyScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting2fa.backupKey'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      googleOtpKey: '',
      walletAddress: '',
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    this.setState({
      googleOtpKey: params,
    });

    await this._loadUserInfo();
  }

  _loadUserInfo = async () => {
    try {
      const response = await getCurrentUser(false);
      let walletAddress = '';
      switch (response.data.login_type) {
        case Consts.LOGIN_TYPES.EMAIL:
          walletAddress = response.data.email;
          break;
        case Consts.LOGIN_TYPES.PHONE_NUMBER:
          walletAddress = response.data.phone_number;
          break;
        case Consts.LOGIN_TYPES.PASSPORT:
          walletAddress = response.data.passport_number;
          break;
        default:
          walletAddress = '';
          break;
      }
      this.setState({
        walletAddress,
      });
    } catch (error) {
      console.log('SettingScreen._loadUserInfo', error);
    }
  }

  _handleNext = () => {
    const { navigation } = this.props;
    const { googleOtpKey } = this.state;

    navigation.navigate('EnterBackupKeyScreen', googleOtpKey);
  }

  _handleCopyKey = () => {
    const { googleOtpKey } = this.state;
    Clipboard.setString(googleOtpKey);
    UIUtils.showToastMessage(I18n.t('setting2fa.copyKey'), 'success');
  }

  render() {
    const { googleOtpKey, walletAddress } = this.state;

    return (
      <View style={styles.BackupKey}>
        {/* <View style={styles.imageBlock}> */}
        {/* <Image
            source={require('../../../../assets/setting/writeDown.png')}
            style={styles.image}
          /> */}
        <View style={styles.qrCodeContainer}>
          {!googleOtpKey ? null : (
            <QRCode
              value={`otpauth://totp/MangoWallet (${walletAddress})?secret=${googleOtpKey}`}
              size={scale(180)}
            />
          )}
        </View>
        {/* </View> */}

        <View style={styles.textBlock}>
          <Text style={styles.textGuide}>{I18n.t('setting2fa.saveKeyOnPaper')}</Text>
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            value={googleOtpKey}
            editable={false}
            style={styles.inputText}
          />
        </View>

        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={I18n.t('setting2fa.copyKey')}
            btnStyle={styles.copyKey}
            buttonTextStyle={styles.btnText}
            colorOptions={['#ffffff', '#ffffff', '#ffffff']}
            onPress={this._handleCopyKey}
          />
          <MangoGradientButton
            btnText={I18n.t('backupPassphrase.btnNext')}
            btnStyle={styles.btnNext}
            onPress={this._handleNext}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  BackupKey: {
    paddingTop: '44@s',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
  imageBlock: {
    height: '140@s',
    marginBottom: '24@s',
  },
  image: {
    width: '140@s',
    height: '140@s',
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: '24@s',
  },
  textGuide: {
    width: '335@s',
    textAlign: 'center',
    lineHeight: '20.8@ms',
    color: 'rgb(28, 28, 28)',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },
  inputBlock: {
    width: '295@s',
    height: '52@s',
    backgroundColor: CommonColors.headerBarBgColor,
    borderRadius: '26@s',
    borderWidth: 1,
    borderColor: 'rgb(209, 209, 219)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    width: '265@s',
    fontSize: '22@ms',
    textAlign: 'center',
    color: 'rgb(38, 48, 77)',
    ...Fonts.Ubuntu_Medium,
  },
  btnBlock: {
    flexDirection: 'row',
    marginTop: '40@s',
  },
  btnNext: {
    width: '140@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  },
  btnText: {
    marginLeft: '20@s',
    marginRight: '20@s',
  },
  copyKey: {
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  },
  qrCodeContainer: {
    width: '240@s',
    height: '240@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8@s',
    backgroundColor: CommonColors.headerBarBgColor,
    ...UIUtils.generateShadowStyle(),
    marginBottom: '10@s',
  },
});
