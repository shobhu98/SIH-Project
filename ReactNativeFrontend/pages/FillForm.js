import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme, Title, Divider } from 'react-native-paper';
import { Container, Input, H2, Text, Textarea, Item, StyleProvider, Content, Picker, Icon} from 'native-base';
import DatePicker from 'react-native-datepicker'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/textjs';
import {StyleSheet, View} from 'react-native';
import lan from './global.js'
import Lan from './LanguageStrings'

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
        var options= Lan.DistrictOptions[lan];
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
                <H2 style={styles.h2}>{Lan.PersonalDetails[lan]}</H2>
                <Divider style={styles.divider} />
                <Text style={styles.text}>{Lan.ComplainantsName[lan]}</Text>
                <Item regular>
                    <Input placeholder={Lan.PlaceHolderName[lan]} />
                </Item>
                <Text style={styles.text}>{Lan.Address[lan]}</Text>
                <Textarea rowSpan={4} bordered placeholder= {Lan.PlaceHolderAddress[lan]}/>
                <Text style={styles.text}>{Lan.District[lan]}</Text>
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
                <Text style={styles.text}>{Lan.PhoneNumber[lan]}</Text>
                <Item regular>
                    <Input placeholder={Lan.PhoneNumberPlaceHolder[lan]}/>
                </Item>
                <Text style={styles.text}>{Lan.Email[lan]}</Text>
                <Item regular>
                    <Input placeholder={Lan.PlaceHolderEmail[lan]} />
                </Item>
                <Text style={styles.text}>{Lan.Nationality[lan]}</Text>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder={Lan.NationalityPlaceHolder[lan]}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.nationality}
                        onValueChange={this.onNationalityChange.bind(this)}
                    >
                        <Picker.Item label={Lan.Indian[lan]} value={false} />
                        <Picker.Item label={Lan.Other[lan]} value={true} />
                    </Picker>
                </Item>
                
                {this.state.nationality && <View>
                    <Text style={styles.text}>Complainant's Country</Text>
                    <Item regular>
                        <Input placeholder={Lan.Country[lan]}/>
                    </Item>
                    <Text style={styles.text}>Complainant's Passport Number</Text>
                    <Item regular>
                        <Input placeholder={Lan.PassportNumberPlaceHolder[lan]}/>
                    </Item>
                </View>}
                <Text style={styles.text}>{Lan.DOB[lan]}</Text>
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
                    <Button mode="contained" style={styles.proceedButton}  onPress={() => this.props.navigation.navigate('FillCaseDetails')} >{Lan.ProceedButton[lan]}</Button>
                </PaperProvider>
                
            </Content>
            </StyleProvider>
        );
    }
}