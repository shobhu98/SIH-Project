import React from 'react';
import NotingDetailsFemale from './animation_components/female/NotingDetailsFemale';
import RequestingDetailsFemale from "./animation_components/female/RequestingDetailsFemale";
import {Button, Provider as PaperProvider} from 'react-native-paper';

export default class Policewoman extends React.Component {
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
                    <Button mode="contained" onPress={() => this.setState({police: this.state.police + 1})}>press</Button>
                    <RequestingDetailsFemale />
                    
                </PaperProvider>
            ); 
        }
        else{
            return(
                <PaperProvider>
                    <Button mode="contained" onPress={() => this.setState({police: this.state.police - 1})}>press</Button>
                    <NotingDetailsFemale />
                    
                </PaperProvider>
            ); 
        }      
    }
}