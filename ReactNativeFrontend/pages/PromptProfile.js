import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View} from 'react-native';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    },
};

export default class FillForm extends React.Component {
    constructor(props){
        super(props);
        
        this.props.navigation.navigate('FillForm')

    }
    render(){
        return(
            <View>
                <PaperProvider theme={theme}>
                    <Title>You have already filled your profile details</Title>
                    <Title>Fetch details or give new details?</Title>
                    <Button mode="contained" style={styles.proceedButton}  onPress={this.proceedbutton} >Fetch</Button>
                    <Button mode="contained" style={styles.proceedButton}  onPress={this.proceedbutton} >New Details</Button>
                </PaperProvider>
            </View>
            
        );
    }
}