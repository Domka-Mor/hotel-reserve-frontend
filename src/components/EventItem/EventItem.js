import React from 'react';
import './EventItem.css';

const eventItem = props => (
  <div className='event-item'>
    <li key={props.eventId} className="events__list-item">
       <div>
          <h3>Booking details</h3>
          <h6><span>Room :</span> {props.roomName}</h6>
          <h6><span>Arrival :</span> {new Date(props.dateStart).toLocaleDateString()}</h6>
          <h6><span>Departure :</span> {new Date(props.dateEnd).toLocaleDateString()}</h6>
       </div>
      <div>
          <button className="button-booking" onClick={props.onDetail.bind(this, props.eventId)}>
            Confirm
          </button>
      </div>
    </li>
  </div>
);

export default eventItem;