import { Component } from 'react';
import {Row, Label, Button } from "reactstrap";

class Item extends Component{
    constructor(props) {
        super(props);

        this.state = { 
             item: {},
             items: [{description: "", price: "", quantity: ""}]} 
 
        this.handleUserNameChange = this.handleUserNameChange.bind(this);     
        this.handleItemNameChange = this.handleItemNameChange.bind(this);   
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);   
        this.handlePriceChange = this.handlePriceChange.bind(this);   
        this.handleQuantityChange = this.handleQuantityChange.bind(this);      
        this.handleDateChange = this.handleDateChange.bind(this);      
        
        this.butClicked=this.butClicked.bind(this)
    
        //this.handleCategoryChange = this.handleCategoryChange.bind(this); 
        //console.log('this is the props');
        //console.log(this.props.income[0].username);
    }
    handleChange(i, e) {
        let itemz = this.state.items;
        itemz[i][e.target.name] = e.target.value;
        this.setState( (state, props) => {  
            let item = state.item;                         
           
       return { item: item, items: itemz }         
           })
       // this.setState({ item });
                        }

    addFormFields() {
    this.setState(({
    items: [...this.state.items, {  price: " ", quantity: "" }]
    }))}
    
    butClicked(){
        this.props.changePerson('joke');   
    }
    addFields(e){
        e.preventDefault();
    
    let newfield = { name: '', age: '' }
    alert(newfield)
    }
    handleUserNameChange(e) {  
        this.setState( (state, props) => {  
             let item = state.item                         
             item.userName = e.target.value; 
             this.props.changePerson(item.userName)
        return { item: item }         
            });   
     }
     handleItemNameChange(e) {  
        this.setState( (state, props) => {  
             let item = state.item                         
             item.name = e.target.value; 
        return { item: item }         
            });   
     }
     handleDescriptionChange(e) {  
        this.setState( (state, props) => {  
             let item = state.item                         
             item.description = e.target.value; 
        return { item: item }         
            });   
     }
     handlePriceChange(e) {  
        this.setState( (state, props) => {  
             let item = state.item                         
             item.price = e.target.value; 
        return { item: item }         
            });   
     }
     handleQuantityChange(e) {  
        this.setState( (state, props) => {  
             let item = state.item                         
             item.quantity =e.target.value; 
        return { item: item }         
            });   
     }
     handleDateChange(e) {  
        this.setState( (state, props) => {  
           
            // console.log(item.date);
             //e.target.value; 
       // return { item: item }         
            });   
     }
     getTotal(items){
        let total=0;
        items.map((element, index) => (
            total= total+element.price*element.quantity  
        ))
        //console.log('time to get total');
        //console.log(total);
        return total;

     }
    onSubmit = (e) => {
       e.preventDefault();
       this.setState( (state, props) => {  
        const date = new Date();
        let day = date.getDate();
    let month = date.getMonth()+1 ;
    let year = date.getFullYear();
    let min=date.getMinutes();
    let hour=date.getHours();
    let sec=date.getSeconds();

    let dueDate= new Date();
    dueDate.setDate(dueDate.getDate() + 5)
    let dueDay = dueDate.getDate();
    let dueMonth = dueDate.getMonth()+1;
    let dueYear = dueDate.getFullYear();
    

         let item = state.item  
         item.number=452+hour+min+sec;                       
         item.date = `${day}/${month}/${year}`
         item.dueDate = `${dueDay}/${dueMonth}/${dueYear}`
       //let item =state.item

        item.total=  this.getTotal(state.items)//item.quantity*item.price;
        item.vat = item.total*0.075;
        item.grandTotal=item.vat+item.total;
        return { item: item }         
            }); 
        alert(JSON.stringify(this.state));   
    this.props.sendData(this.state)  
    this.setState( {item: {}})
    //console.log(this.state)
} 
    
    render(){

               // console.log(this.props.income[0].userName);
        return(
            
            <div className="container">
                <form onSubmit={(e) => this.onSubmit(e)}>
                <Row className="form-group">
                                <Label htmlFor="username">Username</Label>
                                <input type="text" id="name" name="name" placeholder="Enter expense title" 
                                         onChange={this.handleUserNameChange}
                                    />
                                </Row>

                                <Row className="form-group">
                                <Label htmlFor="Item">Item Name</Label>
                                <input type="text" id="item" name="item" placeholder="Enter expense title" 
                                onChange={this.handleItemNameChange}/>
                                </Row>
                                {/*
                                <Row className="form-group">
                                <Label htmlFor="description">Item Despcription</Label>
                                <input type="text" id="description" name="description" placeholder="Enter Item description" 
                                onChange={this.handleDescriptionChange}/>
                                </Row>

                                <Row className="form-group">
                                <Label htmlFor="price">Price</Label>
                                <input type="text" id="price" name="price" placeholder="Enter Unit price in naira"
                                onChange={this.handlePriceChange} />
                                </Row>

                                <Row className="form-group">
                                <Label htmlFor="quantity">Quantity</Label>
                                <input type="number" id="quantity" name="quantity" placeholder="Enter the quantity of item" 
                                onChange={this.handleQuantityChange}/>
                                </Row>
                                
                                <button onClick={this.addFields}>Add More..</button>
                                
                                    */}
                                     {this.state.items.map((element, index) => (
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
                                <Row className="form-group">
                                <Label htmlFor="due">Due date</Label>
                                <input type="date" id="due" name="due" placeholder="" 
                                onChange={this.handleDateChange}/>
                                </Row>

                                <Row className="form-group">
                                <input type="submit" value="Submit" />
                                </Row>
                                </form>
                                <Button outline onClick={this.butClicked}><span className="fa fa-sign-in fa-lg"></span> Testing</Button>


<h1> This Is the username of {/*this.props.income[0].name
} and {this.props.person*/} Invoice page </h1>
            </div>
        )
    }
}
export default Item;