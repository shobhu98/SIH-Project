import React from 'react'
import ExpoPixi from 'expo-pixi'
//import yourFnToSaveItInYourAPI from 'where ever you api function is'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import {Dimensions } from "react-native";
import {Content, H2} from 'native-base';


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
  clearCanvas = () => {
    this.refs.signatureCanvas.clear()
  }
  saveCanvas = async () => {
    // const signature_result = await
    // this.refs.signatureCanvas.takeSnapshotAsync({
    //   format: 'jpeg', // 'png' also supported
    //   quality: 0.5, // quality 0 for very poor 1 for very good
    //   result: 'file' // 
    // })

    //yourFnToSaveItInYourAPI(signature_result)
    // inside the fn above, use signature_result.uri to get the absolute file path
    this.props.navigation.navigate('FIRsaved');
  }
  render() {
    return (
      <Content padder>
        <H2 style={styles.h2}>Enter signature</H2>
        <ExpoPixi.Signature
        ref='signatureCanvas' //Important to be able to call this obj
        strokeWidth={3} // thickness of the brush
        strokeAlpha={0.5} // opacity of the brush
        style={styles.sign}
        />
        <View style={styles.view}>
          <TouchableOpacity onPress={this.clearCanvas} >
            <Text style={styles.button}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.saveCanvas} >
            <Text style={styles.button}>Sign</Text>
          </TouchableOpacity>
        </View>
      </Content>
      
    )
  }
}