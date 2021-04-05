import React from 'react';
import {BsFillEnvelopeOpenFill,BsGeoAlt,BsFillBellFill} from "react-icons/bs";
import Fade from 'react-reveal/Fade';

export default class InfoText extends React.Component {

	constructor(props) {
    super(props);
    this.state = 
    { 
    show1: false,
    show2: false,
    show3: false
     };
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
  	}

  	handleClick1() {
    	this.setState({ show1: !this.state.show1 });
  	}

  	handleClick2() {
    	this.setState({ show2: !this.state.show2 });
  	}

  	handleClick3() {
    	this.setState({ show3: !this.state.show3 });
  	}


	render() {
	return (
		<>
	  		<div className='itext'>
	  			<button
		          className="btnInfo my-5"
		          type="button"
		          onClick={this.handleClick1}
		        >
	          		{ this.state.show1 ? <span className='itext span'><BsGeoAlt/></span> : 
	          		<span className='itext span'><BsGeoAlt/></span>}
        		</button>
	  			<Fade right cascade when={this.state.show1}>
					<article className='itext article'>
						<h6>Address : </h6>
						<p>955 Coast Highway,<br/> Queensland 4221</p>
					</article>
				</Fade>
			</div>
			<div className='itext'>
				<button
		          className="btnInfo my-5"
		          type="button"
		          onClick={this.handleClick2}
		        >
		        	{ this.state.show2 ? <span className='itext span'><BsFillBellFill/></span> : 
	          		<span className='itext span'><BsFillBellFill/></span>}
        		</button>
	  			<Fade right cascade when={this.state.show2}>
					<article className='itext article'>
						<h6>Phone : </h6>
						<p>07 5525 5000</p>
					</article>
				</Fade>
			</div>
			<div className='itext'>
				<button
		          className="btnInfo my-5"
		          type="button"
		          onClick={this.handleClick3}
		        >
		        	{ this.state.show3 ? <span className='itext span'><BsFillEnvelopeOpenFill/></span> : 
	          		<span className='itext span'><BsFillEnvelopeOpenFill/></span>}
        		</button>
        		<Fade right cascade when={this.state.show3}>
					<article className='itext article'>
						<h6>Email : </h6>
						<p>info@beach-resort.com.au</p>
					</article>
				</Fade>
			</div>
		</>
	)
}
}