import React from 'react';
import VideoHome from '../components/VideoBanners/VideoHome';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Services/Services';
import AboutUs from '../components/About/AboutUs';
import CardCarousel from '../components/CardCarousel';
import Navbar from '../components/Navbars/Navbar';
import ReservationInfo from '../components/ReservationInfo';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Footer from '../components/Footer';


export default function Home(props) {
	return (
		<> 
			<Navbar/>
			<VideoHome>
				<Banner title='Beach Resort' subtitle='welcome to our website'>
					<Link to='/rooms' className='btn-main'>
					our rooms
					</Link>
				</Banner>
			</VideoHome>
			<Services/>
			<CardCarousel/>	
			<ReservationInfo/>				
			<AboutUs/>
			<ScrollUpButton EasingType="easeInBounce" style={{background: 'var(--primaryColor)', outline:'none'}}/>
			<Footer/>
		</>
	);
}