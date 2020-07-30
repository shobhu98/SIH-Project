import React from 'react';
import { Card, DefaultTheme } from 'react-native-paper';
import {Content} from 'native-base';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {StyleProvider, Header, Title} from 'native-base';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import lan from './global.js'

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        // primary: useStoreState(state => state.colors.primaryColor),
        accent: '#f1c40f',
    },
};
const styles = StyleSheet.create({
    card: {
        marginLeft:20,
        marginRight:20,
        marginTop:15,
        marginBottom:5,
        backgroundColor:"white",
        height:200,
        borderWidth:1,
        borderColor: "#dbdbdb",
    },
    tinyLogo: {
        height: 140,
        width: 110,
        resizeMode: 'contain',
    },
    content:{
        backgroundColor:"white"
    },
    cardcontent:{
        paddingBottom:20
    }
});

export default class FileFIR extends React.Component {
    constructor(props){
        super(props);
        const Lan = {
            Title1: {
                en: "Talk to Virtual Officer",
                hi: "वर्चुअल ऑफिसर से बात करें"
            },
            Subtitle1: {
                en: "Interactive Police Officer",
                hi: "इंटरैक्टिव पुलिस अधिकारी"
            },
            BUTTON: {
                en: "PROCEED",
                hi: "बढ़ना"
            },
            Title2: {
                en: "Call For Volunteer's Help",
                hi: "स्वयंसेवक की मदद के लिए पूछें"
            },
            Subtitle2: {
                en: "Professional Help will come your way",
                hi: "प्रोफेशनल हेल्प आपके रास्ते आएगी"
            },
            Title3:{
                en: "Fill Manually",
                hi: "FIR स्वयं भरें"
            },
            Subtitle3: {
                hi: "पुराने ढंग का",
                en: "The old fashioned way"
            }
        };
        this.state = {
            titles: Lan
        };
    }
    render(){
        return(
            <Content style={styles.content}>
                <StatusBar backgroundColor="#16335C"/>
                <PaperProvider theme={theme}>
                    <Card style={styles.card}>
                        <Card.Title
                            title={this.state.titles.Title1[lan]}
                            subtitle={this.state.titles.Subtitle1[lan]}
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/policeman.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                        <Card.Actions style={styles.cardcontent}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('ChooseGender')}>{this.state.titles.BUTTON[lan]}</Button>
                        </Card.Actions>
                    </Card>

                    <Card style={styles.card}>
                        <Card.Title
                            title={this.state.titles.Title2[lan]}
                            subtitle={this.state.titles.Subtitle2[lan]}
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/form.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                        <Card.Actions style={styles.cardcontent}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('CallForHelp')}>{this.state.titles.BUTTON[lan]}</Button>
                        </Card.Actions>
                    </Card>
                    
                    <Card style={styles.card}>
                        <Card.Title
                            title={this.state.titles.Title3[lan]}
                            subtitle={this.state.titles.Subtitle3[lan]}
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/form.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                        <Card.Actions style={styles.cardcontent}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('FillForm')}>{this.state.titles.BUTTON[lan]}</Button>
                        </Card.Actions>
                    </Card>
                    
                </PaperProvider>
                
            </Content>
        );
    }
}