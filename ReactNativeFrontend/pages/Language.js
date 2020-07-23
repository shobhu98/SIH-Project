import React from 'react';
import { Container, Header, Left, Body, Right, Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
 import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {StyleSheet} from 'react-native';

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

export default function Language({navigation}){
    return(
        <Container >
            <StyleProvider style={getTheme(material)}>
                <Header>
                    <Title>Virtual Police Station</Title>
                </Header>
            </StyleProvider>
            <PaperProvider theme={theme}>
                 <Button mode="contained" dark onPress={() => navigation.navigate('Login')} style={styles.englishButton} >
                     English 
                 </Button>
                 <Button mode="outlined" onPress={() => console.log('Pressed')} style={styles.hindiButton} >
                     हिंदी
                 </Button>
             </PaperProvider>
        </Container>

    );
}
