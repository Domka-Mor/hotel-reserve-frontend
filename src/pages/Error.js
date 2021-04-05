import React from 'react';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';




export default function Error() {
	return (
		
			<Banner title='404' subtitle='page not found'>
				<Link to='/' className='btn-main'>
					return home
				</Link>
			</Banner>
		
	)
}