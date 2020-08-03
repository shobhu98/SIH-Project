import * as React from 'react';
import {Content, H2, Text} from 'native-base';
import {StyleSheet, View, WebView} from 'react-native';
import {Button,DefaultTheme , Provider as PaperProvider, Divider} from 'react-native-paper';
import Lan from "./LanguageStrings";
import lan from "./global";
import ViewFIR from './ViewFIR';
// import { NavigationEvents } from 'react-navigation';
import * as FileSystem from 'expo-file-system';

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
    fontSize:16
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
    const { navigation } = this.props;
    console.log("STUFF");
    console.log(navigation.getParam('stuff'))
    let caseJSON=navigation.getParam('stuff');
    this.state={
      caseJSON:caseJSON
    }
    // let caseJSON={
    //   0:{
    //     name:"Case name 1",
    //     status:"Accepted",
    //     date:"01/01/2020",
    //     viewbutton:true,
    //     editbutton:false
    //   },
    //   1:{
    //     name:"Case name 2",
    //     status:"Under Review",
    //     date:"01/01/2020",
    //     viewbutton:true,
    //     editbutton:false
    //   },
    //   2:{
    //     name:"Case name 3",
    //     status:"Rejected",
    //     date:"01/01/2020",
    //     viewbutton:true,
    //     editbutton:false
    //   },
    //   3:{
    //     name:"Case name 4",
    //     status:"More details required",
    //     date:"01/01/2020",
    //     viewbutton:false,
    //     editbutton:true
    //   }
    // };
    statusCodes={
      0:"Pending",
      1:"Accepted",
      2:"More information requested",
      3:"Pending",
      4:"Submitted by SHO",
      5:"Rejected",
      10:"Appealed to SP"
    }
    var i=0;
    var component=[];
    while(caseJSON[i]){
      var name=caseJSON[i].name;
      var status=statusCodes[caseJSON[i].status];
      var id=i;
      const namil=caseJSON[i].name;
      component.push(
        <View>
          <View style={styles.view}>
          <H2 style={styles.h2}>{caseJSON[i].name}</H2>
          <Text style={styles.text}>{caseJSON[i].date}</Text>
          </View>
          {/* <Text >Hello World</Text> */}
          <Text style={styles.btext}>{statusCodes[caseJSON[i].status]}</Text>
          {caseJSON[i].viewbutton && <PaperProvider theme={theme}><Button mode="contained" style={styles.button} onPress={this.goToPage.bind(""+caseJSON[i].name)} >{Lan.ViewReportButton[lan]}</Button></PaperProvider>}
          {caseJSON[i].editbutton && <PaperProvider theme={theme}><Button mode="contained" style={styles.button} onPress={() => this.props.navigation.navigate('EditFIR',{name:this.state.caseJSON[i].name})}>{Lan.EditReportButton[lan]}</Button></PaperProvider>}
          {caseJSON[i].appealbutton && <PaperProvider theme={theme}><Button mode="contained" style={styles.button} onPress={this.appeal }>Click to Appeal</Button></PaperProvider>}
          <Divider style={styles.divider}></Divider>
        </View>
        );
      i++;
    }
    this.state = {
      cases:component
    }; 

  }
  // onPress={() => this.props.navigation.navigate('ViewFIR',{name:this.state.caseJSON[i].name})}
  goToPage=(page)=>{
    console.log(page);
    this.props.navigation.navigate('ViewFIR',{name:page})
    //this.props.navigation.navigate('FIR')
    // FileSystem.downloadAsync(
    //   '../testing.pdf',
    //   FileSystem.documentDirectory + 'fir.pdf'
    // )
    //   .then(({ uri }) => {
    //     console.log('Finished downloading to ', uri);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  render(){
    return(
      <Content padder>
        {/* <NavigationEvents
          onWillFocus={() => {
              AsyncStorage.getItem("@lang").then((value)=>this.setState({lan:value})); 
          }}
        /> */}
        {this.state.cases}
      </Content>
      
    );
  }
}