import React from 'react';
import {Content, H2, Text,View} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

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