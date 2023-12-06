import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
class  App extends Component {
  
  render(){
  return (
    
    <BrowserRouter>
    <Main/>
    </BrowserRouter>   
  );
}
}
export default App;