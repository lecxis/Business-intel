import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import invoiceReducer from './reducers/invoiceReducer';
import store from "./store";

//const store = createStore(invoiceReducer);

class  App extends Component {
  
  render(){
  return (
    <Provider store={store}>

    
    <BrowserRouter>
    <Main/>
    </BrowserRouter> 
    </Provider>  
  );
}
}
export default App;