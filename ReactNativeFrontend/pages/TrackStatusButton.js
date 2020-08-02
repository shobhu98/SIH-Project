import * as React from 'react';
import {Button,DefaultTheme , Provider as PaperProvider, Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default class TrackStatus extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false,
            auth:''
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
            console.log("response")
            console.log(responseData);
            let arr=[];
            let i=0;
            while(responseData[i]){
                let js={
                    name:responseData[i]._id,
                    status:responseData[i].UIN,
                    date:"01/01/2020",
                    viewbutton:false,
                    editbutton:true
                }
                arr.push(js);
                i++;
            }
            console.log(arr);
            this.props.navigation.navigate('TrackStatus',{stuff:arr});
            }).catch (function (error){
                console.log(error);
            })
        }))
    }
    render(){
        return(
            <Button>Blah blah</Button>
        );
    }
}