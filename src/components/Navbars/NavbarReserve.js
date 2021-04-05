import React from 'react';
import AuthContext from '../../auth-context';
import {Link} from 'react-router-dom';


export default class NavbarReserve extends React.Component {

  state={
    isOpen: false
  }


  handleToggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }


  render() {
    return (
      <AuthContext.Consumer>
        {context => {
        return (
          <>
            <div className= 'd-lg-none py-3'>
              <nav className="container-fluid nav-min fixed-top">
                <div className='row'>
                  <button type='button' className='nav-btn' onClick={this.handleToggle}>
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
                <div className='row d-flex align-items-center justify-content-center pt-2'> 
                  <ul className={this.state.isOpen?
                    'nav-links show-nav':'nav-min nav-links1'}> 
                      <Link to='/' onClick={this.handleToggle}>Home</Link>                                                                                                                                              
                      <Link to='/rooms' className='text' onClick={this.handleToggle}>Rooms</Link>
                    {context.token && (                  
                      <Link to='/bookings' onClick={this.handleToggle}>Bookings</Link>                       
                    )}                                                    
                  </ul>
                </div>
              </nav>
            </div>

            <div className='d-none d-lg-block py-3'>
              <nav className="navbar navbar-expand-lg fixed-top">                 
                <ul className="navbar-nav mr-auto"> 
                  <Link to='/' className="nav-item">Home</Link>          
                  <Link to='/rooms' className='nav-item'>Rooms</Link>                                                                                                                                                 
                </ul>
                <span className="navbar-text">  
                  {context.token && (               
                    <Link to='/bookings' className='text'>Bookings</Link>                     
                  )}                                                                                                                         
                </span>
              </nav>
            </div>
          </>
        )
      }}
      </AuthContext.Consumer>
    )
  }
}