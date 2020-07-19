import React from 'react';
import { Avatar, Card, IconButton, DefaultTheme } from 'react-native-paper';
import {Content} from 'native-base';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    },
};

export default class MainPage extends React.Component {
    render(){
        return(
            <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
                style={{backgroundColor:"white"}}
                theme={theme}
            />
        );
    }
}