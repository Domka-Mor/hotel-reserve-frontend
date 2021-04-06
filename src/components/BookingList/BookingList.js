import React from 'react';
import loadingGif from '../../images/gif/loading-arrow.gif';
import './BookingList.css';

const bookingList = props => (
  <>   
    {props.bookings.length > 0 ?
      (
        <div>
          <h1 className='bookings-title'>Your reservations :</h1>
          <ul className="bookings__list">
            {props.bookings.map(booking => {
              return (
                <li key={booking._id} className="bookings__item">
                  <div className="bookings__item-data">
                    <h3>{booking.event.roomName}</h3>
                    <h5><span>Arrival :</span> {new Date(booking.event.dateStart).toLocaleDateString()}</h5>
                    <h5><span>Departure :</span> {new Date(booking.event.dateEnd).toLocaleDateString()}</h5>
                    <h6 className='date-booked'>Booked at : {new Date(booking.createdAt).toLocaleDateString()}</h6>            
                  </div>
                  <div className="bookings__item-actions">
                    <button className="btn-booking" onClick={props.onDelete.bind(this, booking._id)}>Cancel</button>
                  </div>
                </li>
              )
            })}    
          </ul>
        </div>
      )
      :
      (
        <div className='bookings-div'>
          <h4 className='bookings-info text-center'>No bookings available</h4>
          <img src={loadingGif} alt=''/>
        </div>
      )
    }
  </>
);

export default bookingList;
