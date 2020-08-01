import React from 'react';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import {Content, H2, Input, Item, Text, Textarea} from 'native-base';
import {Divider,Button, Provider as PaperProvider, DefaultTheme, } from 'react-native-paper';
import { Title } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
// import lan from './global.js'
import AsyncStorage from '@react-native-community/async-storage';

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
    h2:{
      marginTop:10,
      color:"#FF4B63",
      marginBottom:10
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    divider:{
        height:2,
        width:200,
        marginBottom:10
    },
    button1:{
        width:200,
        borderWidth:2,
        borderColor:"#16335C"
    },
    button2:{
        width:120,
        borderWidth:2,
        borderColor:"#16335C"
    },
    view2:{
        flexDirection: 'row',
        marginTop:15
    },
    edit:{
        textDecorationLine: 'underline',
        color:"#16335C"
    },
    text:{
        marginTop:10
    },
    bg:{
        backgroundColor:"white"
    },
});

export default class ChooseGender extends React.Component {
    constructor(props){
        super(props);

        const Lan = {
            PhoneNumber: {
                en: "Phone Number",
                hi: "फ़ोन नंबर"
            },
            Address: {
                en: "Address",
                hi: "पता"
            },
            Name: {
                en: "Name",
                hi: "नाम"
            },
            Profile: {
                en: "Profile",
                hi: "प्रोफ़ाइल"
            },
            District:{
                en:"District",
                hi: "जिला"
            },
            Email:{
                en: "Email",
                hi: "ईमेल"
            },
            Country:{
                en: "Country",
                hi: "देश"
            },
            PassportNumber:{
                en:"Passport Number",
                hi:"पासपोर्ट संख्या"
            },
            DOB:{
                en:"Date of Birth",
                hi:"जन्म की तारीख"
            },
            ChangeLanguage: {
                en:"Change Language",
                hi:"भाषा बदलो"
            },
            SignOut:{
                en:"Sign Out",
                hi:"प्रस्थान करें"
            },
            Details:{
                en:"Details  ",
                hi:"विवरण  "
            },
            Edit:{
                en:"Edit",
                hi:"संपादित करें"
            }
        };

        this.state={
            name: "Ankita",
            address: "G-74, Sector-87, Noida",
            mobile:"7042105583",
            email:"ankita@gmail.com",
            country:"India",
            ppnum:"-",
            dob:"17/04/2020",
            titles: Lan,
            lan:"",
            fathername:"",
            aadhar:"",
            auth:""
        }

        AsyncStorage.getItem("@lang").then((value)=>this.setState({lan:value})); 
        AsyncStorage.getItem("@auth").then((value)=>this.setState({ auth: value }, () => {
            console.log(this.state.auth, 'value');
            this.apicall();
        }) );
        //console.log("AUTH "+this.state.auth);
        

        
        // this.setState({name: Lan.SampleName[this.state.lan],
        //     address: Lan.SampleAddress[this.state.lan],
        //     district:Lan.SampleDistrict[this.state.lan],
        //     country:Lan.SampleCountry[this.state.lan],
        //     ppnum:Lan.SamplePassportNum[this.state.lan]})
        
        // this.setState({});
    }

    apicall(){
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
        }).catch (function (error){
            console.log(error);
        })
    }
    render(){
        return(
            <Content padder style={styles.bg}>
                <NavigationEvents
                    onWillFocus={() => {
                        AsyncStorage.getItem("@lang").then((value)=>this.setState({lan:value})); 
                    }}
                />
                <H2 style={styles.h2}>{this.state.titles.Profile[this.state.lan]}</H2>
                <Divider style={styles.divider}/>
                <PaperProvider theme={theme}>
                    <View style={styles.view}>
                        <Button mode="outlined" style={styles.button1} onPress={() => this.props.navigation.navigate('ChangeLanguage')} >{this.state.titles.ChangeLanguage[this.state.lan]}</Button>
                        <Button mode="outlined" style={styles.button2}>{this.state.titles.SignOut[this.state.lan]}</Button>
                    </View>
                </PaperProvider>
                <View style={styles.view2}>
                    <Title>{this.state.titles.Details[this.state.lan]}</Title>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FillProfile')} >
                        <Title style={styles.edit}>{this.state.titles.Edit[this.state.lan]}</Title>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{this.state.titles.Name[this.state.lan]}</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.name} />
                    </Item>
                    <Text style={styles.text}>Father's Name</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.fathername} />
                    </Item>
                    <Text style={styles.text}>{this.state.titles.DOB[this.state.lan]}</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.dob} />
                    </Item>
                    <Text style={styles.text}>Aadhar Card</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.aadhar} />
                    </Item>
                    <Text style={styles.text}>{this.state.titles.Address[this.state.lan]}</Text>
                    <Textarea disabled rowSpan={4} bordered placeholder={this.state.address}/>
                    <Text style={styles.text}>{this.state.titles.PhoneNumber[this.state.lan]}</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.mobile} />
                    </Item>
                    <Text style={styles.text}>{this.state.titles.Email[this.state.lan]}</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.email} />
                    </Item>
                    <Text style={styles.text}>{this.state.titles.Country[this.state.lan]}</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.country} />
                    </Item>
                    <Text style={styles.text}>{this.state.titles.PassportNumber[this.state.lan]}</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.ppnum} />
                    </Item>
                    
                </View>
            </Content>
        );
    }
}
