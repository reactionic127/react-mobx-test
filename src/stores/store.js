import { observable, action, runInAction } from 'mobx';
import _ from 'lodash';

class Store {
  @observable errors = {};
  @observable entity = {};
  @observable entities = [];
  @observable loading = false;
  @observable redirect = false;

  startAsync = () => {
    this.loading = true;
    this.errors = {};
  }

  @action
  newEntity = () => {
    this.entity = {};
    this.errors = {};
  }
  
  @action
  resetRedirect() {
    this.redirect = false;
  }

  @action
  handleErrors = (err) => {
    if( err.code === 400) {
      let messages = [];
      _.each(err.errors, (value, key) => {
        messages.push(value.message);
      })
      this.errors = {global: err.message, messages}
    } else {
      this.errors = {global: err.message}
    }
    this.loading = false;
  }

  @action
  fetchAll = async() => {
    this.startAsync();
    try{
      runInAction('populate entities', () => {
        this.entities = this.entities;
        this.loading = false;
      });
    } catch(err) {
        this.handleErrors(err);
    }
  }

  @action
  fetch = async(_id) => {
    this.startAsync();
    try {
      let response = this.entity
      this.entities.map((value, index) => {
        if (value._id === _id) {
          response = value
        }
        return true
      });
      runInAction('entity fetched', () => {
        this.entity = response;
        this.loading = false;
      })
    } catch(err) {
      this.handleErrors(err)
    }
  }

  @action
  create = async(entity) => {
    this.startAsync();
    try{
      await setTimeout(()=>{}, 1000)
      runInAction('entity created', () => {
        this.entities.push(entity);
        this.redirect = true;
        this.loading = false;
      });
    } catch(err) {
        this.handleErrors(err);
    } finally {
      this.resetRedirect();
    }
  }

  @action
  update = async(_id, entity) => {
    this.startAsync();
    try{
      await setTimeout(()=>{}, 1000)
      runInAction('entity updated', () => {
        this.entities = this.entities.map(item => item._id === _id ? entity : item);
        this.redirect = true;
        this.loading = false;
      })
    } catch(err) {
      this.handleErrors(err)
    } finally {
      this.redirect = false;
    }
  }

  @action
  deleteOne = async(_id) => {
    try {
      runInAction('entity deleted', () => {
        this.entities = this.entities.filter(item => item._id !== _id)
      })
    }
    catch(err) {
      this.handleErrors(err)
    }
  }
}

export default Store;
