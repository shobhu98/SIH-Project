import React, {useState} from 'react';
import { Container, Header,  Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Divider } from 'react-native-paper';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions } from "react-native";
import NamasteMale from "./animation_components/male/NamasteMale";
import NamasteFemale from "./animation_components/female/NamasteFemale";
import { StackActions, NavigationActions } from 'react-navigation';
import { useStoreState } from 'easy-peasy';
import lan from './global.js'
// import Lan from './global.js';
import AsyncStorage from '@react-native-community/async-storage';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    }
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
    },
    blueview:{
        height:250,
        backgroundColor:"#16335C",
        zIndex:-1,
        justifyContent:'flex-end',
        
    },
    label:{
        color:"white",
        fontSize:24
    }
});


// export default function ProductsInBasket() {
//   const count = useStoreState(state => state.basket.productIds.length);
//   console.log(count);
//   return(<Login />); 
// }


export default class Login extends React.Component {
    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.login=this.login.bind(this);
        const Lan = {
            PhoneNumber: {
                en: "Phone Number",
                hi: "फ़ोन नंबर"
            },
            Password: {
                en: "Password",
                hi: "कुंजिका"
            },
            LogIn: {
                en: "Login",
                hi: "लॉग इन करें"
            },
            AppName: {
                en: "Virtual Police Station",
                hi: "वर्चुअल पुलिस स्टेशन"
            },
            HaventRegistered:{
                en:"Haven't Registered yet? ",
                hi: "अभी तक पंजीकृत नहीं है? "
            },
            RegisterNow:{
                en: "Register Now!",
                hi: " पंजीकरण करें!"
            },
            GetHelp:{
                en: "Get Help",
                hi: "मदद लें"
            }
        };
        this.state={
            titles: Lan,
            phone:"",
            password:"",
            err:false,
            otpErr:false,
            lan:''
        }
        // try {
        //         AsyncStorage.getItem('@lan', (err, itemm) => console.log("blah blah "+JSON.parse(itemm)));
        //     } catch(e) {
        //     console.log(e);
        //     }
        AsyncStorage.getItem("@lang").then((value)=>this.setState({lan:value}));
        //console.log(this.state.lan);
    }

    

    login(){
        //check login here
        //this.props.navigation.navigate('MainPage',{lang:this.state.lan} )
        console.log(this.state.phone);
        console.log(this.state.password);
        fetch('http://192.168.1.10:7000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number:this.state.phone, 
                password:this.state.password
            })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.token);
            try {
                AsyncStorage.setItem('@auth', responseData.token);
                console.log("daal diya");
            } catch (e) {
                console.log(e);
            }
            // try {
            //     AsyncStorage.getItem('@auth', (err, item) => console.log(item));
            // } catch(e) {
            // console.log(e);
            // }
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainPage',lang:this.state.lan } )],
            });
            this.props.navigation.dispatch(resetAction);
            
        }).catch (function (error){
            console.log(error);
        })

    }

    render(){
        return(
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor:"white"}}>
                    {/* <Header >
                        <Title>Virtual Police Station</Title>
                    </Header> */}
                    <View style={{flexDirection:'row', position:'absolute'}}>
                        <NamasteMale/>
                        <NamasteFemale style={{left:250}}/>
                    </View>
                    <View style={styles.blueview}>
                        <View style={{alignItems:'center', marginBottom:10}}>
                            <Label style={styles.label}>{this.state.titles.AppName[this.state.lan]}</Label>
                        </View>
                    </View>
                    <PaperProvider theme={theme}>
                        <Content padder>
                            <Form style={styles.form}>
                                {/* <Label>{this.props.lang}</Label> */}
                                <Item regular style={styles.input}>
                                    <Input keyboardType={'numeric'}  placeholder={this.state.titles.PhoneNumber[this.state.lan]} onChangeText={text => this.setState({phone:text})}/>
                                </Item>
                                {/* {this.state.phoneErr && <Label style={styles.errortext}>Please enter correct phone number of 10 digits</Label>}
                                <Button mode="contained" onPress={this.sendOTP} style={styles.button}>
                                    Send OTP
                                </Button> */}
                                
                                <Item regular style={styles.input}>
                                    <Input secureTextEntry={true} placeholder={this.state.titles.Password[this.state.lan]}  onChangeText={text => this.setState({password:text})}/>
                                </Item>
                                <Button mode="contained" onPress={this.login} style={styles.button}>
                                    {this.state.titles.LogIn[this.state.lan]}
                                </Button>
                                {/* <Button mode="contained" onPress={() => this.props.navigation.navigate('PickImage')} style={styles.button}>
                                    Camera
                                </Button> */}
                                <Divider style={styles.divider} theme={theme}/>
                                <View style={styles.view}>
                                    <Text>{this.state.titles.HaventRegistered[this.state.lan]}</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                        <Text style={styles.text}>{this.state.titles.RegisterNow[this.state.lan]}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button mode="outlined" onPress={() => console.log('Pressed')} style={styles.getHelp}>
                                    {this.state.titles.GetHelp[this.state.lan]}
                                </Button>
                            </Form>
                        </Content>
                        
                    </PaperProvider>
                </Container>
            </StyleProvider>
        );
    }
}