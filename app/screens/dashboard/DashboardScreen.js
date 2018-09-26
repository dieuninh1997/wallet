import React from 'react';
import { View, Text } from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import { getWallet } from '../../api/common/BaseRequest';

const COINS = [
  {
    symbol: 'BTC',
    fullName: 'Bitcoin'
  },
  {
    symbol: 'ETH',
    fullName: 'Etherium'
  },
];

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    const data = [
      {
        id: 0, count: 2754.55, color: '#FFD82F', countCoin: '587.00 MGC',
      },
      {
        id: 1, count: 2054.58, color: '#FFA034', countCoin: '0.0578 BTC',
      },
      {
        id: 2, count: 2054.58, color: '#2650BF', countCoin: '0.0578 ETH',
      },
    ];
    this.state = {
      data,
      prices: []
    };
  }

  async componentDidMount() {
    await this._loadData();
  }

  async _loadData() {
    const coinString = COINS.map(coin => coin.symbol);
    const prices = [];
    const linkString = coinString.reduce((a, b) => a + ',' + b);
    const response = await getWallet(linkString);

    for(let res in response) {
      const findLabel = COINS.find(coin => coin.symbol === res);

      prices.push({...response[res].USD, FULLNAME: findLabel.fullName });
    }

    this.setState({ prices });
  }

  _renderPieChart = () => {
    const data = [
      {
        population: 2754.55,
        color: { r: 255, g: 169, b: 52 },
      },
      {
        population: 2054.58,
        color: { r: 38, g: 80, b: 191 },
      }, {
        population: 2054.58,
        color: { r: 255, g: 216, b: 47 },
      },
    ];

    const options = {
      width: scale(350),
      height: scale(350),
      animate: {
        enabled: false,
      },
    };

    return (
      <View style={styles.container}>
        <Pie
          style={styles.pieContainer}
          data={data}
          options={options}
          accessorKey="population"
          r={scale(120)}
          R={scale(150)}
        />
      </View>
    );
  }

  _renderItemInforData(item) {
    return (
      <View style={styles.itemGroup} key={item.id}>
        <View style={[{ backgroundColor: item.color }, styles.itemColor]}/>
        <Text style={styles.itemCount}>{`$ ${item.count}`}</Text>
        <Text style={styles.itemCountCoin}>{item.countCoin}</Text>
      </View>
    );
  }

  _renderCoinList() {
    const { prices } = this.state;

    return (
      <View>
        {prices.map(price =>
          <View>
            <Text>{price.FULLNAME}</Text>
            <Text>{price.PRICE}</Text>
            <Text>{price.CHANGEPCT24HOUR}</Text>
          </View>
        )}
      </View>
    )
  }

  _renderInforData() {
    const { data } = this.state;

    return (
      <View style={styles.inforGroup}>
        {data.map(d => this._renderItemInforData(d))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.dashboardScreen}>
        {this._renderPieChart()}
        <View style={styles.sumSeriresGroup}>
          <Text style={styles.titleBalance}>Balance</Text>
          <Text style={styles.sumSerires}>$ 6,877.57</Text>
        </View>

        {this._renderInforData()}
        {this._renderCoinList()}
      </View>
    );
  }
}

export default DashboardScreen;

const styles = ScaledSheet.create({
  dashboardScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF3',
  },
  sumSeriresGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '150@s',
    zIndex: 3,
  },
  sumSerires: {
    color: '#1D42B4',
    fontWeight: '500',
    fontSize: '28@s',
  },
  titleBalance: {
    color: '#A1A6B5',
    fontSize: '18@s',
  },
  inforGroup: {
    flexDirection: 'row',
    marginTop: '10@s',
  },
  itemGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  itemColor: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
  },
  itemCount: {
    color: '#000',
    fontSize: '14@s',
    fontWeight: '500',
    marginTop: '5@s',
    marginBottom: '5@s',
  },
  itemCountCoin: {
    color: '#474F66',
    fontSize: '15@s',
  },
});
