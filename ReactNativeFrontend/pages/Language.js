import React from 'react';
import { Container, Header, Left, Body, Right, Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
 import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
      padding:30
    },
    hindiButton: {
        marginRight:40,
        marginLeft:40, 
        marginBottom:10, 
        padding:30, 
        borderColor:"#FF4B63",
        borderWidth: 2,
    },
});

export default class Language extends React.Component{
    constructor(props){
        super(props);
        this.engButton=this.engButton.bind(this);
        this.hindiButton=this.hindiButton.bind(this);
    }
    async engButton(){
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (error, stores) => {
        //       stores.map((result, i, store) => {
        //         console.log({ [store[i][0]]: store[i][1] });
        //         return true;
        //       });
        //     });
        //   });
        try {
            await AsyncStorage.setItem('@lang', "en");
            console.log("set");
            this.props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
        
    }
    async hindiButton(){
        try {
            await AsyncStorage.setItem('@lang', "hi");
            this.props.navigation.navigate('Login');

        } catch (e) {
            console.log(e);
        }
        
    }
    render(){
        return(
            <Container >
                <StyleProvider style={getTheme(material)}>
                    <Header>
                        <Title>Virtual Police Station</Title>
                    </Header>
                </StyleProvider>
                <PaperProvider theme={theme}>
                     <Button mode="contained" dark onPress={this.engButton} style={styles.englishButton} >
                         English 
                     </Button>
                     <Button mode="outlined" onPress={this.hindiButton} style={styles.hindiButton} >
                         हिंदी
                     </Button>
                 </PaperProvider>
            </Container>
        );
    }
    
}
