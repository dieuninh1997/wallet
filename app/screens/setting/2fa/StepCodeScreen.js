import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  IndicatorViewPager, PagerDotIndicator,
} from 'rn-viewpager';
import MangoBackButton from '../../common/MangoBackButton';
import I18n from '../../../i18n/i18n';
import { CommonStyles } from '../../../utils/CommonStyles';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import SetupCodeComponent from './SetupCodeComponent';
import Consts from '../../../utils/Consts';
import { scale } from '../../../libs/reactSizeMatter/scalingUtils';

export default class StepCodeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('setting2fa.setupCode'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  _handleNext = () => {
    const { navigation } = this.props;
    navigation.navigate('GoogleAuthScreen', false);
  }

  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        style={styles.indicator}
        pageCount={3}
        dotStyle={styles.dotStyle}
        selectedDotStyle={styles.selectedDotStyle}
      />
    );
  }

  render() {
    const textGuideFirst = I18n.t('setting2fa.launchGoogleAuthenticator');
    const textGuideSecond = I18n.t('setting2fa.manuallyEnterYourAccount');
    const textGuideLast = I18n.t('setting2fa.useGoogleAuthenticator');
    return (
      <View style={styles.setupCode}>
        <IndicatorViewPager
          style={{ height: '100%' }}
          indicator={this._renderDotIndicator()}
        >
          <View>
            <SetupCodeComponent
              imageStep={Consts.MANGO_STEP_OVAL.first}
              textGuide={textGuideFirst}
              nextScreen={this._handleNext}
            />
          </View>
          <View>
            <SetupCodeComponent
              imageStep={Consts.MANGO_STEP_OVAL.second}
              textGuide={textGuideSecond}
              nextScreen={this._handleNext}
            />
          </View>
          <View>
            <SetupCodeComponent
              imageStep={Consts.MANGO_STEP_OVAL.last}
              textGuide={textGuideLast}
              nextScreen={this._handleNext}
            />
          </View>
        </IndicatorViewPager>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  setupCode: {
    backgroundColor: 'rgb(245, 247, 250)',
  },
  indicator: {
    bottom: scale(17),
  },

  dotStyle: {
    width: '12@s',
    height: '12@s',
    marginLeft: '6@s',
    marginRight: '6@s',
    borderRadius: '6@s',
    backgroundColor: '#8d96b1',
  },

  selectedDotStyle: {
    width: '20@s',
    height: '20@s',
    marginLeft: '6@s',
    marginRight: '6@s',
    borderRadius: '10@s',
    borderWidth: '4@s',
    borderColor: '#8d96b1',
    backgroundColor: '#0000',
  },
});
