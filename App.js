import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Jogo from './screens/Jogo';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux';
import store from './store';
import { useDispatch } from 'react-redux';
import { setBoardSize } from './store';

const Tab = createBottomTabNavigator();
const dispatch = useDispatch();

const COLUMN_COUNT = 7;
const ROW_COUNT = 6;

// Chamando a ação setBoardSize para definir as variáveis na store
useEffect(() => {
  dispatch(setBoardSize(COLUMN_COUNT, ROW_COUNT));
}, []);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Settings') {
                iconName = 'settings';
              } else if (route.name === 'Jogo') {
                iconName = 'gamepad';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Jogo" component={Jogo} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}