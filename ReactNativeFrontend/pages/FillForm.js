import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme, Title } from 'react-native-paper';
import { Container, Input, H2, Text, Textarea, Item, StyleProvider, Content, Picker, Icon} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    },
};

export default class FillForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected2: undefined,
          date:true
        };
    }
    onValueChange2(value: string) {
        this.setState({
          selected2: value
        });
    }
    // showDatePicker(){
    //     this.state.setState({date:true});
    // };
    
    // hideDatePicker(){
    //     this.state.setState({date:false});
    // };

    // handleConfirm = (date) => {
    //     console.warn("A date has been picked: ", date);
    //     hideDatePicker();
    // };
    
    render(){
        return(
            <Content padder>
                <Text>Complainant's Name</Text>
                <Item regular>
                    <Input placeholder='Name' />
                </Item>
                <Text>Complainant's Address</Text>
                <Textarea rowSpan={4} bordered placeholder="Address" />
                <Text>District</Text>
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
                    <Picker.Item label="D1" value="key0" />
                    <Picker.Item label="D2" value="key1" />
                    <Picker.Item label="D3" value="key2" />
                    <Picker.Item label="D4" value="key3" />
                    <Picker.Item label="D5" value="key4" />
                </Picker>
                </Item>
                <Text>Complainant's Mobile Number</Text>
                <Item regular>
                    <Input placeholder='Mobile Number' />
                </Item>
                <Text>Complainant's Email ID</Text>
                <Item regular>
                    <Input placeholder='Email ID' />
                </Item>
                <Text>Complainant's Nationality</Text>
                <Item regular>
                    <Input placeholder='Nationality' />
                </Item>
                {/* <Text>Complainant's Date Of Birth</Text>
                <Button title="Show Date Picker" onPress={showDatePicker()} />
                <DateTimePickerModal
                    isVisible={this.state.date}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker()}
                /> */}
            </Content>
        
        );
    }
}