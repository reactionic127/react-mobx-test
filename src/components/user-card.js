import React from 'react';
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function UserCard({user, deleteUser}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          Name: {user.name}
        </Card.Header>
        <Card.Description>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/users/edit/${user._id}`} className="ui basic button green">Edit</Link>
          <Button basic color="red" onClick={() => deleteUser(user._id)} >Delete</Button>
        </div>
      </Card.Content>
    </Card>
  )
}
