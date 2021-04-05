import React from 'react';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';
import NavbarSingleRoom from '../components/Navbars/NavbarSingleRoom';
import AuthContext from '../auth-context';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import moment from 'moment';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import EventList from '../components/EventItem/EventList';
import AOS from 'aos';
import 'aos/dist/aos.css';


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

export default class SingleRoom extends React.Component {

 
static contextType = AuthContext;

  isActive = true;

  constructor(props){
    super(props);
      this.roomNameElRef = React.createRef();
      this.priceElRef = React.createRef();
      this.dateStartElRef = React.createRef();
      this.dateEndElRef = React.createRef();
    this.state = {
      slug: this.props.match.params.slug,
      startDate: '',
      endDate: '',
      events: [],
      isLoading: false,
      creating: false,
      selectedEvent: null,
      inform: false
    }
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
    AOS.init({
        duration : 2000
      })
  }
   
  handleChangeStart(event)  {
        this.setState({
        startDate: event.target.value   
        }); 
    }
  handleChangeEnd(event) {
        this.setState({
        endDate: event.target.value 
        });
    }

  calculateDaysLeft(startDate, endDate) {
          if (!moment.isMoment(startDate)) startDate = moment(startDate);
          if (!moment.isMoment(endDate)) endDate = moment(endDate);
          return endDate.diff(startDate, "days");
  }



  fetchEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            events {
              _id
             roomName          
              dateStart
              dateEnd
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('https://hotel-reserve-back.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        if (this.isActive) {
          this.setState({ events: events, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
    }


  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false, inform: true});
    const roomName = this.roomNameElRef.current.value;
    const price = +this.priceElRef.current.value;
    const dateStart = this.dateStartElRef.current.value;
    const dateEnd = this.dateEndElRef.current.value;

    if (
      roomName.trim().length === 0 ||
      price <= 0 ||
      dateStart.trim().length === 0 ||
      dateEnd.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
          mutation CreateEvent($roomName: String!, $price: Float!, $dateStart: String!, $dateEnd: String!) {
            createEvent(eventInput: {roomName: $roomName, price: $price, dateStart: $dateStart, dateEnd: $dateEnd}) {
              _id
              roomName             
              dateStart
              dateEnd
              price
            }
          }
        `,
        variables: {
          roomName: roomName,
          price: price,
          dateStart: dateStart,
          dateEnd: dateEnd
        }
    };

    const token = this.context.token;

    fetch('https://hotel-reserve-back.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            roomName: resData.data.createEvent.roomName,
            dateStart: resData.data.createEvent.dateStart,
            dateEnd: resData.data.createEvent.dateEnd,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          });
          return { events: updatedEvents };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
    this.setState({inform:false});
  };

  bookEventHandler = () => {
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }
    const requestBody = {
      query: `
          mutation BookEvent($id: ID!) {
            bookEvent(eventId: $id) {
              _id
             createdAt
             updatedAt
            }
          }
        `,
        variables: {
          id: this.state.selectedEvent._id
        }
    };

    fetch('https://hotel-reserve-back.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ selectedEvent: null });
        this.props.history.push('/bookings');       
      })
      .catch(err => {
        console.log(err);
      });
  };

 
  componentWillUnmount() {
    this.isActive = false;
  }


  render() {
    return (
      <RoomContext.Consumer>
        {(roomContext) => {
        
        const {getRoom} = roomContext;
        const room = getRoom(this.state.slug);
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);

        if(!room) {
          return (
          <div className='container-error'>
            <div className='error'>
              <h3>no such room could be found...</h3>
              <Link to='/rooms' className='btn-main'>
                back to rooms
              </Link>
            </div>
          </div>
          )
        }


        const {name,description, capacity,size,price,extras,breakfast,pets,images} = room

        return (
          <>
            <NavbarSingleRoom/>
            <ScrollUpButton EasingType="easeInBounce" style={{background: 'var(--primaryColor)', outline:'none'}}/>
            <StyledHero img = {images[0]}>
              <Banner title={`${name} room`}>
                <Link to='/rooms' className='btn-main'>
                  back to rooms
                </Link>
              </Banner>
            </StyledHero>
            <section className='single-room'>
              <div className='single-room-images'>
                <Carousel responsive={responsive}
                        swipeable={true}
                        infinite={true}
                        transitionDuration={1000}
              >
                {images.map((item,index)=>{
                  return <img key={index} src={item} alt={name}/>;
                })}
                </Carousel>
              </div>
              <div className='single-room-info'>
                <article className='desc' data-aos="fade-left">
                  <h3>details</h3>
                  <p>{description}</p>
                </article>
                <article className='info' data-aos="fade-left">
                  <h3> Info </h3>
                  <h6> price : ${price}</h6>
                  <h6> size : {size} SQFT</h6>
                  <h6>
                    max capacity : {
                      capacity > 1 ? `${capacity} people` : `${capacity} person`
                    }
                  </h6>
                  <h6> {pets ? 'pets allowed' : 'no pets allowed'}</h6>
                  <h6> {breakfast && 'free breakfast included'} </h6>
                </article>
              </div>
            </section>
            <section className='extras'>
              <div className='room-extras' data-aos="fade-left">
                <h3> extras </h3>
                <ul>
                  {extras.map((item,index) => {
                    return <li key={index}> {item} </li>;
                  })}
                </ul>
              </div>
            </section>

            <section className='login'>

                  {!this.context.token && (                  
                    <Link to="/auth" className='btn-login'>    
                       Login
                    </Link> 
                  )}

                  {this.context.token && (                  
                    <div className="events-control">
                      <button className="btn-login" onClick={this.startCreateEventHandler}>
                        Book Now
                      </button>
                    </div> 
                  )}
            </section>

            <section>

              {(this.state.creating || this.state.selectedEvent) && <Backdrop />}

              {this.state.creating && (
                <Modal
                  canCancel
                  canConfirm
                  onCancel={this.modalCancelHandler}
                  onConfirm={this.modalConfirmHandler}
                  confirmText="Confirm"
                >
                  <form>
                      <div className='pb-4'>
                        <h3 className='text-center'>Room Details</h3>
                      </div>

                      <div className='pb-3 px-3'>                                                            
                        <h6><span>Room :</span> {name}</h6>                                                                     
                        <h6><span>Capacity :</span> {capacity}</h6>                                                                                            
                        <h6><span>Size :</span> {size} sqft.</h6>                                                                                              
                        <h6><span>Breakfast :</span> {breakfast === true ? `Included`: `Not Included`}</h6>                                                                                         
                        <h6><span>Pets :</span> {pets ===true ? `Allowed` : `Not Allowed`}</h6>                                                                                         
                      </div>
 
                      <div className='pb-3 px-3'>
                        <h6><span>Price per day :</span> ${price}</h6>
                        <h6><span>Number of days :</span> {daysLeft || "0"}</h6>                                     
                        <h6><span>Total Price :</span> ${daysLeft*price || "0"}</h6>
                      </div>

                      <div className='pb-3'>
                        <div className="visuallyhidden">
                         <label htmlFor="roomName">Room</label>
                          <input type="text" id="roomName" value={name} readOnly ref={this.roomNameElRef} />
                        </div>
                        <div className="visuallyhidden">
                          <label htmlFor="price">Price</label>
                          <input type="number" id="price" value={price} readOnly ref={this.priceElRef} />
                        </div>
                        <div className="modal-input">
                          <label htmlFor="dateStart">Arrival :</label>
                          <input type="datetime-local" id="dateStart" value={this.state.value} onChange={this.handleChangeStart} ref={this.dateStartElRef}/>
                        </div>
                        <div className="modal-input">
                          <label htmlFor="dateEnd">Departure :</label>
                          <input type="datetime-local" id="dateEnd" value={this.state.value} onChange={this.handleChangeEnd} ref={this.dateEndElRef} />
                        </div>
                      </div>                      
                  </form>
                </Modal>
              )}

              {this.state.selectedEvent && (
                <Modal
                  canConfirm
                  onConfirm={this.bookEventHandler}
                  confirmText='Confirm'
                >            
                  <h3 className='text-center'>Thank you for your reservation</h3>
                </Modal>
              )}

              {this.state.inform && (
                <div>
                  <EventList
                    events={this.state.events}
                    authUserId={this.context.userId}
                    onViewDetail={this.showDetailHandler}
                  />
                </div>
              )}               
            </section>
          </>
        )
        }}
      </RoomContext.Consumer>
    );
  }
}