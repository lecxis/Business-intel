import React, { Component } from 'react';
import { Card, CardText, CardBody, Modal, ModalHeader, ModalBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap';
    import {Link} from 'react-router-dom';
    import JsPDF from 'jspdf';

    

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
            console.log(this.props)

            return(
                <div>
                    <button onClick={this.toggleModal}  className= "btn btn-outline-dark"><span><i className="fa fa-pencil" aria-hidden="true"></i> </span>View Invoice</button> 
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Invoice 101</ModalHeader>
                    <ModalBody>
                    <div className='container' id='report' style={{ backgroundImage: "url(/assets/images/nwd_logo.png)" }}>
                        <hr/>
                        <div className=' row '>
                        <div className="col-12 col-md m-1">
                        <img src='assets/images/nwd_logo.png' className='rounded float-end' height="75" width="85" alt='logo' />
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
                            <h4>Submited on {this.props.name.date}</h4>
                            </div>   
                        </div>

                        <div className='row'>
                        <div className="col-md-3 m-1">
                            <h5>Invoice for</h5>
                            <p><span> {this.props.name.name}</span></p>
                            </div>  

                            <div className="col-md-4 m-1">
                            <h5>Payable to</h5>
                            <p>Women Diary Global ventures <br></br>
                            5600388452 <br></br> Fidelity Bank</p>
                            </div> 

                            <div className="col-md-4 m-1">
                            <h5>Invoice #</h5> 12345{}
                            <h5>TIN- 21432334-0001</h5>
                            </div> 
                        </div>
                        <div className='row'>
                            <div className="col-12 col-md m-1 ">
                            <div className="float-end" >
                            <h5>Due Date</h5> 
                            date {}
                            </div>
                            </div>
                        </div>
                        <hr></hr>

                        <div className='row'>
                        <div className="col-md-4 m-1">
                            <h6>Description</h6>
                            <p> <span>{this.props.name.description}</span></p>
                            </div>

                        <div className="col-md-2 m-1">
                            <h6>Qty</h6>
                            <p>{this.props.name.quantity}</p>
                            </div>

                            <div className="col-3 col-md m-1">
                            <h6>Unit Price</h6>
                            <p>{this.props.name.price}</p>
                            </div>

                            <div className="col-3 col-md m-1">
                            <h6>Total Price</h6>
                            <p>Amount{}</p>
                            </div>

                        </div>
                        
                        <hr></hr>
                        <div className='row'>
                            <div className="col-12 col-md m-1 ">
                            <div className="float-end" >
                            <h6>Vat (7.5%) <span> amont {} </span> </h6>
                            <h6>Grand Total <span> amont {} </span> </h6>
                            </div>
                            </div>
                        </div>
                        <button onClick={this.generatePDF}className= "btn btn-outline-dark">Download Invoice</button>
                    </div>
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


    function RenderIncome(income) {
        //let obj=new ShowInvoice();
       // console.log(obj)
    return(
       // <div onClick={()=>ModalTest()}>hello </div>
       
          <Card >
              <CardBody >
              <CardTitle>{income.name}</CardTitle>
              {income.description ? <CardSubtitle>{income.description}</CardSubtitle> : null }
              <CardText>{income.price}</CardText>
              <ShowInvoice name ={income}/>
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

function Home (props){

    //console.log(props);
    const menu = props.income.map((inc) => {
       // console.log(inc);
       return( RenderIncome(inc));
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
                <Link to ='/invoice'>  <Button outline  className="btn btn-primary" color='white' >
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