import { scale } from '../libs/reactSizeMatter/scalingUtils';
import { Platform } from 'react-native';

class CommonColors {
  static screenBgColor = '#F5F7FA';

  static headerBarBgColor = '#FFFFFF';

  static headerTitleColor = '#000000';

  static startSelectBoxBgColor = '#3975D7';

  static endSelectBoxBgColor = '#1F42B3';

  static startGradientYellow = '#FFDD3B';

  static endGradientYellow = '#FFC136';

  static startGradientOrange = '#FFB34C';

  static endGradientOrange = '#FF842E';

  static startGradientBlue = '#3773D6';

  static endGradientBlue = '#2046B6';

  static customBorderColor = '#DEE3E9';
}

class CommonSize {
  static inputHeight = '43@s';

  static inputFontSize = '14@s';

  static formLabelFontSize = '14@s';

  static btnSubmitHeight = scale(44);

  static headerHeight = scale(44);
}

const CommonStyles = {
  screen: {
    flex: 1,
    backgroundColor: CommonColors.screenBgColor,
  },

  header: {
    backgroundColor: CommonColors.headerBarBgColor,
    height: CommonSize.headerHeight,
    elevation: 0,
    borderBottomWidth: scale(1),
    borderBottomColor: '#E7E7E9',
  },

  headerWithDropdown: {
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 0,
    height: CommonSize.headerHeight,
    borderBottomWidth: 0,
  },

  headerTitle: {
    flexGrow: 0.9,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '200',
    color: CommonColors.headerTitleColor,
  },

  // Section select coin
  selectCoinContainer: {
    backgroundColor: CommonColors.headerBarBgColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: '10@s',
    borderBottomWidth: 1,
    borderColor: CommonColors.customBorderColor,
  },

  selectCoinContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '220@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#336ACF',
  },
};

const iOSFonts = {
  Ubuntu_Light: {
    fontFamily: 'Ubuntu-Light'
  },
  Ubuntu_Medium: {
    fontFamily: 'Ubuntu-Medium'
  },
  Ubuntu_Bold: {
    fontFamily: 'Ubuntu-Bold'
  },
  Ubuntu_Regular: {
    fontFamily: 'Ubuntu-Regular'
  }
};

const androidFonts = {
  Ubuntu_Light: {
    fontFamily: 'Ubuntu-Light'
  },
  Ubuntu_Medium: {
    fontFamily: 'Ubuntu-Medium'
  },
  Ubuntu_Bold: {
    fontFamily: 'Ubuntu-Bold'
  },
  Ubuntu_Regular: {
    fontFamily: 'Ubuntu-Regular'
  }
};

const Fonts = Platform.OS === 'ios' ? iOSFonts : androidFonts;

export { CommonStyles, CommonColors, CommonSize, Fonts };
