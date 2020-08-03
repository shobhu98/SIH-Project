import React from 'react'
import ExpoPixi from 'expo-pixi'
//import yourFnToSaveItInYourAPI from 'where ever you api function is'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import {Dimensions } from "react-native";
import {Content, H2} from 'native-base';
import Lan from "./LanguageStrings";
import lan from "./global";
import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';


const styles = StyleSheet.create({
  sign:{
      height:350,
      width:Math.round(Dimensions.get('window').width)-20,
      borderColor:"grey",
      borderWidth:2
      // marginLeft:10,
      // marginTop:20
  },
  h2:{
    marginTop:10,
    color:"#FF4B63",
    marginBottom:10
  },
  view:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20
  },
  button:{
    marginHorizontal:62,
    fontSize:23,
    textDecorationLine: 'underline',
    color:"#16335C"
  }
});

export default class Signature extends React.Component {
  constructor(props){
    super(props);
    console.log("FROM HERE")
    const { navigation } = this.props;
    // console.log(navigation.getParam('personal'));
    // console.log(navigation.getParam('case'));
    this.state={
      auth:"",
      personal:navigation.getParam('personal'),
      case:navigation.getParam('case')
    }
    this.goMyChild=this.goMyChild.bind(this);
  }
  clearCanvas = () => {
    this.refs.signatureCanvas.clear()
  }
  saveCanvas = async () => {
    const signature_result = await
    this.refs.signatureCanvas.takeSnapshotAsync({
      format: 'jpeg', // 'png' also supported
      quality: 0.5, // quality 0 for very poor 1 for very good
      result: 'file' // 
    })
    const base64 = await FileSystem.readAsStringAsync(signature_result.uri, { encoding: 'base64' });
    console.log(this.state.personal);
    console.log(this.state.case);
    // console.log("Signature")
    // console.log(base64);
    AsyncStorage.getItem("@auth").then((value)=>this.setState({ auth: value }, () => {
      fetch('http://192.168.1.10:7000/api/lodgeFIR', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':this.state.auth
            },
            body: JSON.stringify({
              name:this.state.personal.name,
              email:this.state.personal.email,
              mobile:this.state.personal.mobile,
              fathersName: this.state.personal.fathersName,
              DOB:this.state.personal.DOB,
              aadhar:this.state.personal.aadhar,
              address:this.state.personal.address,
              country:this.state.personal.country,
              passport:this.state.personal.passport,
              district:this.state.case.district,
              addrOfCrime:this.state.case.place,
              incident:this.state.case.incident,
              UIN:"103245",
              delay:this.state.case.delay,
              suspects:this.state.case.suspects,
              date_of_incident:Date.parse(this.state.case.date),
              acceptance:0,
              signature_user:base64
            })
        }).then(function(res){
            console.log(res)
            alert("FIR filed");
            //this.goMyChild()
        }).catch (function (error){
            console.log(error);
        })
    }))
    
  }

  goMyChild=()=>{
    this.props.navigation.navigate('FIRsaved');
  }

  render() {
    return (
      <Content padder>
        <H2 style={styles.h2}>{Lan.EnterSignature[lan]}</H2>
        <ExpoPixi.Signature
        ref='signatureCanvas' //Important to be able to call this obj
        strokeWidth={3} // thickness of the brush
        strokeAlpha={0.5} // opacity of the brush
        style={styles.sign}
        />
        <View style={styles.view}>
          <TouchableOpacity onPress={this.clearCanvas} >
            <Text style={styles.button}>{Lan.ResetButton[lan]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.saveCanvas} >
            <Text style={styles.button}>{Lan.SignButton[lan]}</Text>
          </TouchableOpacity>
        </View>
      </Content>
      
    )
  }
}