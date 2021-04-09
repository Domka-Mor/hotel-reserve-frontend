import React from 'react';
import {RoomContext} from '../context';
import {Link} from 'react-router-dom';
import Room from './Room';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Title from './Title';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};


export default class CardCarousel extends React.Component {

 static contextType = RoomContext

  render() {
    let {rooms} = this.context;

    


    return (
      <>
        <section className='roomscarousel' id='rooms'>
          <Link to='/rooms' className='links-title'>
            <Title title='our rooms'/>
          </Link>      
          <Carousel responsive={responsive}
                    swipeable={false}
                    infinite={true}
                    arrows={false}
                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={3000}                  
                    transitionDuration={3000}
          >
            {rooms = rooms.map(room => {
              return (
              <div className='cardslider-rooms' key={room.id}>
                <div className='cardslider-rooms-center'> 
                  <Room key={room.id} room={room}/>
                </div> 
              </div>
              )
            })}
          </Carousel>
          <div className='wrapper'>
            <h1 className='banner-text'></h1>          
          </div>   
        </section>       
      </>
    )
  }
}

