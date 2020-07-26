import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme, Title, Divider } from 'react-native-paper';
import { Container, Input, H2, Text, Textarea, Item, StyleProvider, Content, Picker, Icon} from 'native-base';
import DatePicker from 'react-native-datepicker'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/textjs';
import {StyleSheet, View} from 'react-native';

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
    h2:{
        marginTop:10,
        color:"#FF4B63"
    },
    text:{
        marginTop:15
    },
    divider:{
        height:2,
        marginTop:10,
        marginLeft:5,
        marginRight:5
    },
    bg:{
        backgroundColor:"white"
    },
    proceedButton:{
        marginVertical:20,
        marginHorizontal:10
    }
});

export default class FillForm extends React.Component {
    constructor(props) {
        super(props);
        var options=["Agar Malwa","Alirajpur","Annupur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Niwari","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umari","Vidisha"];
        var optionsj=[];
        for(var i=0;i<options.length;i++){
            optionsj.push({
                name:options[i],
                key:"key"+i
            });
        }
        this.state = {
            selected2: undefined,
            date:"22-07-2020",
            optionsj:optionsj,
            nationality: undefined
        };   

    }
    onValueChange2(value) {
        this.setState({
          selected2: value
        });
    }

    onNationalityChange(value) {
        this.setState({
          nationality: value
        });
    }
    
    render(){
        return(
            <StyleProvider style={getTheme(material)}>

            
            <Content padder style={styles.bg}>
                <H2 style={styles.h2}>Personal Details</H2>
                <Divider style={styles.divider} />
                <Text style={styles.text}>Complainant's Name</Text>
                <Item regular>
                    <Input placeholder='Name' />
                </Item>
                <Text style={styles.text}>Complainant's Address</Text>
                <Textarea rowSpan={4} bordered placeholder="Address" />
                <Text style={styles.text}>District</Text>
                <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your District"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                >
                    {this.state.optionsj.map((option, index) => (
                        <Picker.Item label={option.name} value={option.key} />
                    ))}
                </Picker>
                </Item>
                <Text style={styles.text}>Complainant's Mobile Number</Text>
                <Item regular>
                    <Input placeholder='Mobile Number' />
                </Item>
                <Text style={styles.text}>Complainant's Email ID</Text>
                <Item regular>
                    <Input placeholder='Email ID' />
                </Item>
                <Text style={styles.text}>Complainant's Nationality</Text>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select nationality"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.nationality}
                        onValueChange={this.onNationalityChange.bind(this)}
                    >
                        <Picker.Item label="Indian" value={false} />
                        <Picker.Item label="Other" value={true} />
                    </Picker>
                </Item>
                
                {this.state.nationality && <View><Text style={styles.text}>Complainant's Passport Number</Text><Item regular><Input placeholder='Passport Number'/></Item></View>}
                <Text style={styles.text}>Complainant's Date Of Birth</Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-05-1947"
                    maxDate="22-07-2020"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <PaperProvider theme={theme}>
                    <Button mode="contained" style={styles.proceedButton}  onPress={() => this.props.navigation.navigate('FillCaseDetails')} >Proceed</Button>
                </PaperProvider>
                
            </Content>
            </StyleProvider>
        );
    }
}