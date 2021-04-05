import React, {useEffect} from 'react'
import InfoText from './InfoText';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Kontakt() {

	useEffect(() => {
		Aos.init({duration: 2000});
	}, []);

	return (
		<>
		<section className='kontakt' id='about'>
			<div className='wrapper-about'>
				<div>
					<InfoText/>
				</div>
				<div className='wrapper-info'>
					<h3 data-aos="fade-left">The Beach Resort offers the best in order to obtain the maximum level of customer satisfaction, which is the company’s pillar.</h3>
					<h5 data-aos="fade-left">To achieve this, we have an excellent team of professionals who are qualified and committed to ensuring that customers have a great experience during their stay, whether for business or while on vacation.</h5>
				</div>
			</div>
		</section>
		</>
	)
}