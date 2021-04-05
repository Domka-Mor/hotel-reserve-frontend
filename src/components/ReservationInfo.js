import React from 'react';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import AuthContext from '../auth-context';

const ReservationInfo = props =>  (
	 <AuthContext.Consumer>
	 {context => {
	return (
		<div className='booknow' id='reservation'>
			<Banner title='reservation'>
					{context.token && (                  
                        <Link to="/rooms" className='btn-main'>Make a Booking</Link>
                  )}
					{!context.token && (                  
                        <Link to="/auth" className='btn-main'>Make a Booking</Link>
                  )}
			</Banner>
		</div>
	)
}}
 </AuthContext.Consumer>
)

export default ReservationInfo;