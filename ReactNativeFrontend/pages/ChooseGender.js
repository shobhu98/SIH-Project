import React from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {Content} from 'native-base';
import { Button, Provider as PaperProvider, DefaultTheme, Title } from 'react-native-paper';
import lan from './global.js'


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#FF4B63",
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
    constructor(props){
        super(props);
        const Lan = {
            Male: {
                en: "Male",
                hi: "नर"
            },
            Female: {
                en: "Female",
                hi: "महिला"
            }

        };
        this.state = {
            titles: Lan
        };
        console.log(lan);
    }
    render(){
        return(
            <Content style={styles.content}>
                <StatusBar backgroundColor="#16335C"/>
                <PaperProvider theme={theme}>
                    {/* <Title>Choose gender of officer</Title> */}
                    <Button mode="outlined" style={styles.englishButton} labelStyle={styles.labelstyle} icon="gender-male" onPress={() => this.props.navigation.navigate('MAnimationStack')} >{this.state.titles.Male[lan]}</Button>
                    <Button mode="outlined" style={styles.hindiButton} labelStyle={styles.labelstyle} icon="gender-female" onPress={() => this.props.navigation.navigate('FAnimationStack')}>{this.state.titles.Female[lan]}</Button>
                </PaperProvider>
            </Content>
        );
    }
}