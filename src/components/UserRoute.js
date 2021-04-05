import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../auth-context';


export default class UserRoute extends React.Component {

	static contextType = AuthContext;

	render() {

		const Component = this.props.component;
		const isAuthenticated = this.context.login;

		return (
			isAuthenticated ? 
	      	(<Component />) 
	      	:   
	      	(<Redirect to={{ pathname: '/auth' }} />)
		)
	}
}