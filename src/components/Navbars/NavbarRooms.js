import React from 'react';
import AuthContext from '../../auth-context';
import {Link} from 'react-router-dom';


export default class NavbarRooms extends React.Component {

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
				                <div className='pt-2'>	
				                	<ul className={this.state.isOpen?
										'nav-links show-nav':'nav-min nav-links1'}>	
											<li>
						                    	<Link to='/' className="logo text" onClick={this.handleToggle}>
						                        	<h4>BR</h4>
						                        </Link>
						                    </li>    			                    										  				             				                   				                         
							            {context.token && (               
								            <Link to='/bookings' onClick={this.handleToggle}>Bookings</Link>							                
							            )}							            							           
										{!context.token && (
							                  <Link to='/auth'>
							                    <button className='nav-text' onClick={() => {context.login(); this.handleToggle();}}>Login</button>
							                  </Link>
							            )}
										{context.token && (
							                  <Link to='/'>
							                    <button className='nav-text' onClick={() => {context.logout(); this.handleToggle();}}>Logout</button>
							                  </Link>
						                )}
				                	</ul>
				            	</div>
			       	 		</nav>
						</div>

			       		<div className='d-none d-lg-block py-3'>
							<nav className="navbar navbar-expand-lg fixed-top">									
								<ul className="navbar-nav mr-auto">	
									<li>
				                    	<Link to='/' className="logo nav-item">
				                        	<h4>BR</h4>
				                      	</Link>
				                    </li>			                    										  				             				            			                    										  				             				                   				                         						         
								</ul>
								<span className="navbar-text">
									{context.token && (               
							            <Link to='/bookings' className='text'>Bookings</Link>
						            )}							            							           
									{!context.token && (
						                <Link to='/auth'>
						                   <button className='nav-text' onClick={() => {context.login();}}>Login</button>
						                </Link>
						            )}
									{context.token && (
					                  	<Link to='/'>
					                    	<button className='nav-text' onClick={() => {context.logout();}}>Logout</button>
					                  	</Link>
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