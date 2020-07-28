import React from 'react';
import NotingDetailsMale from './animation_components/male/NotingDetailsMale';
import RequestingDetailsMale from "./animation_components/male/RequestingDetailsMale";
import {Button, Provider as PaperProvider} from 'react-native-paper';
import NamasteFemale from "./animation_components/female/NamasteFemale";
import NamasteMale from "./animation_components/male/NamasteMale";

export default class Policeman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            police: 0
        }; 
    }
    render(){
        if(this.state.police === 0){
            return(
                
                <PaperProvider>
                    <NamasteFemale />
                    <Button mode="contained" onPress={() => this.setState({police: this.state.police + 1})}>press</Button>
                </PaperProvider>
            ); 
        }
        else{
            return(
                <PaperProvider>
                    <NamasteMale />
                    <Button mode="contained" onPress={() => this.setState({police: this.state.police - 1})}>press</Button>

                </PaperProvider>
            ); 
        }      
    }
}