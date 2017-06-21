<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h2>Total Users: {{ userCount }}</h2>
    <ul>
      <div v-for="user in users">
        <h3>{{ user.name }}</h3>
        <p>{{ user.address.city }}</p>
        <a v-bind:href="'mailto:' + user.email">{{ user.email }}</a>
      </div>
    </ul>
    <form>
      <input :value="newUser.name" @input="updateName" type="text" />
      <input :value="newUser.email" @input="updateEmail" type="text" />
      <input :value="newUser.city" @input="updateCity" type="text" />
      <a @click="addUser">Add User</a>
    </form>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';

  export default {
    name: 'Hello',
    computed: {
      ...mapState([
        'message',
        'newUser',
        'users',
      ]),
      ...mapGetters([
        'userCount',
      ]),
    },
    methods: {
      addUser() {
        this.$store.dispatch('ADD_NEW_USER');
        this.$store.commit('CLEAR_NEW_USER');
      },
      updateName(e) {
        this.$store.commit('UPDATE_NEW_NAME', e.target.value);
      },
      updateEmail(f) {
        this.$store.commit('UPDATE_NEW_EMAIL', f.target.value);
      },
      updateCity(g) {
        this.$store.commit('UPDATE_NEW_CITY', g.target.value);
      },
    },
    mounted() {
      this.$store.dispatch('LOAD_USER_LIST');
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
