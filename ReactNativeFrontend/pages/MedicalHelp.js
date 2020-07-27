import * as React from 'react';
import { Text } from 'react-native-paper';
import {Linking, View, StyleSheet} from 'react-native'
import { Button, Provider as PaperProvider, DefaultTheme, Title } from 'react-native-paper';

const styles = StyleSheet.create({
  view:{
      marginVertical:20,
      marginHorizontal:20
  },
  button:{
    padding:10,
    marginVertical:10
  }
});

export default class MedicalHelp extends React.Component {
  render(){
    return(
      <View style={styles.view}> 
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:112');}}>National emergency number</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:100');}}>Police</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:101');}}>Fire</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:102');}}>Ambulance</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:1091');}}>Women Helpline</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:181');}}>Women Helpline (Domestic Abuse)</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:1073');}}>Road Accident Emergency Service</Button>
        <Button color="#16335C" style={styles.button} mode="contained" onPress={()=>{Linking.openURL('tel:1363');}}>Tourist Helpline</Button>
      </View>
    );
  }
}
