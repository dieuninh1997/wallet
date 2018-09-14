import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MangoBackButton from '../common/MangoBackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MangoBackButton navigation={navigation} />,
    title: 'Settings',
    headerTitleStyle: styles.headerTitle,
    headerRight: (<View />),
  })

  render() {
    return (
      <View>
        <ScrollView>
          <Text>PROFILE</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },
});
