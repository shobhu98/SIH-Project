import React from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import Routing from './Routing';
import { store,view} from '@risingstack/react-easy-state';

const colorScheme = {
    primaryColor: "#16335C",
    secondaryColor: "#FF4B63"
};

const lan = store({ lang: 'en' });


class App extends React.Component {
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
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading/>;
        }

        return (
            <Routing/>
        );
    }
}

export default view(App);