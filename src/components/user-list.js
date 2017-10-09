import React, { Component } from 'react';
import { Message, Icon, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import UserCard from './user-card';

@observer
class UserList extends Component {

  componentDidMount() {
    this.props.store.fetchAll();
  }

  render() {
    const { entities:users, loading, errors, deleteOne } = this.props.store;
    const messages = errors.messages ? errors.messages.toJS() : [];

    const errorMessages = (
      <Message negative header={errors.global} list={messages.reverse()}/>
    )

    const cards = () => {
      return users.map((user) => {
        return (
          <UserCard key={user._id} user={user} deleteUser={deleteOne}/>
        )
      });
    }

    const fetchingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one moment</Message.Header>
           We are fetching that content for you.
       </Message.Content>
      </Message>
    )

    const emptyMessage = (
      <Message icon info>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>No User Found</Message.Header>
           <span>Add some new user to get started..</span>
          <Link to={'/users/new'} className="ui button primary right floated">Add New User</Link>
       </Message.Content>
      </Message>
    )

    const userCards = (
      <Card.Group>
        {cards()}
      </Card.Group>
    )

    return (
      <div>
        { loading && fetchingMessage }
        { users.length === 0 && !loading  && !errors.global && emptyMessage }
        { errors.global && errorMessages}
        { userCards }
      </div>
    )
  }
}

export default UserList;
