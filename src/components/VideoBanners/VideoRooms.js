import React from 'react';
import Izba from '../../images/Video/izba.mp4';



export default function VideoRooms({children}) {
	return (
		<div>
			<video loop autoPlay muted className='backgroundVideo'>
			  <source src={Izba} type='video/mp4'/>
			  Your browser does not support the video tag.
			</video>
			{children}
		</div>
	)
}