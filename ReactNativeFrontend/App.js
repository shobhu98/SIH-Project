import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Routing from './Routing';

//import MainModel from './EPstates';
import { createStore } from 'easy-peasy';
import { StoreProvider } from 'easy-peasy';

const productsModel = {
  items: {
    1: { id: 1, name: 'Peas', price: 10 }
  }
};

const basketModel = {
  productIds: [1]
};

const storeModel = {
  products: productsModel,
  basket: basketModel
};

const store = createStore(storeModel);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
        <StoreProvider store={store}>
            <Routing />
        </StoreProvider>
        
    );
  }
}