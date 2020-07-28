import React from 'react';
import { Container, Header,  Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Divider } from 'react-native-paper';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:50
    },
    text:{
        color:"#16335C",
        textDecorationLine: 'underline',
    },
    input:{
        marginBottom:10
    }
});

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.sendOTP=this.sendOTP.bind(this);
        this.login=this.login.bind(this);
        this.state={
            phone:"",
            password:"",
            err:false,
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
                                <Item regular style={styles.input}>
                                    <Input placeholder="Phone Number" onChangeText={text => this.setState({phone:text})}/>
                                </Item>
                                {/* {this.state.phoneErr && <Label style={styles.errortext}>Please enter correct phone number of 10 digits</Label>}
                                <Button mode="contained" onPress={this.sendOTP} style={styles.button}>
                                    Send OTP
                                </Button> */}
                                
                                <Item regular style={styles.input}>
                                    <Input placeholder="Password" onChangeText={text => this.setState({password:text})}/>
                                </Item>
                                <Button mode="contained" onPress={() => this.props.navigation.navigate('MainPage')} style={styles.button}>
                                    Log in
                                </Button>
                                <Button mode="contained" onPress={() => this.props.navigation.navigate('PickImage')} style={styles.button}>
                                    Camera
                                </Button>
                                <Divider style={styles.divider} theme={theme}/>
                                <View style={styles.view}>
                                    <Text>Haven't registered yet? </Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                        <Text style={styles.text}>Register now!</Text>
                                    </TouchableOpacity>
                                </View>
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