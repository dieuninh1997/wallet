import { createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Screens from './app/screens/Screens';
import AppPreferences from './app/utils/AppPreferences';
import I18n from './app/i18n/i18n';

async function initApp() {
  try {
    const result = await AsyncStorage.getItem('user_locale');
    I18n.locale = result;
  } catch (error) {
    console.log('error');
  }
}

const App = createStackNavigator(Screens, {
  headerMode: 'screen',
});

export default App;
export { initApp };
