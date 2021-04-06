import React from 'react';
import Uvod from '../../images/Video/uvod.mp4';
import pool2 from '../../images/Slide/pool2.jpg';


export default function Video({children}) {
	return (
		<section>
			<video loop autoPlay muted playsInline poster={pool2} className='backgroundVideo'>
			  <source src={Uvod} type='video/mp4'/>
			  Your browser does not support the video tag.
			</video>
			{children}
		</section>
	)
}

