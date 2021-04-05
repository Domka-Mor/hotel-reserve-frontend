import React from 'react';
import EventItem from './EventItem';
import './EventList.css';

const eventList = props => {
  const events =  props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        roomName={event.roomName}
        price={event.price}
        dateStart={event.dateStart}
        dateEnd={event.dateEnd}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });
  return (
  <div>
  <ul className="event__list">{events}</ul>
  </div>)
};

export default eventList;