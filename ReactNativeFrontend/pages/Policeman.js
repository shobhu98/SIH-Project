import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
export default class App extends React.Component {
  state = {
    messages: [
      {
        _id: 1,
        text: "Bye bye developer",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'FAQ Bot',
            avatar: 'https://i.imgur.com/7k12EPD.png'
          }
      },
      {
        _id: 2,
        text: "Nooooo",
        createdAt: new Date()
      }
    ]
  };onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }


render() {
    return (
      <View style={styles.container}>
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