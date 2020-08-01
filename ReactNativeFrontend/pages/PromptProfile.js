import React from 'react';
import { Button, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View, TouchableOpacity,Text} from 'react-native';
import {Content} from 'native-base';
import { createNativeWrapper } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        marginTop:200,
    },
    title:{
        marginBottom:30
    },
    text:{
        fontSize:23,
        textDecorationLine: 'underline',
        color:"#16335C",
        marginBottom:10
    }
});

export default class FillForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            auth:""
        }

        AsyncStorage.getItem("@auth").then((value)=>this.setState({ auth: value }, () => {
            console.log(this.state.auth, 'value');
            this.apicall();
        }) );
        // this.props.navigation.navigate('FillForm')

    }

    apicall(){
        fetch('http://192.168.1.10:7000/api/profile/me', {
            method: 'GET',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token':this.state.auth
            }
        }).then((response) => {
            console.log(response.status);
            response.json()
        }).then((responseData) => {
            //////////////////////////////////
            
        }).catch (function (error){
            console.log(error);
        })
    }

    render(){
        return(
            <Content style={{backgroundColor:"white"}}>
                <View style={styles.view}>
                    <Title>You have already filled your profile details.</Title>
                    <Title style={styles.title}>Fetch details or give new details?</Title>
                    
                    <TouchableOpacity>
                        <Text style={styles.text}>Fetch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.text}>New Details</Text>
                    </TouchableOpacity>
                </View>
            </Content>
            
            
        );
    }
}