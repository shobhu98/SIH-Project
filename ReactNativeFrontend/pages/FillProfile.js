import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme, Title, Divider } from 'react-native-paper';
import { Container, Input, H2, Text, Textarea, Item, StyleProvider, Content, Picker, Icon} from 'native-base';
import DatePicker from 'react-native-datepicker'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/textjs';
import {StyleSheet, View} from 'react-native';
import lan from './global.js'
import Lan from './LanguageStrings'
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
        color:"#FF4B63"
    },
    text:{
        marginTop:15
    },
    divider:{
        height:2,
        marginTop:10,
        marginLeft:5,
        marginRight:5
    },
    bg:{
        backgroundColor:"white"
    },
    proceedButton:{
        marginVertical:20,
        marginHorizontal:10
    }
});

export default class FillForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected2: undefined,
            date:"07/22/2020",
            nationality: false,
            name:"Ankita",
            address:"",
            mobile:"",
            email:"",
            country:"",
            ppnum:"",
            fathersname:"",
            aadhar:"",
            auth:"",
            // dname:"",
            // daddress:"",
            // demail:"",
            // dcountry:"",
            // dppnum:"",
            // dfathersname:"",
            // daadhar:"",
        };   
        AsyncStorage.getItem('@auth', (err, item) => this.setState({auth:item}));
        this.proceedbutton=this.proceedbutton.bind(this);
        const { navigation } = this.props;
        //console.log(navigation.getParam('authToken'));
        fetch('http://192.168.1.10:7000/api/profile/me', {
            method: 'GET',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token':navigation.getParam('authToken')
            }
        }).then((response) => response.json())
        .then((responseData) => {
            this.setState({name:responseData.name,address:responseData.address,email:responseData.email,country:responseData.country,ppnum:responseData.passport,fathersname:responseData.fathersName,aadhar:responseData.aadhar}, () => {
                console.log(this.state)
            });
        }).catch (function (error){
            console.log(error);
        })
    }
    onValueChange2(value) {
        this.setState({
          selected2: value
        });
    }

    onNationalityChange(value) {
        this.setState({
          nationality: value
        });
    }

    proceedbutton(){
        // if(this.state.name.length===0)
        //     alert('Please Enter Name');
        // else if(this.state.address.length===0)
        //     alert('Please Enter Address');
        // else if(this.state.mobile.length!=10)
        //     alert('Please enter valid mobile number');
        // else if(this.state.email.length===0)
        //     alert('Please Enter Email');
        // else if(this.state.nationality){
        //     if(this.state.country.length===0)
        //         alert('Please Enter Country Name');
        //     else if(this.state.ppnum.length===0)
        //         alert('Please Enter Passport Number');
        // }
        // else{
        //     if(this.state.country.length===0){
        //         this.setState({country:"India"});
        //         console.log("HEJHCKJN")
        //     }

        //     console.log("Name "+this.state.name);
        //     console.log("Addr "+this.state.address);
        //     console.log("Dis "+this.state.selected2);
        //     console.log("Mob "+this.state.mobile);
        //     console.log("Email "+this.state.email);
        //     console.log("Nationality "+this.state.nationality);
        //     console.log("Country "+this.state.country);
        //     console.log("PP "+this.state.ppnum);
        //     console.log("DOB "+this.state.date);

        // }
        //this.props.navigation.navigate('FillCaseDetails');
        
        console.log("Name "+this.state.name);
        console.log("Papa Name "+this.state.fathersname);
        console.log("DOB "+this.state.date);
        console.log("Aadhar "+this.state.aadhar);
        console.log("Addr "+this.state.address);
        console.log("Mob "+this.state.mobile);
        console.log("Email "+this.state.email);
        console.log("Nationality "+this.state.nationality);
        console.log("Country "+this.state.country);
        console.log("PP "+this.state.ppnum);

        fetch('http://192.168.1.10:7000/api/profile', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token':this.state.auth
            },
            body:JSON.stringify({
                name:this.state.name,
                fathersName:this.state.fathersname,
                DOB:Date.parse(this.state.date),
                aadhar:this.state.aadhar,
                address:this.state.address,
                mobile:this.state.mobile,
                email:this.state.email,
                country:this.state.country,
                passport:this.state.ppnum
            })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.props.navigation.navigate('Profile');
        }).catch (function (error){
            console.log(error);
        })
        
    }

    render(){
        return(
            <StyleProvider style={getTheme(material)}>

            
            <Content padder style={styles.bg}>
                <H2 style={styles.h2}>{Lan.PersonalDetails[lan]}</H2>
                <Divider style={styles.divider} />
                <Text style={styles.text}>{Lan.ComplainantsName[lan]}</Text>
                <Item regular>
                    <Input defaultValue={this.state.name}  onChangeText={text => this.setState({name:text})} />
                </Item>
                <Text style={styles.text}>Father's Name</Text>
                <Item regular>
                    <Input defaultValue={this.state.fathersname}  onChangeText={text => this.setState({fathersname:text})} />
                </Item>
                <Text style={styles.text}>Complainant's Date Of Birth</Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="MM/DD/YYYY"
                    minDate="01/05/1947"
                    maxDate="08/01/2020"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <Text style={styles.text}>Aadhar Card</Text>
                <Item regular>
                    <Input defaultValue={this.state.aadhar}   onChangeText={text => this.setState({aadhar:text})} />
                </Item>
                <Text style={styles.text}>{Lan.Address[lan]}</Text>
                <Textarea defaultValue={this.state.address}  rowSpan={4} bordered onChangeText={text => this.setState({address:text})}/>
                
                <Text style={styles.text}>{Lan.PhoneNumber[lan]}</Text>
                <Item regular>
                    <Input  onChangeText={text => this.setState({mobile:text})}/>
                </Item>
                <Text style={styles.text}>{Lan.Email[lan]}</Text>
                <Item regular>
                    <Input defaultValue={this.state.email} onChangeText={text => this.setState({email:text})} />
                </Item>
                <Text style={styles.text}>{Lan.Nationality[lan]}</Text>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder={Lan.NationalityPlaceHolder[lan]}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.nationality}
                        onValueChange={this.onNationalityChange.bind(this)}
                    >
                        <Picker.Item label="Indian" value={false} />
                        <Picker.Item label="Other" value={true} />
                    </Picker>
                </Item>
                
                {this.state.nationality && <View>
                    <Text style={styles.text}>Complainant's Country</Text>
                    <Item regular>
                        <Input defaultValue={this.state.country} onChangeText={text => this.setState({country:text})}/>
                    </Item>
                    <Text style={styles.text}>Complainant's Passport Number</Text>
                    <Item regular>
                        <Input defaultValue={this.state.ppnum} onChangeText={text => this.setState({ppnum:text})}/>
                    </Item>
                </View>}
                
                <PaperProvider theme={theme}>
                    <Button mode="contained" style={styles.proceedButton}  onPress={this.proceedbutton} >{Lan.ProceedButton[lan]}</Button>
                </PaperProvider>
                
            </Content>
            </StyleProvider>
        );
    }
}