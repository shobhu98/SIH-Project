import React from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {Content} from 'native-base';
import { Button, Provider as PaperProvider, DefaultTheme, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF4B63',
        accent: '#f1c40f',
    },
};
const styles = StyleSheet.create({
    englishButton: {
        margin: 40,
        padding:30,
        borderColor:"#FF4B63",
        borderWidth: 2,
    },
    hindiButton: {
        marginRight:40,
        marginLeft:40, 
        marginBottom:10, 
        padding:30, 
        borderColor:"#FF4B63",
        borderWidth: 2,
    },
    content:{
        backgroundColor:"white",
    },
    labelstyle:{
        fontSize:25
    }
});

export default class ChooseGender extends React.Component {
    render(){
        return(
            <Content style={styles.content}>
                <StatusBar backgroundColor="#16335C"/>
                <PaperProvider theme={theme}>
                    {/* <Title>Choose gender of officer</Title> */}
                    <Button mode="outlined" style={styles.englishButton} labelStyle={styles.labelstyle} icon="human-male" onPress={() => this.props.navigation.navigate('AnimationStack')} >MALE</Button>
                    <Button mode="outlined" style={styles.hindiButton} labelStyle={styles.labelstyle} icon="human-female">FEMALE</Button>
                </PaperProvider>
            </Content>
        );
    }
}