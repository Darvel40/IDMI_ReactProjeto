import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Jogo from './screens/Jogo';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux';
import store from './store';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Início') {
                iconName = 'home';
              } else if (route.name === 'Definições') {
                iconName = 'settings';
              } else if (route.name === 'Jogo') {
                iconName = 'gamepad';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Início" component={Home} />
          <Tab.Screen name="Jogo" component={Jogo} />
          <Tab.Screen name="Definições" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
