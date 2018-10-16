import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Consts from '../../utils/Consts';

export default class MangoStepOval extends Component {
  render() {
    const { stepOval } = this.props;
    return (
      <View style={styles.mangoStepOval}>
        <Text style={[styles.originalStep, stepOval === Consts.MANGO_STEP_OVAL.first ? styles.currentStep : null]}></Text>
        <Text style={[styles.originalStep, stepOval === Consts.MANGO_STEP_OVAL.second ? styles.currentStep : null]}></Text>
        <Text style={[styles.originalStep, stepOval === Consts.MANGO_STEP_OVAL.last ? styles.currentStep : null]}></Text>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  mangoStepOval: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  originalStep: {
    width: '12@s',
    height: '12@s',
    backgroundColor: 'rgb(141, 150, 177)',
    borderRadius: '6@s',
    marginLeft: '8@s',
    marginRight: '8@s',
  },
  currentStep: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    borderWidth: 4,
    borderColor: 'rgb(141, 150, 177)',
    backgroundColor: 'transparent'
  },
});
