import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

class LandingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LandingScreen</Text>
      </View>
    );
  }
}
export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
