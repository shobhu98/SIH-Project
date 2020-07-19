import React from 'react';
import { Container, Header, Left, Body, Right, Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF4B63',
        accent: '#f1c40f',
    },
};

export default function Language({navigation}){
    return(
        <Container >
            <StyleProvider style={getTheme(material)}>
                <Header>
                    <Left/>
                    <Body>
                    <Title>Virtual Police Station</Title>
                    </Body>
                    
                </Header>
            </StyleProvider>
            <PaperProvider theme={theme}>
                <Button mode="contained" dark onPress={() => navigation.navigate('Login')} style={{margin:"40px", padding:"30px" }} labelStyle={{fontSize:"1.2rem"}}>
                    English 
                </Button>
                <Button mode="outlined" onPress={() => console.log('Pressed')} style={{marginRight:"40px",marginLeft:"40px", marginBottom:"10px", padding:"30px", borderColor:"#FF4B63"}} labelStyle={{fontSize:"1.2rem"}}>
                    हिंदी
                </Button>
            </PaperProvider>
        </Container>
    );
}
