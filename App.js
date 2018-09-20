import { createStackNavigator } from 'react-navigation';
import Screens from './app/screens/Screens';


const App = createStackNavigator(Screens, {
  headerMode: 'screen',
});

export default App;
