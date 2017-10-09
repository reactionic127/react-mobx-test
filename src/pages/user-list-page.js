import React, { Component } from 'react';
import UserList from '../components/user-list';
import { inject } from 'mobx-react';

@inject("stores")
class UserListPage extends Component {
  render() {
    return (
      <div>
        <h1>List of Users</h1>
        <UserList store={this.props.stores.userStore} />
      </div>
    )
  }
}

export default UserListPage;
