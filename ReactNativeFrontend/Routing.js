import React from 'react';
import {Text} from 'react-native';
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
import ChooseGender from './pages/ChooseGender';
import FillForm from './pages/FillForm';

import PoliceMan from './pages/animation_components/male/PoliceMan';
import NotingDetailsMale from './pages/animation_components/male/NotingDetailsMale';
import RequestingDetailsMale from "./pages/animation_components/male/RequestingDetailsMale";
import NotingDetailsFemale from "./pages/animation_components/female/NotingDetailsFemale";
import RequestingDetailsFemale from "./pages/animation_components/female/RequestingDetailsFemale";
import PoliceWoman from "./pages/animation_components/female/PoliceWoman";

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

const AnimationStack= createStackNavigator({
    NotingDetailsFemale: NotingDetailsFemale,
});

const FileFIRStack= createStackNavigator({
    FileFIR: {
      screen: FileFIR,
      navigationOptions: {
          headerShown: false,
      }
    },
    ChooseGender: {
      screen: ChooseGender,
      navigationOptions: {
          headerShown: false,
      }
    },
    AnimationStack: {
        screen: AnimationStack,
        navigationOptions: {
            headerShown: false,
        }
    },
    FillForm: {
        screen: FillForm,
        navigationOptions: {
            headerShown: false,
        }
    },
    
});
  

const TabNavigator = createBottomTabNavigator({
    FileFIRStack:{
        screen:FileFIRStack,
        navigationOptions: {
            tabBarLabel: 'File FIR'
        }
    },
    TrackStatus: {
        screen:TrackStatus,
        navigationOptions: {
            tabBarLabel: 'Track Status'
        }
    },
    Profile: Profile,
    MedicalHelp: {
        screen:MedicalHelp,
        navigationOptions: {
            tabBarLabel: 'Medical Help'
        }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let iconSize;
        if (routeName === 'FileFIRStack') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
            iconSize = focused? 28: 18;
        } else if (routeName === 'TrackStatus') {
            iconName = focused? 'ios-information-circle': 'ios-information-circle-outline';
            iconSize = focused? 28: 18;
        } else if (routeName === 'Profile'){
            iconName = focused ? 'ios-contact' : 'ios-contact';
            iconSize = focused? 28: 18;
        } else if (routeName === 'MedicalHelp'){
            iconName = focused ? 'md-help-circle' : 'md-help';
            iconSize = focused? 28: 18;
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