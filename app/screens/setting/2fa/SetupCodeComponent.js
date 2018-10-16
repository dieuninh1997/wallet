import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import I18n from '../../../i18n/i18n';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, Fonts, CommonSize, CommonColors } from '../../../utils/CommonStyles';
import MangoBackButton from '../../common/MangoBackButton';
import MangoGradientButton from '../../common/MangoGradientButton';
import MangoStepOval from '../../common/MangoStepOval';
import Consts from '../../../utils/Consts';

export default class SetupCodeComponent extends Component {
  render() {
    const {
      imageStep, textGuide, nextStep,
    } = this.props;
    const imageLinks = [
      require('../../../../assets/setting/group2.png'),
      require('../../../../assets/setting/group2.png'),
      require('../../../../assets/setting/group4.png'),
    ];
    let imageSource;
    if (imageStep === Consts.MANGO_STEP_OVAL.first) {
      imageSource = imageLinks[0];
    } else if (imageStep === Consts.MANGO_STEP_OVAL.second) {
      imageSource = imageLinks[1];
    } else {
      imageSource = imageLinks[2];
    }
    return (
      <View style={styles.setupCodeComponent}>
        <View style={styles.imageBlock}>
          <Image
            source={imageSource}
            style={styles.image}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.textGuide}>{textGuide}</Text>
        </View>

        <View style={styles.stepGuide}>
          <MangoStepOval
            stepOval={imageStep}
          />
        </View>

        <View style={styles.btnBlock}>
          <MangoGradientButton
            btnText={I18n.t('backupPassphrase.btnNext')}
            btnStyle={styles.btnNext}
            onPress={() => nextStep()}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  setupCodeComponent: {
    paddingTop: '44@s',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 247, 250)',
  },
  imageBlock: {
    height: '303@s',
    marginBottom: '16@s',
  },
  image: {
    width: '156@s',
    height: '303@s',
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: '30@s'
  },
  textGuide: {
    width: '271@s',
    textAlign: 'center',
    lineHeight: '20.8@ms',
    color: 'rgb(28, 28, 28)',
    fontSize: '16@ms',
    ...Fonts.Ubuntu_Light,
  },
  stepGuide: {

  },
  btnBlock: {
    marginTop: '30@s',
  },
  btnNext: {
    width: '140@s',
    height: '48@s',
    marginBottom: '5@s',
    marginHorizontal: '5@s',
  }
});
