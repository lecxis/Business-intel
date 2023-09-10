import React, { Component, useRef } from 'react';
import { Card, CardText, CardBody, Modal, ModalHeader, ModalBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap';
    import {Link} from 'react-router-dom';
    import JsPDF from 'jspdf';
    import ReactToPrint from 'react-to-print';

    

    class ShowInvoice extends Component{
        constructor(props){
            super(props)
            this.toggleModal = this.toggleModal.bind(this);

            this.state={
                isModalOpen: false
              }
             
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
             }
              generatePDF = () => {
                /*const report = new JsPDF('portrait','pt','a4');
                //source = document.querySelector('#report')[0];
                report.html(document.querySelector('#report')).then(() => {
                    report.save('report.pdf');
                     });*/
                    const report = new JsPDF('portrait','pt','a4');
                let source = document.querySelector('#report');
                report.html(source, {
                    callback: function(report) {
                        report.save("newpdf.pdf");
                    },
                    x: 50,
                    y: 12
                });
               
            }
        render(){  
            let prop;
            let number;
            if(this.props.name.description){
                prop= this.props.name
               // console.log(prop.name);
                number=prop.number;
            }
            else if(this.props.name.item)
             {prop=this.props.name.item;
           // console.log('item found')
           number=prop.number;
            //console.log(prop.number)

                }
            return(
                <div>
                    <button onClick={this.toggleModal}  className= "btn btn-outline-dark"><span><i className="fa fa-pencil" aria-hidden="true"></i> </span>View Invoice</button> 
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Invoice 142001{number} </ModalHeader>
                    <ModalBody>
                   <PrintComponent data={this.props}/>
                    <button onClick={this.generatePDF}className= "btn btn-outline-dark">Download Invoice</button>
                    </ModalBody>
                </Modal>

                 
                </div>
            );
        }

    }





    /*let open=true
    let toggleT= ()=>{
        open=!open;
    }
    function ModalTest(){
        console.log('Modal test mode')
       

        return(
            <div>
                <p>Hello world</p>
            <Modal isOpen={open} toggle={toggleT}> 
            <ModalHeader toggle={toggleT}>Invoice 101</ModalHeader>
            <ModalBody>
                <p>This is a test modal</p>
            </ModalBody>
            </Modal>
            </div>
        )
    }
    */


    function RenderIncome(income, deleteData) {
        //let obj=new ShowInvoice();
       // console.log(obj)
       let prop
       if (income.Description) prop=income
       else if (income.item) prop=income.item
       else prop=income
    return(
       // <div onClick={()=>ModalTest()}>hello </div>
       
          <Card >
              <CardBody >
              <CardTitle>{prop.name}</CardTitle>
              {prop.description ? <CardSubtitle>{prop.description}</CardSubtitle> : null }
             { prop.total ? <CardText>{prop.total}</CardText>: <CardText>{prop.price}</CardText>}
              <ShowInvoice name ={income}/> <button onClick={()=>{deleteData(prop.id)}}> Delete</button>
              </CardBody>
          </Card>
          )

}

function RenderExpenses(expense) {
    return(        
          <div className=' row expense-card'>
              <div className='item col-md-9' >
              <div className='item-name ' >{expense.item}</div>
              {expense.comment ? <div className='comment'>{expense.comment}</div> : null }
              </div>
              <div className='amount col-md-3'>{expense.amount}</div>
              <hr></hr>
              
          </div>
          )

}

function PrintComponent(props) {
    let componentRef = useRef();
   
  
    return (
      <>
        <div>
          {/* button to trigger printing of target component */}
          <ReactToPrint
            trigger={() => <Button>Print this out!</Button>}
            content={() => componentRef}
          />
  
          {/* component to be printed */}
          <InvoiceData ref={(el) => (componentRef = el)}  dat={props}/>
        </div>
      </>
    );
  }
class TestPrint extends Component{
    constructor(props){
        super(props)

    }

    render (){
       // console.log ('this is the new data')
       //console.log(this.props)
        return( 
            <div>Test the print Pdf and {this.props.dat.data.name.name}</div>
        )
    }

}
function Description(props) {
    return (
        <div className='row'>
        <div className="col-5 col-md m-1">
        <h6>Description    </h6>
        <p> <span>{props.description}</span></p>
        </div>
        
        <div className="col-2 col-md m-1">
        <h6>Qty</h6>
        <p>{props.quantity}</p>
        </div>

        <div className="col-3 col-md m-1">
        <h6>Unit Price</h6>
        <p>₦{new Intl.NumberFormat('en-US').format(props.price)}</p>
        </div>
          <div className="col-3 col-md m-1">
        <h6>Total Price</h6>
        <p>₦{new Intl.NumberFormat('en-US').format(props.total)}</p>
        </div>

    </div>
    );
  }

  function RenderItems(item){
    return(
        <div className='row'>
        <div className="col-5 col-md m-1">
        <h6>Description    </h6>
        <p> <span>{item.description}</span></p>
        </div>
        
        <div className="col-2 col-md m-1">
        <h6>Qty</h6>
        <p>{item.quantity}</p>
        </div>

        <div className="col-3 col-md m-1">
        <h6>Unit Price</h6>
        <p>₦{new Intl.NumberFormat('en-US').format(item.price)}</p>
        </div>
          <div className="col-3 col-md m-1">
        <h6>Total Price</h6>
        <p>₦{new Intl.NumberFormat('en-US').format(item.price*item.quantity)}</p>
        </div>

    </div>
    )
  }
  function DescriptionTwo(props) {
    let total;
   let items= props.items.map((item)=>{
        return( RenderItems(item));
    });
        
     total = props.items.reduce((total,item)=>{
        return( total+(item.price*item.quantity));
    }, 0);
    if (props.items.length>1){
    return (
        <div> {items}
           <div className="col-6 col-md m-1 total" > Total Amount: ₦{new Intl.NumberFormat('en-US').format(total)}</div>
        </div>  
    );
    }
    else return (<div> {items}</div>)
  }


class InvoiceData extends Component{
    constructor(props){
        super(props)

    }

    render (){
            let prop;
            let description;
            if (this.props.dat.data.name.description){
                prop=this.props.dat.data.name;
                    description= <Description description={prop.description} quantity={prop.quantity}
                    price ={prop.price} total ={prop.total}/>
            }
            else {
                prop = this.props.dat.data.name.item;
                //console.log(prop.items[0])
                description = <DescriptionTwo items={this.props.dat.data.name.items}/>
            }

        return(
            <div className='container' id='report' style={{  /*backgroundImage: 'url("assets/images/nwd_logo.png")',
            backgroundRepeat: "no-repeat", backgroundSize: "cover"*/}}>
                <div className=' row '>
                <div className="col-12 col-md m-1">
                    <div className='purpleLine'></div>
                <img src='http://lecxis.github.io/Business-intel/assets/images/nwd_logo.png' className='rounded float-end' height="75" width="85" alt='logo nwd' />
                </div>
                </div>
                <div className=' row '>
                <div className="col-12 col-md m-1">
                    <h4>NIGERIAN WOMEN DIARY</h4>
                    <p>
                        OREGUN,
                        <br></br>
                        LAGOS, NIGERIA.
                        <br></br>
                        07082662500
                    </p>
                    </div> 
                </div>
                <div className=' row '>
                <div className="col-12 col-md m-1">
                    <div className='invoice'>Invoice</div>
                    </div>   
                </div>

                <div className=' row '>
                <div className="col-12 col-md m-1 ">
                    <h4>Submited on {prop.date}</h4>
                    </div>   
                </div>

                <div className='row fifth g-7'>
                <div className="col-4 col-md m-1 ">
                    <h5>Invoice for</h5>
                    <p><span> {prop.name}</span></p>
                    </div>  

                    <div className="col-4 col-md m-1">
                    <h5>Payable to</h5>
                    <p>Women Diary Global ventures <br></br>
                    5600388452 <br></br> Fidelity Bank</p>
                    </div> 

                    <div className="col-3 col-md-4 m-1">
                    <h5>Invoice #</h5>142001{prop.number} 
                    <h5>TIN- 21432334-0001</h5>
                    </div> 
                </div>
                <div className='row'>
                    <div className="col-12 col-md m-1 ">
                    <div className="float-end" >
                    <h5>Due Date</h5> 
                    {prop.dueDate}
                    </div>
                    </div>
                </div>
                <div className='ashThinLine'></div>
                    
                <div className='row'>
                    {description}
                </div>

                
                <div className='ashThickLine'></div>
                <div className='ashThinLine'></div>
                <div className='row'>
                    <div className="col-12 col-md m-1 ">
                    <div className="float-end" >
                    <h6>Vat (7.5%) <span> ₦{new Intl.NumberFormat('en-US').format(prop.vat)} </span> </h6>
                    <h6>Grand Total <span>₦{new Intl.NumberFormat('en-US').format(prop.grandTotal)} </span> </h6>
                    </div>
                    </div>
                </div>
            </div>
        )   
    }
}

function Home (props){

    //console.log(props);
    const menu = props.income.map((inc) => {
       // console.log(inc);
       return( RenderIncome(inc, props.deleteData));
    });

    const bills=props.expenses.map((inc) => {
        // console.log(inc);
        return( RenderExpenses(inc));
     });
//const user=props.person
    return(
        <div className="container">
            <div className="row align-items-start">
            <div className="col-12 col-md m-1 display">
            <ShowInvoice name ={props.person}/>
                <h3> Invoice </h3>
               {menu}
                </div>
                <div className="col-12 col-md m-1">
                <h3> Pending Invoice</h3>
                {menu}
                <Link to ='/invoice'>  <Button outline  className="btn btn-primary" color='white'>
                    Create a new Invoice
                    </Button></Link>
                </div>
                <div className="col-12 col-md m-1 test display">
                <h3> Expenses</h3>
                {bills}
                
                </div>
            </div>
            <h1> This Is the username of  {props.person} Invoice page </h1>
            
            </div>

    );}

export default Home;