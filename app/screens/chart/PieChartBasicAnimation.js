import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Pie } from 'react-native-pathjs-charts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class PieChartBasicAnimation extends Component {
  static navigationOptions = () => ({
    title: 'Pie - Basic - Animation',
  });

  render() {
    const data = [
      {
        population: 7694980,
      },
      {
        population: 6590667,
        color: { r: 223, g: 154, b: 20 },
      }, {
        population: 7284698,
      },
    ];

    const options = {
      width: 350,
      height: 350,
      animate: {
        enabled: true,
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3,
      },
    };

    return (
      <View style={styles.container}>
        <Pie
          data={data}
          options={options}
          accessorKey="population"
          pallete={
            [
              { r: 25, g: 99, b: 201 },
              { r: 24, g: 175, b: 35 },
              { r: 190, g: 31, b: 69 },
              { r: 100, g: 36, b: 199 },
              { r: 214, g: 207, b: 32 },
              { r: 198, g: 84, b: 45 },
            ]
          }
          r={120}
          R={150}
        />
      </View>
    );
  }
}

export default PieChartBasicAnimation;
