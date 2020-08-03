import React from 'react';
import {Content, H2, Text,View} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';
//import { saveAs } from 'file-saver';

export default class FillForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show:false
        }
        AsyncStorage.getItem("@auth").then((value)=>this.setState({ auth: value }, () => {
            fetch('http://192.168.1.10:7000/api/lodgeFIR/5f2756aacf8ce96d62507ac6', {
                method: 'GET',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token':this.state.auth
                }
            }).then((response) => response.json())
            .then((responseData) => {
            console.log("response")
            console.log(responseData);
            var pairs = [];
            for(var key in responseData.fir){
                // pairs.push(<p>{key} : {this.props.data[key]}</p>);
                pairs.push(
                    <View>
                        <H2>{key}</H2>
                        <Text style={{marginBottom:20}}>{responseData.fir[key]}</Text>
                    </View>
                );
            }
            this.setState({ c: pairs }, () => {
                console.log("Set");
                this.setState({show:true});
            })
 
            // const c=responseData.fir.map((key, i) => (
            //     <View>
            //         <H2>{key}</H2>
            //         <Text>{responseData[key]}</Text>
            //     </View>
            // ))
            // this.setState({ c: c }, () => {
            //     console.log("Set");
            //     this.setState({show:true});
            // })
                // <p key={i}>
                //   <span>Key Name: {key}</span>
                //   <span>Value: {sampleJSON.object[key]}</span>
                // </p>
            
            }).catch (function (error){
                console.log(error);
            })
        }))
    }
    contentSet = () => {
        fetch("http://localhost:7000/api/admin_side/5f2756aacf8ce96d62507ac6", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-auth-token": this.state.auth,
          },
        })
          .then((response) => {
            response.json().then((result) => {
              //console.log(result.errors[0].msg);
              console.log(response.status);
              if (response.status === 200) {
                this.setState(
                  {
                    content: result,
                  },
                  () =>
                    this.pdf()
                );
    
                console.log(result);
              } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
              }
            });
          })
          .catch((err) => {
            alert(err);
          });
      }

      pdf = () => {
        //var content = this.state.content;
        var htmldata="<div>"+
          "<h4"+
            // "FIR ID :"+this.state.content._id+
            "FIR ID :Downloading"+
          "</h4>"+
          "<br></br>"+
          
                
                //   "<p>IPC Sections(As set by SHO): "+ this.state.content.type_of_crime+"</p>"+
               
                //   "<p>Current Status: "+ this.state.content.name+"</p>"+
          
                //   "<p >Name: "+ this.state.content.name+"</p>"+
        
                //   "<p >Email: "+this.state.content.email+"</p>"+
       
                //   "<p >Father's Name: "+this.state.content.fathersName+"</p>"+
      
                //   "<p >DOB: "+this.state.content.DOB+"</p>"+
        
                //   "<p>Mobile number: "+this.state.content.mobile+"</p>"+
              
                //   "<p >Complainant's Resident Country: "+this.state.content.country+"</p>"+
            
                //   "<p >Incident District: "+this.state.content.District+"</p>"+
         
                //   "<p >Incident</p>"+
          
                
                //   +this.state.content.incident+
               
             
                //   "<p >Reason for Delay(if any)</p>"+
        
                //   this.state.content.delay+
              
                //   "<p >Possible Suspects</p>"
      
                //   +this.state.content.suspects+
                
                // "<br></br>"+
                
                // "<p>SHO</p>"+
                //   "<img"+
                //   "src="+this.state.content.signature+"></img>"+
               
                
                // "<p>Complainant</p>"+
                //   "<img"+
                //   "src="+this.state.content.signature_user+"></img>"+
               
           
            "</div>"+"";
            console.log(htmldata)
        var body={html:htmldata}
        fetch("http://localhost:7000/api/pdfGenerate", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-auth-token": this.state.auth,
          },
          body: JSON.stringify(body),
        })
          .then((res) => {
            return res
                    .arrayBuffer()
                    .then(res => {
                        const blob = new Blob([res], { type: 'application/pdf' })
                        //saveAs(blob, 'fir.pdf')
                    })
                    .catch(e => alert(e))
          })
          .catch((err) => {
            alert(err);
          });
      };
    render(){
        const { navigation } = this.props;
        return(
            <Content padder>
                {/* <H2>{navigation.getParam('name')}</H2> */}
                {/* <Text>Hello</Text> */}
                {this.state.show && this.state.c}
                {/* <Text>{navigation.getParam('id')}</Text> */}
            </Content>
        );
    }
}