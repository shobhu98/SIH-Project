import React from 'react';
import { Container, Header,  Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Divider } from 'react-native-paper';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

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
        this.register=this.register.bind(this);
        this.state={
            phone:"",
            password:"",
            otp:"",
            otpshow:false
        }
    }

    async sendOTP(){
        //register here


        // const config={
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }
        // const body=JSON.stringify({number:this.state.phone, password:this.state.password});
        // try{
        //     const res=await axios.post('/api/user',body,config);
        //     console.log(res.data);
        // }
        // catch(err){
        //     console.log(err);
        // }

        // axios({
        //     method: 'get',
        //     url: '/api/user',
        //     data: {
        //       number: this.state.phone,
        //       password: this.state.password
        //     }
        // }).then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });;

        fetch('http://192.168.1.10:7000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number:this.state.phone, 
                password:this.state.password
            })
        }).then(function(res){
            console.log(res)
        }).catch (function (error){
            console.log(error);
        })

        // fetch('http://192.168.1.10:7000/api/user')
        // .then(function(res){
        //     console.log(res)
        // }).catch (function (error){
        //     console.log(error);
        // })

        this.setState({otpshow:true});
        console.log(this.state.phone);
        console.log(this.state.password);
    }

    async register(){
        console.log(this.state.phone);
        console.log(this.state.password);
        console.log(this.state.otp);
        fetch('http://192.168.1.10:7000/api/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number:this.state.phone, 
                password:this.state.password,
                code:this.state.otp,
                name:"Ankita"
            })
        }).then(function(res){
            console.log(res)
        }).catch (function (error){
            console.log(error);
        })
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
                                    <Input placeholder="Enter Phone Number" onChangeText={text => this.setState({phone:text})}/>
                                </Item>
                                {/* {this.state.phoneErr && <Label style={styles.errortext}>Please enter correct phone number of 10 digits</Label>}
                                <Button mode="contained" onPress={this.sendOTP} style={styles.button}>
                                    Send OTP
                                </Button> */}
                                
                                <Item regular style={styles.input}>
                                    <Input placeholder="Enter Password" onChangeText={text => this.setState({password:text})}/>
                                </Item>
                                <Button mode="contained" onPress={this.sendOTP} style={styles.button}>
                                    Send OTP
                                </Button>
                                <Divider style={styles.divider} theme={theme}/>

                                {this.state.otpshow && 
                                    <View>
                                    <Item regular style={styles.input}>
                                        <Input placeholder="Enter OTP" onChangeText={text => this.setState({otp:text})}/>
                                    </Item>
                                    <Button mode="contained" onPress={this.register} style={styles.button}>
                                        Register
                                    </Button>
                                </View>
                                }
                                

                            </Form>
                        </Content>
                        
                    </PaperProvider>
                </Container>
            </StyleProvider>
        );
    }
}