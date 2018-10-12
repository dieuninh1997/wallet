import React, { Component } from 'react';
import {
  View, Text, ScrollView,
} from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MangoBackButton from '../common/MangoBackButton';
import {
  CommonStyles, CommonSize, CommonColors, Fonts,
} from '../../utils/CommonStyles';
import I18n from '../../i18n/i18n';

export default class TermsConditionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: I18n.t('terms.title'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: (<View />),
  })

  render() {
    return (
      <ScrollView style={styles.screen}>
        <Text style={styles.content}>{I18n.t('terms.content')}</Text>
      </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  screen: {
    backgroundColor: CommonColors.headerBarBgColor,
    height: '100%',
  },
  content: {
    fontSize: CommonSize.inputFontSize,
    marginLeft: '24@s',
    marginRight: '24@s',
    marginTop: '16@s',
    ...Fonts.Ubuntu_Light,
  },
});
