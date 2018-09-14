import React from 'react';
import { View, Text } from "react-native";
import PieChart from 'react-native-pie-chart';
import ScaledSheet from "../../libs/reactSizeMatter/ScaledSheet";
import MangoHeader from "../common/MangoHeader";

class DashboardScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    const data = [
      { id: 0, count: 2754.55, color: '#FFD82F', countCoin: '587.00 MGC' },
      { id: 1, count: 2054.58, color: '#2650BF', countCoin: '0.0578 BTC' },
      { id: 2, count: 2054.58, color: '#FFA034', countCoin: '0.0578 ETH' }
    ];
    let series = [], sliceColor = [];

    data.map(d => {
      series.push(d.count);
      sliceColor.push(d.count);
    });

    const sumSerires = series.reduce((a, b) => a + b);

    this.state = {
      data,
      series,
      sliceColor: ['#FFD82F', '#2650BF', '#FFA034'],
      chart_wh: 220,
      sumSerires,
    };
  }

  _renderItemInforData(item) {
    return (
      <View style={styles.itemGroup} key={item.id}>
        <View style={[{ backgroundColor: item.color }, styles.itemColor]}></View>
        <Text style={styles.itemCount}>{'$ ' + item.count}</Text>
        <Text style={styles.itemCountCoin}>{item.countCoin}</Text>
      </View>
    )
  }

  _renderInforData() {
    const { data } = this.state;

    return (
      <View style={styles.inforGroup}>
        {data.map(d => {
          return this._renderItemInforData(d)
        })}
      </View>
    )
  }


  render() {
    const { series, sliceColor, chart_wh, sumSerires } = this.state;
    return (
      <View style={styles.dashboardScreen}>
        <PieChart
          chart_wh={chart_wh}
          series={series}
          doughnut={true}
          style={styles.pieChart}
          sliceColor={sliceColor}
          radius={200}
          coverFill={'#FFF'}
        />

        <View style={styles.sumSeriresGroup}>
          <Text style={styles.titleBalance}>Balance</Text>
          <Text style={styles.sumSerires}>{'$ ' + sumSerires}</Text>
        </View>

        {this._renderInforData()}
      </View>
    )
  }
}

export default DashboardScreen;

const styles = ScaledSheet.create({
  dashboardScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF3'
  },
  pieChart: {
    marginTop: '15@s',
  },
  sumSeriresGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '95@s',
    zIndex: 3
  },
  sumSerires: {
    color: '#1D42B4',
    fontSize: '24@s'
  },
  titleBalance: {
    color: '#A1A6B5',
    fontSize: '15@s'
  },
  inforGroup: {
    flexDirection: 'row',
    marginTop: '10@s'
  },
  itemGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  itemColor: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s'
  },
  itemCount: {
    color: '#2A334D',
    fontSize: '13@s',
    marginTop: '5@s',
    marginBottom: '5@s',
  },
  itemCountCoin: {
    color: '#474F66',
    fontSize: '15@s'
  }
});