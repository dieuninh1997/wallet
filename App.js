import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Screens from './app/screens/Screens';


const App = StackNavigator(Screens, {
  headerMode: 'screen',
});

export default App;
