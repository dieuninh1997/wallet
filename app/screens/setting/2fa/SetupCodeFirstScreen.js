import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize } from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import SetupCodeComponent from './SetupCodeComponent';
import Consts from '../../../utils/Consts';

export default class SetupCodeFirstScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting2fa.setupCode'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  _handleNext = () => {
    const { navigation } = this.props;
    navigation.navigate('SetupCodeSecondScreen');
  }

  render() {
    const textGuide = I18n.t('setting2fa.launchGoogleAuthenticator');
    return (
      <View style={styles.SetupCode}>
        <SetupCodeComponent
          imageStep={Consts.MANGO_STEP_OVAL.first}
          textGuide={textGuide}
          nextStep={this._handleNext}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  SetupCode: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
});
