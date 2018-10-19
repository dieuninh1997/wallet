import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  Clipboard
} from 'react-native';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize, CommonColors } from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import UIUtils from '../../../utils/UIUtils';

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
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.setState({
      googleOtpKey: params,
    });
  }

  _handleNext = () => {
    const { navigation } = this.props;
    const { googleOtpKey } = this.state;
    navigation.navigate('EnterBackupKeyScreen', googleOtpKey);
  }

  _handleCopyKey = () => {
    const { googleOtpKey } = this.state;
    Clipboard.setString(googleOtpKey);
    UIUtils.showToastMessage(I18n.t('setting2fa.copyKey'));
  }

  render() {
    const { googleOtpKey } = this.state;

    return (
      <View style={styles.BackupKey}>
        <View style={styles.imageBlock}>
          <Image
            source={require('../../../../assets/setting/writeDown.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.textGuide}>{I18n.t('setting2fa.saveKeyOnPaper')}</Text>
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            value={googleOtpKey}
            editable = {false}
            style={styles.inputText}
          />
        </View>

        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={I18n.t('setting2fa.copyKey')}
            btnStyle={styles.copyKey}
            colorOptions={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => this._handleCopyKey()}
          />
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
    marginBottom: '24@s'
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
    alignItems: 'center'
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
  copyKey: {
    width: '140@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  }
});