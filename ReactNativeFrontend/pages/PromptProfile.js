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
            auth:"",
            // response:false
        }

        this.apiCall=this.apiCall.bind(this);

        AsyncStorage.getItem("@auth").then((value)=>this.setState({ auth: value }, () => {
            console.log(this.state.auth, 'value');
            this.apiCall();
        }) );
        // this.props.navigation.navigate('FillForm')

        this.fetchClicked=this.fetchClicked.bind(this);
        this.newdetailsclicked=this.newdetailsclicked.bind(this);

    }

    apiCall(){
        fetch('http://192.168.1.10:7000/api/profile/me', {
            method: 'GET',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token':this.state.auth
            }
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.state={
                response:responseData
            }
            this.setState({show:true});
            // this.setState({name:responseData.name,address:responseData.address,mobile:responseData.mobile,email:responseData.email,country:responseData.country,ppnum:responseData.passport,dob:responseData.DOB,fathername:responseData.fathersName,aadhar:responseData.aadhar})
            //console.log(responseData);
        }).catch (function (error){
            console.log(error);
        })
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
            // console.log("Status is "+response.status);
            // if(response.status!=200)
            //     this.props.navigation.navigate('FillForm',{auth:this.state.auth});
            response.json()
        }).then((responseData) => {
            //////////////////////////////////
            // this.setState({response:responseData});
            // this.setState({show:true});
            console.log("responsedata");
            console.log(responseData);
            // this.setState({ response: JSON.stringify(responseData) }, () => {
            //     this.setState({show:true});
            // })
        }).catch (function (error){
            console.log(error);
        })
    }

    fetchClicked(){
        console.log("profile details here")
        console.log(this.state.response);
        this.props.navigation.navigate('FillCaseDetails',{response:this.state.response,auth:this.state.auth});
    }

    newdetailsclicked(){
        this.props.navigation.navigate('FillForm',{auth:this.state.auth});
    }

    render(){
        return(
            
            <Content style={{backgroundColor:"white"}}>
                {this.state.show && <View style={styles.view}>
                    <Title>You have already filled your profile details.</Title>
                    <Title style={styles.title}>Fetch details or give new details?</Title>
                    <TouchableOpacity onPress={this.fetchClicked}>
                        <Text style={styles.text}>Fetch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.newdetailsclicked} >
                        <Text style={styles.text}>New Details</Text>
                    </TouchableOpacity>
                </View>}
                
            </Content>
            
            
        );
    }
}