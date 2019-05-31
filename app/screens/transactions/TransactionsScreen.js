import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import _ from 'lodash';
import Moment from 'moment';
import { withNetworkConnectivity } from 'react-native-offline';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonColors, Fonts, CommonSize } from '../../utils/CommonStyles';
import UIUtils from '../../utils/UIUtils';
import MangoDropdown from '../common/MangoDropdown';
import WalletService from '../../services/wallet';
import Events from '../../utils/Events';
import BaseScreen from '../BaseScreen';
import Consts from '../../utils/Consts';
import AppPreferences from '../../utils/AppPreferences';
import MangoConnectionLost from '../common/MangoConnectionLost';
import fromExponential from 'from-exponential';

class TransactionsScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      transactionLenght: 0,
      address: '0x5c7738b67a3403f349782244e59e776ddb3581c3',
      page: 1,
      perPage: Consts.PER_PAGE,
      isProcess: false,
      coinSelected: Consts.LIST_COIN[0],
    };
  }

  componentDidMount = async () => {
    super.componentDidMount();
    try {
      const { page, perPage } = this.state;
      const indexCoin = await AppPreferences.getCoinSelected();
      const address = await AppPreferences.getEthAddress();
      console.log('coinSelected', indexCoin);

      const coinSelected = indexCoin ? Consts.LIST_COIN[parseInt(indexCoin, 10)] : Consts.LIST_COIN[0];

      this.setState({
        coinSelected,
        address,
      });

      await this._getTransactions(coinSelected.symbol, address, page, perPage);
    } catch (error) {
      console.log('MangoDropdown.componentDidMount._error: ', error);
    }
  }

  async _loadData() {
    const { address, perPage } = this.state;
    this.setState({
      page: 1,
    });
    await this._loadCoinSelected();
    const indexCoin = await AppPreferences.getCoinSelected();
    const coinSelected = indexCoin ? Consts.LIST_COIN[parseInt(indexCoin, 10)] : Consts.LIST_COIN[0];
    await this._getTransactions(coinSelected.symbol, address, 1, perPage);
  }

  _loadCoinSelected = async () => {
    const indexCoin = await AppPreferences.getCoinSelected();
    const coinSelected = indexCoin ? Consts.LIST_COIN[parseInt(indexCoin, 10)] : Consts.LIST_COIN[0];
    this.setState({
      coinSelected,
    });
  };

  getDataEventHandlers() {
    return {
      [Events.COIN_SELECTED_UPDATED]: this._loadData.bind(this),
    };
  }

  _getTransactions = async (coin, address, page, perPage, isFirst = true) => {
    try {
      const transactionData = await WalletService.getTransactions(coin, address, page, perPage);
      const transactions = transactionData.filter(item =>{ return item.value !== fromExponential(0) });
      console.log('TransactionsScreen.transactions =====>: ', transactions);
      this.setState({
        isProcess: false,
        transactionLenght: transactions.length,
      });

      if (!transactions.length) {
        // this.setState({
        //   transactions: [],
        // });
        return;
      }

      let datas = transactions;
      if (!isFirst) {
        const transactionsOrigin = _.map(this.state.transactions, item => item.data);
        datas = _.concat(_.flattenDeep(transactionsOrigin), transactions);
      }

      const groupedByYear = _.groupBy(datas, (item) => {
        const d = new Date(item.time);
        return d.getFullYear();
      });

      this.setState({
        transactions: _.map(groupedByYear, (value, prop) => ({ year: prop, data: value })),
        page: isFirst ? 1 : page,
      });
    } catch (error) {
      console.log('TransactionsScreen._error: ', error);
    }
  }

  _getMoreData = (isFirst = false) => {
    const {
      page, address, isProcess, coinSelected, perPage,
    } = this.state;
    if (isProcess) {
      return;
    }
    this.setState({
      isProcess: true,
    });
    this._getTransactions(coinSelected.symbol, address, isFirst ? 1 : page + 1, perPage, isFirst);
  }

  _renderTransactonsList = () => {
    const { transactions } = this.state;

    return (
      <View style={styles.transactionsContainer}>
        {transactions.map(transaction => this._renderTransactonsYear(transaction))}
        {UIUtils.createBottomPadding()}
      </View>
    );
  }

  _showTransactionDetail = (transaction, address) => {
    const { navigation } = this.props;
    const { coinSelected } = this.state;

    transaction.coinInfo = coinSelected;
    transaction.isSend = transaction.receiveAddress !== address.toLowerCase();
    console.log('transaction.coinInfo', transaction.coinInfo);

    navigation.navigate('TransactionDetailScreen', transaction);
  }

  _renderTransactonsYear = (transaction) => {
    const { address, coinSelected } = this.state;

    return (
      <View key={transaction.year}>
        <Text style={styles.textYear}>{transaction.year}</Text>
        <FlatList
          data={transaction.data}
          renderItem={({ item }) => this._renderTransactonsItem(item, address, coinSelected)}
        />
      </View>
    );
  }

  _showIconStatus = (transaction, address) => {
    const images = [
      require('../../../assets/send/sent.png'),
      require('../../../assets/recieved/received.png'),
    ];
    return transaction.receiveAddress === address.toLowerCase() ? images[1] : images[0];
  }

  _renderTransactonsItem = (transaction, address, coinSelected) => (
    <TouchableOpacity key={transaction.id} onPress={() => this._showTransactionDetail(transaction, address)}>
      <View style={styles.transactionItemContainer}>
        <View style={styles.transactionImageContainer}>
          <Image
            source={this._showIconStatus(transaction, address)}
            style={[styles.transactionImageItem, transaction.status === 'CONFIRMED' ? '' : styles.blurImage]}
          />
        </View>
        <View style={styles.transactionInfoContainer}>
          <Text style={styles.textDate}>
            {Moment(transaction.time).format('MMM DD hh:mm')}
            {' '}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.addressInfo}
          >
            {transaction.id}
          </Text>
        </View>
        <View style={styles.transactionValueItem}>
          <Text
            style={[styles.textCoinValue, transaction.receiveAddress === address.toLowerCase() ? styles.textRecieved : styles.textSend]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {transaction.receiveAddress === address.toLowerCase() ? '+' : '-'}
            {transaction.value}
          </Text>
          <Text style={[styles.textCoinValueName, transaction.receiveAddress === address.toLowerCase() ? styles.textRecieved : styles.textSend]}>
            {coinSelected.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { transactions, isProcess, transactionLenght } = this.state;
    const { isConnected } = this.props;
    if (!isConnected) {
      return <MangoConnectionLost />;
    }
    return (
      <View style={styles.container}>
        <MangoDropdown />
        <ScrollView
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (transactionLenght < 5) {
              this._getMoreData();
            }
          }}
          scrollEventThrottle={0}
          onScroll={(e) => {
            let paddingToBottom = 10;
            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
            if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - paddingToBottom) {
              this._getMoreData();
            }
          }}
          refreshControl={(
            <RefreshControl
              refreshing={isProcess}
              onRefresh={() => this._getMoreData(true)}
            />
          )}
        >
          {transactions && transactions.length ? this._renderTransactonsList() : null}
          {transactions && transactions.length === 0 ? <Text style={styles.noTransactionAvailable}>{I18n.t('transactions.noTransactionAvailable')}</Text> : null}
        </ScrollView>
      </View>
    );
  }
}

export default withNetworkConnectivity()(TransactionsScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
  },

  transactionsContainer: {
    alignItems: 'center',
    width: '360@s',
  },

  textYearContainer: {
    width: '360@s',
    borderBottomWidth: 1,
    borderBottomColor: CommonColors.customBorderColor,
    paddingVertical: '10@s',
  },

  textYear: {
    fontWeight: 'bold',
    fontSize: '32@ms',
    color: CommonColors.headerTitleColor,
    marginTop: '13@s',
    marginBottom: '13@s',
  },

  transactionItemContainer: {
    flexDirection: 'row',
    width: '340@s',
    borderTopWidth: 1,
    borderTopColor: CommonColors.customBorderColor,
    paddingVertical: '12@s',
  },

  transactionImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10@s',
  },

  transactionImageItem: {
    width: '32@s',
    height: '32@s',
  },

  blurImage: {
    opacity: 0.3,
  },

  transactionInfoContainer: {
    marginRight: '10@s',
    width: '170@s',
  },

  textDate: {
    fontSize: '13@ms',
    color: 'rgb(141, 147, 166)',
    ...Fonts.Ubuntu_Regular,
    marginBottom: '7@s',
  },

  addressInfo: {
    fontSize: '14@ms',
    color: CommonColors.headerTitleColor,
    ...Fonts.Ubuntu_Regular,
  },

  transactionValueItem: {
    width: '120@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#F2F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },

  textCoinValue: {
    fontSize: '16@ms',
    marginLeft: '50@s',
    ...Fonts.Ubuntu_Medium,
  },

  textCoinValueName: {
    fontSize: '16@ms',
    marginRight: '50@s',
    marginLeft: '5@s',
    ...Fonts.Ubuntu_Medium,
  },

  textSend: {
    color: '#ef1d29',
  },

  textRecieved: {
    color: '#2f64d1',
  },

  noTransactionAvailable: {
    fontSize: CommonSize.headerFontSize,
    ...Fonts.Ubuntu_Light,
    marginTop: '30@s',
  },
});
