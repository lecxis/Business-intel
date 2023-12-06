import { ADD_INVOICE, DELETE_INVOICE } from "../actionTypes/actionTypes";
import {INCOME} from '.././shared/income';
import {EXPENSES} from '.././shared/expenses';
import {PENDING} from '.././shared/pending';

const initialState = [];

export default  function invoiceReducer (state = initialState, action) {
  
  switch (action.type) {
    case ADD_INVOICE: {
     // console.log('add invoice reducer is called');
      console.log (action.payload);
      //console.log('state');
      //console.log(state);
      return [...state, /*income: state.income.unshift(*/
        action.payload];
    }
      
    case DELETE_INVOICE:
      {
        //console.log(state)
      return  state.filter(inc => inc.id !== action.payload.id)
      }
    default:
      return state;
  }
}