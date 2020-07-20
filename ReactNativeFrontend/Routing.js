import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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
  });

export default createAppContainer(TabNavigator);