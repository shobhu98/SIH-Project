import React from 'react';
import {Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import CheckingCredentials from './pages/CheckingCredentials';
import Language from './pages/Language';
import Login from './pages/Login';
import FileFIR from './pages/FileFIR';
import TrackStatus from './pages/TrackStatus';
import Profile from './pages/Profile';
import MedicalHelp from './pages/MedicalHelp';
import ChooseGender from './pages/ChooseGender';
import FillForm from './pages/FillForm';
import Policeman from './pages/Policeman';
import Policewoman from './pages/Policewoman';
import FillCaseDetails from './pages/FillCaseDetails';
import Signature from './pages/Signature';
import CallForHelp from './pages/CallForHelp';
import Chatbot from './pages/Policeman';
import FillProfile from './pages/FillProfile';

import ViewFIR from './pages/ViewFIR';
import EditFIR from './pages/EditFIR';

// import PoliceMan from './pages/animation_components/male/PoliceMan';
import NotingDetailsMale from './pages/animation_components/male/NotingDetailsMale';
import RequestingDetailsMale from "./pages/animation_components/male/RequestingDetailsMale";
import NotingDetailsFemale from "./pages/animation_components/female/NotingDetailsFemale";
import RequestingDetailsFemale from "./pages/animation_components/female/RequestingDetailsFemale";
// import PoliceWoman from "./pages/animation_components/female/PoliceWoman";



// const AnimationStack= createStackNavigator({
//     NotingDetailsFemale: PoliceWoman,
// });

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
    MAnimationStack: {
        screen: Chatbot,
        navigationOptions: {
            headerShown: false,
        }
    },
    FAnimationStack: {
        screen: Policewoman,
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
    FillCaseDetails :{
        screen: FillCaseDetails,
        navigationOptions: {
            headerShown: false,
        }
    },
    Signature :{
        screen: Signature,
        navigationOptions: {
            headerShown: false,
        }
    },
    CallForHelp :{
        screen: CallForHelp,
        navigationOptions: {
            headerShown: false,
        }
    },
});

const TrackStatusStack= createStackNavigator({
    TrackStatus: {
      screen: TrackStatus,
      navigationOptions: {
          headerShown: false,
      }
    },
    EditFIR: {
        screen: EditFIR,
        navigationOptions: {
            headerShown: false,
        }
    },
    ViewFIR: {
        screen: ViewFIR,
        navigationOptions: {
            headerShown: false,
        }
    },
});

const ProfileStack=createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false,
        }
    },
    FillProfile:{
        screen:FillProfile,
        navigationOptions: {
            headerShown: false,
        }
    },
    ChangeLanguage:{
        screen:Language,
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
        screen:TrackStatusStack,
        navigationOptions: {
            tabBarLabel: 'Track Status'
        }
    },
    Profile: ProfileStack,
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

const AppNavigator = createStackNavigator({
    CheckingCredentials: {
        screen: CheckingCredentials,
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
      screen: TabNavigator,
      navigationOptions: {
          headerShown: false,
      }
    },
  });

export default createAppContainer(AppNavigator);