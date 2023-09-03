import { Component } from 'react';
import {Row, Label, Button } from "reactstrap";

class Form extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            item: [{userName: "", name: "", description: "", price: "", quantity: ""}]
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);  
    }
    handleUserNameChange(e) {  
       this.setState( (state, props) => {  
           let item = state.item 
             //console.log(state)                        
            item[0].userName = e.target.value; 
            // this.props.changePerson(item.userName)
        return { item: item }         
           });   
     }

    handleChange(i, e) {
        let item = this.state.item;
        item[i][e.target.name] = e.target.value;
        this.setState({ item });
                        }

    addFormFields() {
    this.setState(({
    item: [...this.state.item, {  price: " ", quantity: "" }]
    }))/*
    this.setState( (state, props) => {  
        let item = state.item;                         
        item[1] = {  price: "ghhjjkk", quantity: "" }//" testing"; 
        console.log(state)
   return { item: item }         
       })
       */
}

render (){

    return(
        <form  onSubmit={this.handleSubmit}>

        <Label htmlFor="username">Username</Label>
        <input type="text" id="name" name="name" placeholder="Enter expense title"  onChange={this.handleUserNameChange} />
              <br></br>

        {this.state.item.map((element, index) => (
            <div className="form-inline" key={index}>
              
              <label>Description</label>
              <input type="text" name="description" value={element.description || ""} onChange={e => this.handleChange(index, e)} />
              <label>Quantity </label>
              <input type="text" name="quantity" value={element.quantity || ""} onChange={e => this.handleChange(index, e)} />
              <label>Unit Price</label>
              <input type="text" name="price" value={element.price || ""} onChange={e => this.handleChange(index, e)} />
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => this.addFormFields()}>Add new Item</button>
              </div>
        NEW FORM
        </form>
    );
}


}

export default Form;