import React from 'react';
import Uvod from '../../images/Video/uvod.mp4';



export default function Video({children}) {
	return (
		<section>
			<video loop autoPlay muted className='backgroundVideo'>
			  <source src={Uvod} type='video/mp4'/>
			  Your browser does not support the video tag.
			</video>
			{children}
		</section>
	)
}

