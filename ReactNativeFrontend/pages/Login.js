import React from 'react';
import { Container, Header,  Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Divider } from 'react-native-paper';
import {StyleSheet} from 'react-native';

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
    form: {
        paddingTop:20,
    },
    button: {
        marginRight:40,
        marginLeft:40, 
        marginBottom:10, 
        marginTop:10,
        
    },
    getHelp: {
        marginRight:20,
        marginLeft:20, 
        marginTop:10,
        borderWidth: 2,
    },
    divider:{
        margin:30, 
        height:3
    },
    errortext:{
        fontSize:13,
        marginLeft:2,
        marginTop:2,
        color:"#de5454"
    }
});

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.sendOTP=this.sendOTP.bind(this);
        this.login=this.login.bind(this);
        this.state={
            phone:"",
            OTP:"",
            phoneErr:false,
            otpErr:false
        }
    }

    sendOTP(){
        
        console.log(this.state.phone);
    }

    login(){

    }

    render(){
        return(
            <StyleProvider style={getTheme(material)}>
                <Container >
                    <Header >
                        <Title>Virtual Police Station</Title>
                    </Header>
                    <PaperProvider theme={theme}>
                        <Content padder>
                            <Form style={styles.form}>
                                <Item regular>
                                    <Input placeholder="Phone Number" onChangeText={text => this.setState({phone:text})}/>
                                </Item>
                                {this.state.phoneErr && <Label style={styles.errortext}>Please enter correct phone number of 10 digits</Label>}
                                <Button mode="contained" onPress={this.sendOTP} style={styles.button}>
                                    Send OTP
                                </Button>
                                
                                <Item regular>
                                <Input placeholder="OTP" />
                                </Item>
                                <Button mode="contained" onPress={() => this.props.navigation.navigate('MainPage')} style={styles.button}>
                                    Log in
                                </Button>
                                <Divider style={styles.divider} theme={theme}/>
                                <Button mode="outlined" onPress={() => console.log('Pressed')} style={styles.getHelp}>
                                    Get Help
                                </Button>
                            </Form>
                        </Content>
                        
                    </PaperProvider>
                </Container>
            </StyleProvider>
        );
    }
}