import { createStore } from 'vuex';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/base';

const mutations = {
  signInUser(state, payload) {
    state.user = payload;
  },
  signOutUser(state) {
    state.user = null;
  },
  setUser(state, payload) {
    state.user = payload;
  },
};

const actions = {
  signInUser(context, payload) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;
          context.commit('signInUser', user);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  signOutUser(context) {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          context.commit('signOutUser');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setUser(context, payload) {
    context.commit('setUser', payload);
  },
};

const getters = {
  getAppTitle(state) {
    return state.appTitle;
  },
  isUserAuthenticated(state) {
    return state.user !== null;
  },
};

const state = () => {
  return {
    appTitle: 'Activities',
    user: auth.currentUser,
  };
};

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {},
});
