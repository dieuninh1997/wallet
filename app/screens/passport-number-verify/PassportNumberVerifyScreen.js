import React from 'react';
import { View, TextInput, Image, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import I18n from '../../i18n/i18n';
import { CommonStyles, Fonts } from '../../utils/CommonStyles';
import BaseScreen from '../BaseScreen';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import ImagePicker from 'react-native-image-picker';
import UIUtils from '../../utils/UIUtils';

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

    this.state = {
      avatarSource: null,
      fileNameImage: null,
      passportNumber: null,
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
    const { avatarSource } = this.state;

    return (
      <View style={styles.containerMain}>
        <ScrollView>
          <View style={styles.container}>

            <View style={styles.groupPassportNumberInput}>
              <Image style={styles.iconPassportNumber} source={require('../../../assets/passport-number-verify/passport.png')} />
              <TextInput
                style={styles.passportNumberInput}
                keyboardType="numeric"
                onChangeText={text => this.setState({ passportNumber: text })}
                placeholder={I18n.t('PassportNumberVerifyScreen.enterPassportNumber')} />
            </View>

            <View style={styles.groupPassportSamle}>
              {avatarSource === null ? <Image style={styles.passportSamle} source={require('../../../assets/passport-number-verify/PassportSamle01.png')} /> :
                <Image style={styles.passportSamle} source={avatarSource} />
              }
              <TouchableWithoutFeedback onPress={() => this.selectPhotoTapped()}>
                <View style={styles.uploadContainer}>
                  <Text style={styles.textUpload}>{I18n.t('PassportNumberVerifyScreen.selectImage')}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <TouchableWithoutFeedback onPress={() => this.onClickContinue()}>
              <View style={styles.continueContainer}>
                <Text style={styles.textContinue}> {I18n.t('PassportNumberVerifyScreen.continue')}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  containerMain: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  groupPassportNumberInput: {
    flexDirection: 'row',
    marginLeft: '50@s',
    marginRight: '50@s',
    margin: '20@s',
    borderWidth: '1@s',
    borderColor: '#abb1bd',
    borderRadius: '10@s',
    backgroundColor: '#fff',
  },
  iconPassportNumber: {
    width: '50@s',
    height: '50@s',
  },
  passportNumberInput: {
    width: '100%',
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
    marginBottom: '30@s',
    width: '145@s',
    borderRadius: '20@s',
  },
  textContinue: {

  },
})