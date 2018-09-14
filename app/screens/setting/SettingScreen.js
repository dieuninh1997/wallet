import React, {Component} from 'react';
import {View, Text} from 'react-native';
import BackButton from '../common/BackButton';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

export default class SettingScreen extends Component{
  static navigationOptions = ({navigation}) =>({
    headerLeft: <BackButton navigation={navigation}></BackButton>,
    title: 'Settings',
    headerTitleStyle: styles.headerTitle,
    headerRight: (<View />),
  })

  render(){
    return(
      <View>
        <Text>asnjas</Text>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },
})