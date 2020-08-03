import * as React from 'react';
import {Text,DefaultTheme , Provider as PaperProvider, Divider} from 'react-native-paper';
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
                if(responseData[i].__v===2){
                    let js={
                        name:responseData[i]._id,
                        status:responseData[i].__v,
                        date:responseData[i].date,
                        viewbutton:false,
                        editbutton:true,
                        appealbutton:false
                    }
                    arr.push(js);
                    i++;
                }
                else if(responseData[i].__v===5){
                    let js={
                        name:responseData[i]._id,
                        status:responseData[i].__v,
                        date:responseData[i].date,
                        viewbutton:false,
                        editbutton:false,
                        appealbutton:true
                    }
                    arr.push(js);
                    i++;
                }
                else{
                    let js={
                        name:responseData[i]._id,
                        status:responseData[i].__v,
                        date:responseData[i].date,
                        viewbutton:true,
                        editbutton:false,
                        appealbutton:false
                    }
                    arr.push(js);
                    i++;
                }
                
                
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
            <Text>Loading</Text>
        );
    }
}