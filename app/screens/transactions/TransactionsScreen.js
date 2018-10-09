import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import I18n from '../../i18n/i18n';
import _ from 'lodash';
import Moment from 'moment';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonColors } from '../../utils/CommonStyles';
import UIUtils from '../../utils/UIUtils';
import MangoDropdown from '../common/MangoDropdown';
import { getOrdersPending } from '../../api/transaction-history/TransactionRequest';
import WalletService from '../../services/wallet';

class TransactionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      address: '0x5c7738b67a3403f349782244e59e776ddb3581c3',
      page: 1,
      coinName: 'mgc4',
      perPage: 10,
      isProcess: false,
    };
  }

  // _loadData = async () => {
  //   try {
  //     const params = { currency: 'tenge', page: 1, limit: 20 };

  //     const responseOrder = await getOrdersPending(params);
  //     console.log('getOrderPending', responseOrder);
  //   } catch (err) {
  //     console.log('LoadDatas._error:', err);
  //   }
  // }

  componentDidMount = async () => {
    const { address, coinName } = this.state;

    await this._getTransactions(coinName, address, this.state.page, this.state.perPage);

    const socketEventHandlers = this.getSocketEventHandlers();
    for (const event in socketEventHandlers) {
      const handler = socketEventHandlers[event];
      window.GlobalSocket.bind(event, handler);
    }

    const dataEventHandlers = this.getDataEventHandlers();
    for (const event in dataEventHandlers) {
      const handler = dataEventHandlers[event];
      window.EventBus.bind(event, handler);
    }
    // this._loadData();
    // if (Platform.OS === 'android' && this.props.navigation) {
    //   this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
    //     //console.log("payload willBlur", payload)
    //     return BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid.bind(this))
    //   }
    //   );
    // }
  }

  _getTransactions = async (coin, address, page, perPage, isFirst = true) => {
    try {
      const transactions = await WalletService.getTransactions(coin, address, page, perPage);
      console.log('TransactionsScreen.transactions =====>: ', transactions);
      this.setState({
        isProcess: false,
      });

      if (!transactions.length) {
        return;
      }

      let datas = transactions;
      if (!isFirst) {
        const transactionsOrigin = _.map(this.state.transactions, (item) => item.data);
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

  componentWillUnmount = () => {
    const socketEventHandlers = this.getSocketEventHandlers();
    for (const event in socketEventHandlers) {
      const handler = socketEventHandlers[event];
      window.GlobalSocket.unbind(event, handler);
    }

    const dataEventHandlers = this.getDataEventHandlers();
    for (const event in dataEventHandlers) {
      const handler = dataEventHandlers[event];
      window.EventBus.unbind(event, handler);
    }
  }

  getSocketEventHandlers = () => ({
    TransactionCreated: this.onTransactionCreated.bind(this),
    OrderListUpdated: this._onOpenOrderUpdated.bind(this),
  })

  onTransactionCreated = (data) => {
    console.log('data', data);
  }

  _onOpenOrderUpdated = (data) => {
    const { currency } = this.props;

    if (data.currency !== currency) {

    }

    // this._loadData();
  }

  _getMoreData = () => {
    const { page, address, isProcess, coinName } = this.state;
    if (isProcess) {
      return;
    }
    this.setState({
      isProcess: true,
    });
    this._getTransactions(coinName, address, page + 1, this.state.perPage, false);
  }

  getDataEventHandlers = () => ({})

  notify = (event, data) => {
    window.EventBus.notify(event, data);
  }


  _renderTransactonsList = () => {
    const { transactions } = this.state;

    return (
      <View style={styles.transactionsContainer}>
        {transactions.map(transactions => this._renderTransactonsYear(transactions))}
        {UIUtils.createBottomPadding()}
      </View>
    );
  }

  _showTransactionDetail = (transaction) => {
    const { navigation } = this.props;
    navigation.navigate('TransactionDetailScreen', transaction);
  }

  _renderTransactonsYear = (transactions) => {
    const { address } = this.state;

    return (
      <View key={transactions.year}>
        <Text style={styles.textYear}>{ transactions.year }</Text>
        <FlatList
          data={transactions.data}
          renderItem={({item}) => this._renderTransactonsItem(item, address)}
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

  _renderTransactonsItem = (transaction, address) => (
    <TouchableOpacity key={transaction.id} onPress={() => this._showTransactionDetail(transaction)}>
      <View style={styles.transactionItemContainer}>
        <View style={styles.transactionImageContainer}>
          <Image
            source={this._showIconStatus(transaction, address)}
            style={[styles.transactionImageItem, transaction.status === 'CONFIRMED' ? '' : styles.blurImage]}
          />
        </View>
        <View style={styles.transactionInfoContainer}>
          <Text>
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
          <Text style={[styles.textCoinValue, transaction.receiveAddress === address.toLowerCase() ? styles.textRecieved : styles.textSend]}>
            {transaction.receiveAddress === address.toLowerCase() ? '+' : '-'}
            {transaction.value}
            {' '}
            {'ETH'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { transactions } = this.state;
    return (
      <View style={styles.container}>
        <MangoDropdown />
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            let paddingToBottom = 10;
            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
            if(e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - paddingToBottom) {
              this._getMoreData();
            }
          }}
        >
          {transactions && transactions.length ? this._renderTransactonsList() : null}
        </ScrollView>
      </View>
    );
  }
}

export default TransactionsScreen;

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
    fontSize: '32@s',
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

  addressInfo: {
    color: CommonColors.headerTitleColor,
  },

  transactionValueItem: {
    width: '120@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#F2F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  textCoinValue: {
    fontSize: '16@s',
    fontWeight: 'bold',
  },

  textSend: {
    color: '#F52036',
  },

  textRecieved: {
    color: '#2E62CC',
  },
});
