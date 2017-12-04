import React from 'react';
import { observer } from 'mobx-react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from '../forms/input-field';

@observer
class UserForm extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    const {user} = nextProps;
    this.props.form.update(user);
  }

  onChange() {

  }

  render() {
    const { form } = this.props;
    const { redirect, loading, errors, entity: user } = this.props.store;
    const messages = errors.messages ? errors.messages.toJS() : [];

    const errorMessages = (
      <Message negative header={errors.global} list={messages.reverse()} />
    );

    const userForm = (
      <Form onSubmit={form.onSubmit} loading={loading}>
        <InputField field={form.$('name')} />
        <InputField field={form.$('age')} />
        <InputField field={form.$('gender')} />
        <Button primary type="submit" onClick={form.onSubmit} disabled={form.isPristine}>Save User</Button>
      </Form>
    );

    const grid = (
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <h1 style={{marginTop: '1em'}}>{ user.id ? 'Edit User' : 'Add New User' }</h1>
            {errors.global && errorMessages }
            {userForm}
          </Grid.Column>
        </Grid>
      </div>
    );

    return (
      <div>
        { redirect ? <Redirect to="/" /> : grid }
      </div>
    );
  }
}

export default UserForm;
