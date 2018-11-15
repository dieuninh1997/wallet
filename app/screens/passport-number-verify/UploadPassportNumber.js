import React from 'react';
import {
  View, ScrollView, Image, Text, TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../i18n/i18n';
import { CommonStyles, Fonts, CommonColors } from '../../utils/CommonStyles';
import BaseScreen from '../BaseScreen';
import MangoBackButton from '../common/MangoBackButton';
import MangoGradientButton from '../common/MangoGradientButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { verifyPassport } from '../../api/user/UserRequest';
import UIUtils from '../../utils/UIUtils';

export default class UploadPassportNumber extends BaseScreen {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('uploadPassportNumber.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (<View />),
  });

  constructor(props) {
    super(props);

    this.state = {
      passportSamle: null,
      fileName: null,
    };
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        let name = '';
        if (!response.fileName) {
          name = response.uri.split('/').pop();
        } else {
          name = response.fileName;
        }

        this.setState({
          passportSamle: source,
          fileName: name,
        });
      }
    });
  }

  onClickSubmit = async () => {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { passportSamle, fileName } = this.state;
    const { passportNumber } = params;

    if (!passportSamle) {
      UIUtils.showToastMessage(I18n.t('uploadPassportNumber.messengerImage'), 'error');
      return;
    }
    const image = {
      uri: passportSamle.uri,
      type: 'image/jpeg',
      name: fileName,
    };
    const image2 = {
      uri: params.avatarSource.uri,
      type: 'image/jpeg',
      name: params.fileNameImage,
    };

    try {
      await verifyPassport(passportNumber, image, image2);

      UIUtils.showToastMessage(I18n.t('uploadPassportNumber.submitSuccess'), 'success');
      navigation.navigate('SettingScreen');
    } catch (error) {
      UIUtils.showToastMessage(error.message, 'error');
      console.log('uploadpassportverify', error.message);
    }
  }

  render() {
    const { passportSamle } = this.state;

    return (
      <ScrollView style={styles.containerMain}>
        <View style={styles.container}>

          <Text style={styles.txtNote}>{I18n.t('PassportNumberVerifyScreen.instruction')}</Text>

          <View style={styles.groupPassportSamle}>
            {passportSamle === null ? <Image style={styles.passportSamle} source={require('../../../assets/passport-number-verify/PassportSamle02.png')} />
              : <Image style={styles.passportSamle} source={passportSamle} />
            }

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnUpContainer}
              onPress={() => this.selectPhotoTapped()}
            >
              <View style={styles.viewUpload}>
                <Text style={styles.txtUpload}>{I18n.t('uploadPassportNumber.selectImage')}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <MangoGradientButton
            btnText={I18n.t('uploadPassportNumber.submit')}
            btnStyle={styles.btnSubmit}
            onPress={() => this.onClickSubmit()}
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
  txtNote: {
    textAlign: 'center',
    fontSize: '14@ms',
    color: '#000',
    ...Fonts.Ubuntu_Light,
    padding: '20@s',
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
    borderColor: CommonColors.borderColor,
  },
  uploadContainer: {
    backgroundColor: '#fff',
    width: '110@s',
    height: '40@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20@s',
    marginTop: '20@s',
  },

  continueContainer: {
    alignItems: 'center',
    backgroundColor: '#fbc405',
    justifyContent: 'center',
    height: '40@s',
    marginLeft: '12@s',
    marginTop: '30@s',
    width: '145@s',
    borderRadius: '20@s',
  },

  btnUpContainer: {
    height: '36@s',
    borderRadius: '28@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10@s',
    marginRight: '10@s',
    marginBottom: '20@s',
    marginTop: '20@s',
    backgroundColor: CommonColors.headerBarBgColor,
    ...UIUtils.generateShadowStyle(),
  },

  viewUpload: {
    marginLeft: '10@s',
    marginRight: '10@s',
    textAlign: 'center',
    alignItems: 'center',
  },

  txtUpload: {
    textAlign: 'center',
    fontSize: '14@ms',
    color: '#000',
    ...Fonts.Ubuntu_Light,
    paddingHorizontal: '20@s',
  },

  btnSubmit: {
    width: '220@s',
    alignItems: 'center',
    marginBottom: '10@s',
    marginRight: '4@s',
  },
});
