import { Component } from 'react';
import { Navbar, Nav} from 'reactstrap';
//import { Link, IndexLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteInvoice } from '../actionTypes';
import { addInvoice } from '../actionTypes';


import {
  BrowserRouter,
  Link,
  Redirect,
  Routes,
  Route
 } from 'react-router-dom'
 
import Header from'./HeaderComponent';
import Home from'./HomeComponent';
import Invoice from'./InvoiceComponent';
import NewInvoice from './NewInvoiceComponent';
import {INCOME} from '.././shared/income';
import {EXPENSES} from '.././shared/expenses';
import {PENDING} from '.././shared/pending';

// new addition
import Landing from "./Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";

// setting up the login access part
import store from ".././store";
import {jwtDecode} from "jwt-decode";
import setAuthToken from ".././utils/setAuthToken";
import { setCurrentUser, logoutUser } from ".././actionTypes/authActions";
import PrivateRoutes from "./private-route/PrivateRoutes";
import Dashboard from "./dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwtDecode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
  console.log('just checked the local storage to know if user is logged in or not')
  setTimeout(function (){
    console.log('just checked the local storage to know if user is logged in or not 2'), 3000
  })
}
//import Layout from './components/Layout';





class  Main extends Component {
    constructor(props) {
        super(props);
       /* this.state = {
          income: INCOME,
          expenses: EXPENSES,
          pending: PENDING,
          person: 'unknown'  
        };*/
       this.sendData= this.sendData.bind(this);
       this.deleteData = this.deleteData.bind(this);
          console.log(this.props.invoices.length)
       if (this.props.invoices.length == 0){
        const items = {
          income: INCOME,
          expenses: EXPENSES,
          pending: PENDING,
          person: 'unknown'  
        }
         // console.log(items.income);
        items.income.forEach((item) => {
          //console.log(item);
          this.props.onAddInvoice( {item:
          {
         name: item.name,
         description: item.description,
         total: item.price,
         date: item.date
       }});
      }) 
      console.log('test redux');
      console.log(this.props); 
      }
    }
    handleDelete = (id,e) => {
       e.preventDefault();
       this.props.onDelete(id);
       }

      submitForm=(data)=>{
        this.setState((prevState)=>({
            ...prevState, income:prevState.income.push(data)
        }))
      }
      
      changePerson=(person)=>{
        console.log(this.state)
        console.log('new name is '+person);

        this.setState((prevState)=>(
          {
            ...prevState, person:person
          }
    ))
    //console.log(this.state)
      }
       sendData=(data)=>{
       // console.log(data)
       let count=0;
       
        this.setState((prevState)=>{
          //console.log(prevState);
          if(count ==0){
            count++;
          let inc= prevState.income;
          inc.unshift(data)
          let newstate= {
            ...prevState, income: inc//prevState.income//.push(data)//.unshift(data)
         }
         console.log(newstate)
          return newstate  
        }  } )  
          //console.log('co is ',count);
        //this.state.income.unshift(data);
        console.log(this.state)
      }
      deleteData = (id)=>{
       
        this.setState((prevState)=>{
          let inc = prevState.income.filter(obj=>{
            return obj.id !==id
          });
          let newstate= {
            ...prevState, income: inc//prevState.income//.push(data)//.unshift(data)
         }
         //console.log(newstate)
          return newstate
        } )  

      }

render(){
 //console.log(this.props);
    return(

    <div>
       <Header/>
          <Routes>
        { /**  <Route path='/' element ={ <Home income={ this.props.invoices 
          //this.state.income
         } expenses={this.props.invoice
         //this.state.expenses} 
          person={'Ola'
          //this.state.person} deleteData={this.props.onDelete 
          //this.deleteData}
          />} />*/}

          <Route path='/invoice' element ={<Invoice sendData={this.props.onAddInvoice} 
          income={this.props.invoice /*this.state.income*/}
          person={'Ola'/*this.state.person*/}
          changePerson={this.changePerson}
           />} />
            
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />

            <Route element={<PrivateRoutes/>}>

              <Route path="/dashboard" element={<Dashboard/>} />
            </Route>
          

          </Routes>
        <p className='test'>
         Hello Lecxis World is back in main
        </p>
        <Landing />
        
        
    </div>
    )
}
}
const mapStateToProps = state => {
 // console.log(state);
  return {
  invoices: state
  };
 };

 const mapDispatchToProps = dispatch => {
  return {
  onAddInvoice: invoice => {
    //console.log(invoice);
  dispatch(addInvoice(invoice));
  },
  onDelete: id => {
    
  dispatch(deleteInvoice(id));
  }
  };
 };
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Main);