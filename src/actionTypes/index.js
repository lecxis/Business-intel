import { ADD_INVOICE, DELETE_INVOICE } from './actionTypes';
import { v4 as uuidv4 } from 'uuid';


export const addInvoice = ({ item }) => ({
    type: ADD_INVOICE,
    payload: {
    id: uuidv4(),
    item
   // items
    }
   });

   export const deleteInvoice = id => ({
    type: DELETE_INVOICE,
    payload: {
    id
    }
   });
   
