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
        {/* <Text style={styles.title}>{I18n.t('terms.titleTermsAndCondition')}</Text> */}
        <Text style={styles.content}>{I18n.t('terms.contentTermsAndCondition')}</Text>

        {/* <Text style={styles.title}>{I18n.t('terms.titlePrivacy')}</Text>
        <Text style={styles.content}>{I18n.t('terms.contentPrivacy')}</Text>

        <Text style={styles.title}>{I18n.t('terms.titleEndUser')}</Text>
        <Text style={styles.content}>{I18n.t('terms.contentEndUser')}</Text> */}
      </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  screen: {
    backgroundColor: CommonColors.headerBarBgColor,
    height: '100%',
  },
  title: {
    fontSize: '20@ms',
    marginLeft: '20@s',
    marginRight: '20@s',
    marginTop: '16@s',
    color: '#000',
    ...Fonts.Ubuntu_Regular,
  },
  content: {
    color: '#000',
    fontSize: '14@ms',
    marginLeft: '24@s',
    marginRight: '24@s',
    marginTop: '16@s',
    ...Fonts.Ubuntu_Light,
  },
});
