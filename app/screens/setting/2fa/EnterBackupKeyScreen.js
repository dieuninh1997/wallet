import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize, CommonColors } from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import UIUtils from '../../../utils/UIUtils';

export default class EnterBackupKeyScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting2fa.enterBackupKey'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      googleOtpKeyOrigin: '',
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.setState({
      googleOtpKeyOrigin: params,
    });
  }

  _validateGoogleOtpKey = () => {
    const { googleOtpKeyOrigin } = this.state;
    return googleOtpKeyOrigin === this.googleOtpKeyInput._lastNativeText;
  }

  _handleNext = () => {
    if (!this._validateGoogleOtpKey()) {
      UIUtils.showToastMessage(I18n.t('setting2fa.EnterBackupKeyIncorrect'));
      return;
    }

    const { navigation } = this.props;
    navigation.navigate('SetupCodeFirstScreen');
  }

  render() {
    return (
      <View style={styles.EnterBackupKey}>
        <View style={styles.imageBlock}>
          <Image
            source={require('../../../../assets/setting/noted.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.textGuide}>{I18n.t('setting2fa.enterGoogleOtpKey')}</Text>
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            editable
            placeholder={I18n.t('setting2fa.enterBackupKey')}
            ref={(input) => { this.googleOtpKeyInput = input }}
            style={styles.inputText}
          />
        </View>

        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={I18n.t('backupPassphrase.btnNext')}
            btnStyle={styles.btnNext}
            onPress={() => this._handleNext()}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  EnterBackupKey: {
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
    marginBottom: '44@s'
  },
  textGuide: {
    width: '271@s',
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
    alignItems: 'center'
  },
  inputText: {
    width: '265@s',
    fontSize: '20@ms',
    color: 'rgb(38, 48, 77)',
    ...Fonts.Ubuntu_Light,
  },
  btnBlock: {
    marginTop: '40@s',
  },
  btnNext: {
    width: '140@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  }
});
