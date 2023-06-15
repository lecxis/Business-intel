import { Component } from 'react';
import { Navbar, Nav} from 'reactstrap';
//import { Link, IndexLink } from 'react-router-dom';

import {
  BrowserRouter,
  Link,
  Redirect,
  Routes,
  Route,
 } from 'react-router-dom'
 
import Header from'./HeaderComponent';
import Home from'./HomeComponent';
import Invoice from'./InvoiceComponent';
import {INCOME} from '.././shared/income';
import {EXPENSES} from '.././shared/expenses';
import {PENDING} from '.././shared/pending';
//import Layout from './components/Layout';




class  Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          income: INCOME,
          expenses: EXPENSES,
          pending: PENDING,
          person: 'unknown'  
        };
       this.sendData= this.sendData.bind(this);
       
      }
      
      changePerson=(person)=>{
        console.log('john o')
        this.setState((prevState)=>(
          {
            person: person
          }
    ))

      }
       sendData=(data)=>{
        console.log(data)
        this.setState((state, props)=>{
              {
                income: this.state.income.unshift(data)
              }
        })
        //this.state.income.unshift(data);
        console.log(this.state)
      }

render(){

    return(

    <div >
       <Header/>
          <Routes>
          <Route path='/' element ={ <Home income={this.state.income} expenses={this.state.expenses} 
          person={this.state.person}
          />} />

          <Route path='/invoice' element ={<Invoice sendData={this.sendData} 
          income={this.state.income}
           person={this.state.person}
           changePerson={this.changePerson}
           
           />} />

          </Routes>
        <p className='test'>
         Hello Lecxis World is back in main
        </p>
        
    </div>
    )
}


}

export default Main;