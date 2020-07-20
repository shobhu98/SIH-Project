import React from 'react';
import { Card, DefaultTheme } from 'react-native-paper';
import {Content} from 'native-base';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {StyleProvider, Header, Title} from 'native-base';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    },
};
const styles = StyleSheet.create({
    card: {
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:5,
        backgroundColor:"white",
        height:200,
        borderWidth:2,
        borderColor: "#9e9e9e",
    },
    tinyLogo: {
        height: 150,
        width: 110,
        resizeMode: 'contain',
    },
});

export default class FileFIR extends React.Component {
    render(){
        return(
            <Content>
                <StatusBar backgroundColor="#16335C"/>
                <Card.Title
                    title="Talk to Virtual Officer"
                    subtitle="Interactive Police Officer"
                    // left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    right={(props) => <Image style={styles.tinyLogo} source={require('../assets/policeman.png')} resizeMethod="scale"/>}
                    style={styles.card}
                    theme={theme}
                />
                <Card.Title
                    title="Call for help"
                    subtitle="Professional Help will come your way"
                    // left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    right={(props) => <Image style={styles.tinyLogo} source={require('../assets/form.png')} resizeMethod="scale"/>}
                    style={styles.card}
                    theme={theme}
                />
                <Card.Title
                    title="Fill Manually"
                    subtitle="The old fashioned way"
                    // left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    right={(props) => <Image style={styles.tinyLogo} source={require('../assets/form.png')} resizeMethod="scale"/>}
                    style={styles.card}
                    theme={theme}
                />
            </Content>
        );
    }
}