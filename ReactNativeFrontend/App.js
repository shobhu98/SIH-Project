import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Routing from './Routing';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Language from './pages/Language';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import PoliceMan from './pages/animation_components/PoliceMan';
import NotingDetails from './pages/animation_components/NotingDetails';
import RequestingDetails from "./pages/animation_components/RequestingDetails";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      // <Language />
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="RequestingDetails" component={RequestingDetails} />
            <Stack.Screen name="NotingDetails" component={NotingDetails} />
            <Stack.Screen name="PoliceMan" component={PoliceMan} />
            <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainPage" component={MainPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}