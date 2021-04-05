import React,{useState} from 'react';
import ImagesSlides from './ImagesSlides';
import Pool from '../../images/Slide/pool.jpg';
import Pool4 from '../../images/Slide/pool4.jpg';
import Pool2 from '../../images/Slide/pool2.jpg';
import Lobby from '../../images/Slide/lobby.jpg';
import Roominfo from '../../images/Slide/roominfo.jpg';
import {FaChevronLeft,FaChevronRight} from "react-icons/fa";


export default function ServiceImages() {
	let sliderArr = [<ImagesSlides src={Pool}/>,<ImagesSlides src={Pool4}/>,<ImagesSlides src={Pool2 }/>,<ImagesSlides src={Lobby}/>,<ImagesSlides src={Roominfo}/>];

	const [x,setX] = useState(0);

	const goLeft = () => {
		x === 0 ? setX(- 100 * (sliderArr.length-1)) : setX(x+100);
	}
	const goRight = () => {
		x === - 100 * (sliderArr.length-1) ? setX(0) : setX(x-100);
	}


	return (
		<div className='slider'>
			{
				sliderArr.map((item,index) => {
					return (
						<div key={index} className='slide' style={{transform:`translateX(${x}%)`}} >
							{item}
						</div>
						)
				})
		    }
		    <button id='goLeft' onClick={goLeft}><FaChevronLeft className='icon'/></button>
		    <button id='goRight' onClick={goRight}><FaChevronRight className='icon'/></button>
		</div>				
	)
}