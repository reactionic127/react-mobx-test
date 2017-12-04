import remotedev from 'mobx-remotedev';
import Store from './store';

const userConfig = {
  name: 'Users Store',
  global: true,
  onlyActions: true,
  filters: {
    whitelist: /fetch|update|create|Event|entity|entities|handleErrors/
  }
};

const userStore = new Store();

const allStores = {
  userStore: remotedev(userStore, userConfig)
};

export default allStores;
