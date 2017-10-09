import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import UserListPage from './pages/user-list-page';
import UserFormPage from './pages/user-form-page';

class App extends Component {
  render() {
		return (
		  <div>
				<div className="ui two item menu">
					<NavLink className="item" activeClassName="active" exact to="/">Users List</NavLink>
					<NavLink className="item" activeClassName="active" exact to="/users/new">Add User</NavLink>
			  </div>
				<Container>
					<Route exact path="/" component={UserListPage}/>
				  <Route path="/users/new" component={UserFormPage}/>
				  <Route path="/users/edit/:_id" component={UserFormPage}/>
			  </Container>
		  </div>
		);
  }
}

export default App;
