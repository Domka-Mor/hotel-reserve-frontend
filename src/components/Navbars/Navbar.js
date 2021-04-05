import React from 'react';
import {Link as Link1} from "react-scroll";
import AuthContext from '../../auth-context';
import {Link as Link2} from 'react-router-dom';


export default class Navbar extends React.Component {

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
				                    <Link1
				                    	onClick={this.handleToggle}
										activeClass="active"
										to="services"
										spy={true}
										smooth={true}
										offset={0}
										duration= {1000}>
										Services
								    </Link1>
								    <Link1
										onClick={this.handleToggle}
										activeClass="active"
										to="rooms"
										spy={true}
										smooth={true}
										offset={0}
										 duration= {1000}>
										Rooms
									</Link1>
									<Link1
										onClick={this.handleToggle}
										activeClass="active"
										to="reservation"
										spy={true}
										smooth={true}
										offset={0}
										 duration= {1000}>
										Reservation
									</Link1>									
									<Link1
										onClick={this.handleToggle}
										activeClass="active"
										to="about us"
										spy={true}
										smooth={true}
										offset={0}
										duration= {1000}>
										About Us
									</Link1>
									{context.token && (                  
						                <Link2 to="/bookings" className="text" onClick={this.handleToggle}>Bookings</Link2>
						            )}      				             				                   				                         
						            {context.token && (                  
						                <Link2 to='/'>
						                   <button className='nav-text' onClick={() => {context.logout(); this.handleToggle();}}>Logout</button>
						                </Link2>
						            )}
						            {!context.token && (                  
						                <Link2 to="/auth">
						                   <button className='nav-text' onClick={() => {context.login(); this.handleToggle();}}>Login</button>
						                </Link2>
						            )}
			                	</ul>
			            	</div>
		       	 		</nav>
					</div>

		       		<div className='d-none d-lg-block py-3'>
						<nav className="navbar navbar-expand-lg fixed-top">									
							<ul className="navbar-nav mr-auto">	
					      		<Link1
						      		className="nav-item"
									activeClass="active"
									to="services"
									spy={true}
									smooth={true}
									offset={0}
									duration= {1000}>
									Services
							    </Link1>
							    <Link1
									className="nav-item"
									activeClass="active"
									to="rooms"
									spy={true}
									smooth={true}
									offset={0}
									 duration= {1000}>
									Rooms
								</Link1>
								<Link1
									className="nav-item"
									activeClass="active"
									to="reservation"
									spy={true}
									smooth={true}
									offset={0}
									 duration= {1000}>
									Reservation
								</Link1>								
								<Link1
									className="nav-item"
									activeClass="active"
									to="about"
									spy={true}
									smooth={true}
									offset={0}
									duration= {1000}>
									About Us
								</Link1>								
							</ul>
							<span className="navbar-text">
								{context.token && (                  
					                <Link2 to="/bookings" className="text">Bookings</Link2>
					            )}      				             				                   				                         
					            {context.token && (                  
					                <Link2 to='/'>
					                   <button className="nav-text" onClick={context.logout}>Logout</button>
					                </Link2>
					            )}	
					            {!context.token && (
					            <Link2 to="/auth">
					                   <button className="nav-text" onClick={context.login}>Login</button>
					            </Link2> 
					            )}	 
							</span>
						</nav>
					</div>
				</>
		      );
		    }}
		  </AuthContext.Consumer>
		)
	}
}




	
			