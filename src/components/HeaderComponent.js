
import React,{ Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Collapse, NavbarToggler,} from 'reactstrap';
import {Link} from 'react-router-dom';

class Header extends Component{

    constructor(props){
        super(props)
    }

    loginButton() {
        console.log('button login');
      }

render(){


    return(
        <React.Fragment>

        
 <Navbar dark expand="sm">
              <div className="container" style={{
            display: 'flex',  padding: 30
        }}>
              <NavbarToggler onClick={console.log('toggler')} />
                  <NavbarBrand className="mr-auto"  href="/">
                  <img src='assets/images/logo.png' height="30" width="41" alt='Business Intel' />
                  </NavbarBrand>
                  <Collapse isOpen={console.log('nav open')} navbar>
                  <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/item'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem >
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="me-auto">
    </Nav>
                            <Nav className="ml-auto " navbar >
                                <NavItem >
                                <Link to ='/'> <Button outline onClick={this.loginButton}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </Link> 
                                </NavItem>
                            </Nav>

                            
                    </Collapse>
              </div>
            </Navbar>
            <div className='jumbotron' >
                 <div className="container">
                     <div className="row row-header">
                         <div className="col-12 col-sm-6">
                             <h1>Ristorante con Fusion</h1>
                             <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                         </div>
                     </div>
                 </div>
             </div>

            </React.Fragment>
    )
}

}

export default Header;