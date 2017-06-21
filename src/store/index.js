import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

/* eslint-disable */
const store = new Vuex.Store({
  state: {
    message: 'Hello, World!',
    newUser: {
      address: {
        city: '',
      }
    },
    users: [],
  },
  actions: {
    LOAD_USER_LIST: function ({ commit }) {
      axios.get('http://jsonplaceholder.typicode.com/users').then((response) => {
        commit('SET_USER_LIST', { list: response.data });
      }, (err) => {
        console.log(err);
      });
    },
    ADD_NEW_USER: function ({ commit, state }) {
      axios.post('http://jsonplaceholder.typicode.com/users', {
        name: state.newUser.name,
        email: state.newUser.email,
        address: {
          city: state.newUser.address.city,
        },
      }).then((response) => {
        commit('UPDATE_USERS', { newUser: response.data })
      }, (err) => {
        console.log(err)
      });
    },
  },
  mutations: {
    SET_USER_LIST: (state, { list }) => {
      state.users = list;
    },
    UPDATE_NEW_NAME: (state, name) => {
      state.newUser.name = name;
    },
    UPDATE_NEW_EMAIL: (state, email) => {
      state.newUser.email = email;
    },
    UPDATE_NEW_CITY: (state, city) => {
      state.newUser.address.city = city;
    },
    CLEAR_NEW_USER: (state) => {
      state.newUser.name = '';
      state.newUser.email = '';
      state.newUser.address.city = '';
    },
    UPDATE_USERS: (state, { newUser }) => {
      state.users.push(newUser);
    },
  },
  getters: {
    userCount: state => {
      return state.users.length;
    },
  },
});
/* eslint-enable */

export default store;
