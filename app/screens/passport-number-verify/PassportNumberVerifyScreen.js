import React from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import I18n from '../../i18n/i18n';
import { CommonStyles, Fonts , CommonColors} from '../../utils/CommonStyles';
import BaseScreen from '../BaseScreen';
import MangoBackButton from '../common/MangoBackButton';
import MangoGradientButton from '../common/MangoGradientButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import ImagePicker from 'react-native-image-picker';
import UIUtils from '../../utils/UIUtils';
import Consts from '../../utils/Consts';

export default class PassportNumberVerifyScreen extends BaseScreen {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('PassportNumberVerifyScreen.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (<View />),
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state = {
      avatarSource: null,
      fileNameImage: null,
      passportNumber: params.passportNumber,
      loginType: params.loginType,
      editPassportNumber: true,
    };
  }

  componentDidMount = () => {
    const { passportNumber, loginType } = this.state;

    if(passportNumber && (loginType === Consts.LOGIN_TYPES.PASSPORT)){
      this.setState({editPassportNumber: false})
    }
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = { uri: response.uri };
        const name = response.fileName;

        console.log('linkImage', source);

        this.setState({
          avatarSource: source,
          fileNameImage: name,
        });
      }
    });
  }

  onClickContinue = () => {
    const { passportNumber, avatarSource, fileNameImage } = this.state;
    const params = {
      passportNumber,
      avatarSource,
      fileNameImage,
    }

    if (!passportNumber) {
      UIUtils.showToastMessage(I18n.t('PassportNumberVerifyScreen.messengerPassport'));
      return;
    }

    if (!avatarSource) {
      UIUtils.showToastMessage(I18n.t('PassportNumberVerifyScreen.messengerImage'));
      return;
    }
    this.navigate('UploadPassportNumber', params);
  }

  render() {
    const { avatarSource, passportNumber, editPassportNumber } = this.state;
  
    return (
        <ScrollView style={styles.containerMain}>
          <View style={styles.container}>

            <View style={editPassportNumber ? styles.groupPassportNumberInput : styles.groupPassportNumberInputNoEdit}>
              <Image style={styles.iconPassportNumber} source={require('../../../assets/passport-number-verify/passport.png')} />
              <TextInput
                style={styles.passportNumberInput}
                value={passportNumber}
                editable={editPassportNumber}
                onChangeText={text => this.setState({ passportNumber: text })}
                placeholder={I18n.t('PassportNumberVerifyScreen.enterPassportNumber')} />
            </View>

            <View style={styles.groupPassportSamle}>
              {avatarSource === null ? <Image style={styles.passportSamle} source={require('../../../assets/passport-number-verify/PassportSamle01.png')} /> :
                <Image style={styles.passportSamle} source={avatarSource} />
              }
              <Text style={styles.txtNote}>{I18n.t("PassportNumberVerifyScreen.instruction")}</Text>
              <TouchableOpacity 
                activeOpacity={0.5}
                style={styles.btnUpContainer}
                onPress={() => this.selectPhotoTapped()}>
                <View style = {styles.viewUpload}>
                  <Text style={styles.txtUpload}>{I18n.t('PassportNumberVerifyScreen.selectImage')}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <MangoGradientButton
              btnText={I18n.t('PassportNumberVerifyScreen.continue')}
              btnStyle={styles.btnContinue}
              onPress={() => this.onClickContinue()}
            />
          </View>
        </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: CommonColors.screenBgColor,
  },
  container: {
    alignItems: 'center',
  },
  groupPassportNumberInput: {
    flexDirection: 'row',
    width: '340@s',
    height: '48@s',
    borderRadius: '29@s',
    borderWidth: 1,
    borderColor: '#cad1db',
    paddingHorizontal: '22@s',
    alignItems: 'center',
    marginTop: '32@s',
    marginBottom: '16@s',
    backgroundColor: CommonColors.headerBarBgColor,
  },
  groupPassportNumberInputNoEdit: {
    flexDirection: 'row',
    width: '340@s',
    height: '48@s',
    borderRadius: '29@s',
    borderWidth: 1,
    borderColor: '#cad1db',
    paddingHorizontal: '22@s',
    alignItems: 'center',
    marginTop: '32@s',
    marginBottom: '16@s',
    backgroundColor: CommonColors.screenBgColor,
  },
  iconPassportNumber: {
    width: '21@s',
    height: '18@s',
    marginRight: '5@s',
  },
  passportNumberInput: {
    width: '94%',
    fontSize: '18@ms',
    ...Fonts.Ubuntu_Light,
  },
  groupPassportSamle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  passportSamle: {
    borderRadius: '8@s',
    width: '280@s',
    height: '320@s',
    borderWidth: '1@s',
    borderColor: '#abb1bd',
  },

  btnUpContainer: {
    height: '36@s',
    borderRadius: '28@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10@s',
    marginRight: '10@s',
    marginBottom: '20@s',
    backgroundColor: CommonColors.headerBarBgColor,
    ...UIUtils.generateShadowStyle(),
  },

  viewUpload: {
    marginLeft: '10@s',
    marginRight: '10@s',
  },

  txtUpload: {
    textAlign: 'center',
    fontSize: '14@ms',
    color: '#000',
    ...Fonts.Ubuntu_Light,
    padding: '20@s',
  },

  txtNote: {
    textAlign: 'center',
    fontSize: '14@ms',
    color: '#000',
    ...Fonts.Ubuntu_Light,
    padding: '20@s',
  },

  btnContinue: {
    width: '220@s',
    alignItems: 'center',
    marginBottom: '10@s',
    marginRight: '4@s',
  },
  
  continueContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '40@s',
    marginLeft: '12@s',
    marginTop: '30@s',
    marginBottom: '30@s',
    width: '145@s',
    borderRadius: '20@s',
  },
})