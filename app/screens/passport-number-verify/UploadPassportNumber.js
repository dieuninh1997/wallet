import React from 'react';
import { View, TextInput, Image, Text, TouchableWithoutFeedback } from 'react-native';
import I18n from '../../i18n/i18n';
import { CommonStyles, Fonts } from '../../utils/CommonStyles';
import BaseScreen from '../BaseScreen';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import ImagePicker from 'react-native-image-picker';
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
          passportSamle: source,
          fileName: name,
        });
      }
    });
  }

  onClickSubmit = async () => {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    const { passportSamle, fileName } = this.state;
    const passportNumber = params.passportNumber;
    
    if(!passportSamle){
      UIUtils.showToastMessage(I18n.t('uploadPassportNumber.messengerImage'));
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
      const response = await verifyPassport(passportNumber, image, image2);
      UIUtils.showToastMessage(I18n.t('uploadPassportNumber.submitSuccess'));
      navigation.navigate('SettingScreen')
    } catch (error) {
      UIUtils.showToastMessage(error.message);
      console.log('uploadpassportverify', error.message);
    }
  }

  render() {
    const { passportSamle } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.groupPassportSamle}>
          {passportSamle === null ? <Image style={styles.passportSamle} source={require('../../../assets/passport-number-verify/PassportSamle02.png')}></Image> :
            <Image style={styles.passportSamle} source={passportSamle} />
          }
          <TouchableWithoutFeedback onPress={() => this.selectPhotoTapped()}>
            <View style={styles.uploadContainer}>
              <Text style={styles.textUpload}>{I18n.t('uploadPassportNumber.selectImage')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => this.onClickSubmit()}>
          <View style={styles.continueContainer}>
            <Text style={styles.textContinue}> {I18n.t('uploadPassportNumber.submit')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
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
  uploadContainer: {
    backgroundColor: '#fff',
    width: '110@s',
    height: '40@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20@s',
    marginTop: '20@s',
  },
  textUpload: {

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
  textContinue: {

  },
})