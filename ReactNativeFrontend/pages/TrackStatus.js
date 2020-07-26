import * as React from 'react';
import {Content, H2, Text} from 'native-base';
import {StyleSheet, View} from 'react-native';
import {Button,DefaultTheme , Provider as PaperProvider, Divider} from 'react-native-paper';

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
    let caseJSON={
      0:{
        name:"Case name 1",
        status:"Accepted",
        date:"01/01/2020",
        viewbutton:true,
        editbutton:false
      },
      1:{
        name:"Case name 2",
        status:"Under Review",
        date:"01/01/2020",
        viewbutton:true,
        editbutton:false
      },
      2:{
        name:"Case name 3",
        status:"Rejected",
        date:"01/01/2020",
        viewbutton:true,
        editbutton:false
      },
      3:{
        name:"Case name 4",
        status:"More details required",
        date:"01/01/2020",
        viewbutton:false,
        editbutton:true
      }
    }
    var i=0;
    var component=[];
    while(caseJSON[i]){
      var name=caseJSON[i].name;
      var status=caseJSON[i].status;
      var id=i;
      component.push(
        <View>
          <View style={styles.view}>
          <H2 style={styles.h2}>{caseJSON[i].name}</H2>
          <Text style={styles.text}>{caseJSON[i].date}</Text>
          </View>
          {/* <Text >Hello World</Text> */}
          <Text style={styles.btext}>{caseJSON[i].status}</Text>
          {caseJSON[i].viewbutton && <PaperProvider theme={theme}><Button mode="contained" style={styles.button} onPress={() => this.props.navigation.navigate('ViewFIR',{name:name,status:status, id:id})}>View report</Button></PaperProvider>}
          {caseJSON[i].editbutton && <PaperProvider theme={theme}><Button mode="contained" style={styles.button} onPress={() => this.props.navigation.navigate('EditFIR',{name:caseJSON[i].name,status:caseJSON[i].status})}>Edit report</Button></PaperProvider>}
          <Divider style={styles.divider}></Divider>
        </View>
        );
      i++;
    }
    this.state = {
      cases:component
    }; 

  }
  render(){
    return(
      <Content padder>
        {this.state.cases}
      </Content>
      
    );
  }
}