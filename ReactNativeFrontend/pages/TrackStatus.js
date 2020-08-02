import * as React from 'react';
import {Content, H2, Text} from 'native-base';
import {StyleSheet, View, FlatList} from 'react-native';
import {Button,DefaultTheme , Provider as PaperProvider, Divider} from 'react-native-paper';
import Lan from "./LanguageStrings";
import lan from "./global";
// import { NavigationEvents } from 'react-navigation';
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
  view:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  h2:{
    color:"#16335C",
  },
  text:{
    color:"grey"
  },
  btext:{
    color:"grey",
    marginVertical:10
  },
  divider:{
    marginVertical:25,
    height:2
  },
  button:{
    width:180
  }
});

export default class TrackStatus extends React.Component {
  constructor(props){
    super(props);
    
    this.state={
      auth:"",
      show:false
    }

    AsyncStorage.getItem("@auth").then((value)=>this.setState({ auth: value }, () => {
        console.log(this.state.auth, 'value');
        fetch('http://192.168.1.10:7000/api/lodgeFIR', {
            method: 'GET',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token':this.state.auth
            }
        }).then((response) => response.json())
        .then((responseData) => {
          var caseJSON=[];
          responseData.forEach(function(object){
            var obj={
              name:object.FIRNUM,
              date:object.date,
              status:object.acceptance
            };
            caseJSON.push(obj);
          })
          
          this.state={
            case:caseJSON,
            show:true
          }

          var components=[];
          caseJSON.forEach(function(item){
            components.push(
              <Text>{item.name}</Text>
            );
          });

          // var components=caseJSON.map(item => <Text>{item.name}</Text>)
          this.state={
            cases:components
          }
          console.log(this.state.cases);
          
        }).catch (function (error){
            console.log(error);
        })
    }) );
    this.lapsList=this.lapsList.bind(this);
  }

  lapsList=() =>{
    console.log(this.state.case)
    return this.state.case.map((data) => {
      return (
        <View><Text>{data.name}</Text></View>
      )
    })

}

  render(){
    return(
      <Content padder>
        <Text>Blah blal</Text>
        {/* <NavigationEvents
          onWillFocus={() => {
              AsyncStorage.getItem("@lang").then((value)=>this.setState({lan:value})); 
          }}
        /> */}
        {/* {this.state.show && <FlatList 
          data={this.state.case}
          renderItem={({item})=>(
            <Text>{item.name}</Text>
          )}
        />} */}
        {/* <Text>blah</Text> */}
        
      {/* {this.state.show && this.state.case.map(item => {
        return(<Text>{item.name}</Text>)
      })} */}
      {/* {this.state.show ?this.lapsList():null} */}
      {this.state.cases}
      </Content>
      
    );
  }
}