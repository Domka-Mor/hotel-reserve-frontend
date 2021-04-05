import React from 'react';
import Title from '../Title';
import {FaCocktail,FaPizzaSlice,FaShuttleVan, FaUmbrellaBeach} from 'react-icons/fa';
import ServiceImages from './ServiceImages';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class Services extends React.Component {

	state={
		services: [
		 {
		 	icon:<FaCocktail/>,
		 	title:'free cocktails',
		 	info: 'All guests can enjoy free drinks and snacks at our bars all day long.'
		 },
		 {
		 	icon:<FaPizzaSlice/>,
		 	title:'Ultra all inclusive',
		 	info: 'For our guests, food is available 24 hours in 6 restaurants.'
		 },
		 {
		 	icon:<FaShuttleVan/>,
		 	title:'Free taxi',
		 	info: 'We provide free airport shuttle and transport to nearest town.'
		 },
		 {
		 	icon:<FaUmbrellaBeach/>,
		 	title:'Hotel on the beach',
		 	info: 'The hotel is located directly on a private beach with hotel bars.'
		 }
		]
	}

	componentDidMount(){
	    AOS.init({
	      duration : 2000
	    })
	  }

	render() {
		return (
			<>
				<section className='services'>
					<Title title='services'/>
					<div className='services-center'>
						{this.state.services.map((item,index) => {
							return (
								<div className='service-hover' key={index}>
								<article key={index} className='service' data-aos='fade-up'>
									<span>{item.icon}</span>
									<h6>{item.title}</h6>
									<p>{item.info}</p>
								</article>
								</div>
							);
						})}
					</div>
				</section>
				<section data-aos="zoom-in">
					<ServiceImages/>
				</section>
			</>
		)
	}
}