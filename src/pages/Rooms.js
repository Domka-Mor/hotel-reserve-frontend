import React from 'react';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import RoomContainer from '../components/RoomsContainer/RoomContainer';
import VideoRooms from '../components/VideoBanners/VideoRooms';
import NavbarRooms from '../components/Navbars/NavbarRooms';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";



export default class Rooms extends React.Component {


   render() {
	return (
		<>
		<NavbarRooms/>
		<VideoRooms>
			<Banner title='our rooms'>
				<Link to='/' className='btn-main'>
					return home
				</Link>
			</Banner>
		</VideoRooms>
		<RoomContainer/>
		<ScrollUpButton style={{background: 'var(--primaryColor)', outline:'none'}}/>
		</>
	)
}
}

