import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
// import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonColors } from '../../utils/CommonStyles';
import MangoDropdown from '../common/MangoDropdown';
import { getOrdersPending } from '../../api/transaction-history/TransactionRequest';
import WalletService from '../../services/wallet';
import _ from 'lodash';
import Moment from 'moment';

class TransactionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      address: '0x5C7738b67a3403F349782244E59E776DdB3581c3',
    };
  }

  _loadData = async () => {
    try {
      const params = { currency: 'tenge', page: 1, limit: 20 };

      const responseOrder = await getOrdersPending(params);
      console.log('getOrderPending', responseOrder);
    } catch (err) {
      console.log('LoadDatas._error:', err);
    }
  }

  componentDidMount = async () => {
    const { address } = this.state;
    try {
      const transactions = await WalletService.getTransactions('nanj', address, 1, 10);
      console.log('TransactionsScreen: ', transactions);

      const groupedByYear = _.groupBy(transactions, function(item) {
          const d = new Date(item.time);
          return d.getFullYear();
      });

      this.setState({
        transactions: _.map(groupedByYear, function(value, prop) {
		  return { year: prop, data: value };
		}),
      });
    } catch (error) {
      console.log('TransactionsScreen._error: ', error);
    }
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
    this._loadData();
    // if (Platform.OS === 'android' && this.props.navigation) {
    //   this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
    //     //console.log("payload willBlur", payload)
    //     return BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid.bind(this))
    //   }
    //   );
    // }
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
      return;
    }

    this._loadData();
  }

  getDataEventHandlers = () => ({})

  notify = (event, data) => {
    window.EventBus.notify(event, data);
  }


  _renderTransactonsList = () => {
    const { transactions } = this.state;

    return (
      <View style={styles.transactionsContainer}>
        {transactions.map((transactions) => this._renderTransactonsYear(transactions))}
      </View>
    );
  }

  _renderTransactonsYear = (transactions) => {
    const { address } = this.state;
    const images = [
      require('../../../assets/send/right-arrow.png'),
      require('../../../assets/recieved/left-arrow.png'),
      require('../../../assets/loadding/rotate.png'),
    ];

    return (
      <View key={transactions.year}>
        <Text style={styles.textYear}>{ transactions.year }</Text>
        {transactions.data.map((transaction, index) => this._renderTransactonsItem(transaction, index, images, address))}
      </View>
    );
  }

  _renderTransactonsItem = (transaction, index, images, address) => (
    <View key={index} style={styles.transactionItemContainer}>
      <View style={styles.transactionImageContainer}>
        <Image
          source={transaction.receiveAddress === address.toLowerCase() ? images[1] : images[0]}
          style={styles.transactionImageItem}
        />
      </View>
      <View style={styles.transactionInfoContainer}>
        <Text>{Moment(transaction.time).format('MMM DD hh:mm')} </Text>
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
  )

  render() {
    const { transactions } = this.state;
    return (
      <View style={styles.container}>
        <MangoDropdown />
        <ScrollView
          showsVerticalScrollIndicator={false}
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
    fontSize: '28@s',
    color: CommonColors.headerTitleColor,
  },

  transactionItemContainer: {
    flexDirection: 'row',
    width: '340@s',
    borderBottomWidth: 1,
    borderBottomColor: CommonColors.customBorderColor,
    paddingVertical: '12@s',
  },

  transactionImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10@s',
  },

  transactionImageItem: {
    width: '20@s',
    height: '20@s',
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
