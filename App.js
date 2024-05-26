import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import StackNavigator from './navigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;