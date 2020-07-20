import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import Language from './pages/Language';
import Login from './pages/Login';
import FileFIR from './pages/FileFIR';
import TrackStatus from './pages/TrackStatus';
import Profile from './pages/Profile';
import MedicalHelp from './pages/MedicalHelp';

const AppNavigator = createStackNavigator({
  Language: {
    screen: Language,
    navigationOptions: {
        headerShown: false,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
        headerShown: false,
    }
  },
  MainPage: {
    screen: FileFIR,
    navigationOptions: {
        headerShown: false,
    }
  },
});

const TabNavigator = createBottomTabNavigator({
    FileFIR: FileFIR,
    TrackStatus: TrackStatus,
    Profile: Profile,
    MedicalHelp: MedicalHelp
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let iconSize;
        if (routeName === 'FileFIR') {
          iconName = focused? 'ios-information-circle': 'ios-information-circle-outline';
          iconSize = focused? 28: 20;
        } else if (routeName === 'TrackStatus') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
          iconSize = focused? 28: 20;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={iconSize} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ED5A67',
      inactiveTintColor: '#16335C',
    },
  }
);

export default createAppContainer(TabNavigator);