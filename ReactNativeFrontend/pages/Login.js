import React from 'react';
import { Container, Header, Left, Body, Right, Title, StyleProvider, Content, Form, Item, Input, Label } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/variables';
import { Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Divider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    },
};

export default class Login extends React.Component {
    // constructor(props){
    //     super(props);
    //     const [text, setText] = React.useState('');
    // }
    render(){
        return(
            <StyleProvider style={getTheme(material)}>
                <Container >
                    <Header >
                        {/* <Left/> */}
                        <Body>
                        <Title>Virtual Police Station</Title>
                        </Body>
                        {/* <Right /> */}
                    </Header>
                    <PaperProvider theme={theme}>
                        <Content padder>
                            <Form style={{paddingTop:"20px"}}>
                                <Item regular>
                                <Input placeholder="Aadhar Number"/>
                                </Item>
                                <Button mode="outlined" onPress={() => console.log('Pressed')} style={{marginRight:"40px",marginLeft:"40px", marginBottom:"10px", marginTop:"10px"}}>
                                    Send OTP
                                </Button>
                                
                                <Item regular>
                                <Input placeholder="OTP" />
                                </Item>
                                <Button mode="outlined" onPress={() => this.props.navigation.navigate('MainPage')} style={{marginRight:"40px",marginLeft:"40px", marginTop:"10px"}}>
                                    Log in
                                </Button>
                                <Divider style={{margin:"30px", height:"3px"}} theme={theme}/>
                                <Button mode="contained" onPress={() => console.log('Pressed')} style={{marginRight:"20px",marginLeft:"20px", marginTop:"10px"}}>
                                    Get Help
                                </Button>
                            </Form>
                        </Content>
                        
                    </PaperProvider>
                </Container>
            </StyleProvider>
        );
    }
}