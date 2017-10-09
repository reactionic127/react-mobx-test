import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

class Form extends MobxReactForm {

  store = null;

  constructor(fields, plugins, store) {
    super(fields,plugins);
    this.store = store;
  }
}

export default function createForm(fields, store){
  const hooks = {
    onSuccess(form) {
      const store = this.store;
      if(store.entity._id){
        store.update(store.entity._id, form.values())
      }
      else {
        store.create(form.values())
      }
    },
    onError(form) {
      console.log('All form errors', form.errors());
    }
  }
  const plugins = { dvr: validatorjs };
  return new Form({fields}, {plugins, hooks}, store);
}
