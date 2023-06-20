import React from 'react';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap';
    import {Link} from 'react-router-dom';
    
function RenderIncome(income) {
    return(
        
          <Card>
              <CardBody>
              <CardTitle>{income.name}</CardTitle>
              {income.description ? <CardSubtitle>{income.description}</CardSubtitle> : null }
              <CardText>{income.price}</CardText>
              </CardBody>
          </Card>
          )

}

function RenderExpenses(expense) {
    return(        
          <div className=' row expense-card'>
              <div className='item col-md-9'>
              <div className='item-name '>{expense.item}</div>
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
                <h3> Invoice </h3>
               {menu}
                </div>
                <div className="col-12 col-md m-1">
                <h3> Pending Invoice</h3>
                {menu}
                <Link to ='/invoice'>  <Button outline onClick={console.log('Button')} className="btn btn-primary" color='white' >
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