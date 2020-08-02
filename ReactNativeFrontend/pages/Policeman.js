import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import NotingDetailsMale from './animation_components/male/NotingDetailsMale';
import RequestingDetailsMale from "./animation_components/male/RequestingDetailsMale";
export default class App extends React.Component {
  state = {
    note:true,
    speak:false,
    append:0,
    id:3,
    messages: [
      {
        _id: 2,
        text: "Hello",
        createdAt: new Date(),
        // user: {
        //   _id: 2,
        //   name: 'FAQ Bot',
        //   avatar: 'https://i.imgur.com/7k12EPD.png'
        // }
      },
      // {
      //   _id: 2,
      //   text: "Nooooo",
      //   createdAt: new Date()
      // }
    ]
  };
  onSend(messages) {
    this.setState({
      note:false,
      speak:true,
    })
    console.log("Messages");
    console.log(messages);
    if(this.state.append===1){
      this.setState({append:this.state.append+1})
    }else if(this.state.append===1){
      messages[0].text=messages[0].text+"fir types"
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }),()=>{
      fetch('http://192.168.1.10:7000/api/dialogflow/textquery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: messages[0].text
      })
    }).then((response) => {
      response.json().then((result) => {
        if (response.status === 200) {
          console.log(result.fulfillmentMessages[0].text.text[0]);
          if(result.fulfillmentMessages[0].text.text[0].localeCompare("I have got your personal details. Are you ready to move on to incident details?")===0){
            console.log("Changing here");
            this.setState({append:this.state.append+1});
          }
          var js = {
            _id: this.state.id,
            text: result.fulfillmentMessages[0].text.text[0],
            createdAt: new Date()
          }
          
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, js),
            id:previousState.id+1
          }), () => console.log(this.state.messages))

        } else {
          var error = Error(reponse.statusText);
          error.response = response;
          throw error
        }
      })
    }).catch(function (error) {
      console.log(error)
    })
    })

    this.setState({
      note:true,
      speak:false,
    })

    //API call
    // console.log(messages[0].text);
    // fetch('http://192.168.1.10:7000/api/dialogflow/textquery', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     text: messages[0].text
    //   })
    // }).then((response) => {
    //   response.json().then((result) => {
    //     if (response.status === 200) {
    //       console.log(result.fulfillmentMessages[0].text.text[0]);
    //       var js = {
    //         _id: 2,
    //         text: result.fulfillmentMessages[0].text.text[0],
    //         createdAt: new Date()
    //       }
    //       this.setState(previousState => ({
    //         messages: GiftedChat.append(previousState.messages, js)
    //       }), () => console.log(this.state.messages))

    //     } else {
    //       var error = Error(reponse.statusText);
    //       error.response = response;
    //       throw error
    //     }
    //   })
    // }).catch(function (error) {
    //   console.log(error);
    // })


  }

  render() {
    return (
      <View style={styles.container}>
          {this.state.note && <NotingDetailsMale style={{position:'absolute'}}/>}
          {this.state.speak && <RequestingDetailsMale style={{position:'absolute'}}/>}
          <GiftedChat messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
            _id: 1
          }}
            />
        </View>
      

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});