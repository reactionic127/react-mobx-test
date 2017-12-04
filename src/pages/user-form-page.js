import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createForm from '../forms/form';
import UserForm from '../components/user-form';

@inject('stores') @observer
class UserFormPage extends Component {

  form = null;
  fields = {
    id: this.makeRandomId(),
    name: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter your name',
      rules: 'required|string'
    },
    age: {
      name: 'age',
      label: 'Age',
      placeholder: 'Enter your age',
      rules: 'required|string'
    },
    gender: {
      name: 'gender',
      label: 'Gender',
      placeholder: 'Enter gener',
      rules: 'required|string'
    }
  };

  constructor(props) {
    super(props);
    this.form = createForm(this.fields, this.props.stores.userStore);
  }

  makeRandomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { userStore: store } = this.props.stores;
    if (id) {
      store.fetch(id);
    } else {
      store.newEntity();
    }
  }

  render() {
    const { userStore: store } = this.props.stores;
    return (
      <div>
        <UserForm store={store} form={this.form} user={store.entity} />
      </div>
    );
  }
}

export default UserFormPage;
