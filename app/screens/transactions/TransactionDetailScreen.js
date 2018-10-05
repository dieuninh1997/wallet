import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { CommonStyles, CommonColors } from '../../utils/CommonStyles';
import AppConfig from '../../utils/AppConfig';
import MangoBackButton from '../common/MangoBackButton';
import I18n from '../../i18n/i18n';
import Moment from 'moment';

export default class TransactionDetailScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    headerLeft: AppConfig.ACCESS_TOKEN ? <View /> : <MangoBackButton navigation={navigation} />,
    title: I18n.t('transactionDetail.transactionDetail'),
    headerTitleStyle: CommonStyles.headerTitle,
    headerStyle: CommonStyles.header,
    headerRight: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      transaction: new Object(),
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.setState({
      transaction: params,
    });
  }

  render() {
    const { transaction } = this.state;

    return <View style={styles.transactionDetail}>
      <View style={styles.transactionDetailContent}>
        <Text style={styles.transactionDate}>{Moment(transaction.time).format('MMM DD hh:mm')}</Text>
        <Text style={styles.transactionId}>{ transaction.id }</Text>
        <View style={styles.transactionWalletAddress}>
          <View style={styles.senderWalletAddress}>
            <Image
              source={require('../../../assets/wallet/wallet.png')}
              style={styles.walletIcon}
            />
            <Text style={styles.fontText}>{ transaction.sendAddress }</Text>
          </View>
          <View style={styles.decorator}>
            <Image
              source={require('../../../assets/up/up-arrow.png')}
              style={styles.walletIcon}
            />
            <View style={styles.lineStyle} />
          </View>
          <View style={styles.receiverWalletAddress}>
            <Image
              source={require('../../../assets/wallet/wallet.png')}
              style={styles.walletIcon}
            />
            <Text style={styles.fontText}>{ transaction.receiveAddress }</Text>
          </View>
        </View>
        <View style={styles.infor}>
          <Text style={styles.labelInfo}>{ I18n.t('genneralText.recieved') }:</Text>
          <Text style={styles.labelContent}>{ transaction.value }</Text>
        </View>
        <View style={styles.infor}>
          <Text style={styles.labelInfo}>{ I18n.t('genneralText.confirmation') }:</Text>
          <Text style={styles.labelContent}>{ transaction.value }</Text>
        </View>
      </View>
    </View>
  }
}

const styles = ScaledSheet.create({
  transactionDetail: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: CommonColors.headerBarBgColor,
    fontSize: '18@s',
  },
  transactionDetailContent: {
    marginTop: '20@s',
    width: '90%',
  },
  transactionWalletAddress: {
    borderWidth: 2,
    borderRadius: '10@s',
    borderColor: CommonColors.customBorderColor,
    marginTop: '15@s',
    marginBottom: '15@s',
    padding: '10@s',
  },
  senderWalletAddress: {
    flexDirection: 'row',
    marginBottom: '10@s',
  },
  decorator: {
    flexDirection: 'row',
    marginBottom: '10@s',
  },
  receiverWalletAddress: {
    flexDirection: 'row',
  },
  walletIcon: {
    width: '30@s',
    height: '30@s',
    marginRight: '10@s',
  },
  lineStyle: {
    borderBottomColor: CommonColors.customBorderColor,
    borderBottomWidth: 1,
    width: '280@s',
    height: '15@s',
  },
  infor: {
    flexDirection: 'row',
    marginBottom: '10@s',
  },
  labelInfo: {
    marginRight: '30@s',
    fontSize: '18@s',
    color: CommonColors.headerTitleColor,
  },
  labelContent: {
    fontWeight: 'bold',
    fontSize: '18@s',
    color: '#2E62CC',
  },
  transactionDate: {
    fontSize: '20@s',
    marginBottom: '15@s',
  },
  transactionId: {
    fontSize: '18@s',
    color: CommonColors.headerTitleColor,
  },
  fontText: {
    fontSize: '16@s',
    color: CommonColors.headerTitleColor,
    width: '280@s',
  }
});
