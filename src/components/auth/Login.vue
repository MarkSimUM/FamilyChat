<template>
 <div class="layout-padding">
        <h1>Sign in</h1>
        <button class="primary" @click="signIn()">Sign in with Google</button>
        <button class="secondary" @click="signOut()">Sign Out</button>
        <p>logged in: {{loggedIn}}</p>
        <p>userinfo: {{userinfo1}}</p>


</div>
</template>
<script>
// import Compname from 'components/Compname.vue'
import Vue from 'vue'
export default {
  componenents: {Vue: Vue},
  computed: {
    userinfo1 () {
      console.log('getAuth() ', Vue.auth.getAuth())
      return Vue.auth.getAuth()
    },
    loggedIn () {
      return Vue.auth.loggedIn()
    }
  },
  created: function () {
    try {
      this.dataLoading = true
      // data.createList()
    }
    catch (err) {
      console.log(err)
    }
    finally {
      this.dataLoading = false
    }
  },
  /* props: ['propdata'], */
  data: function () {
    return {
      data: [],
      dataLoading: false,
      userinfo: {}
    }
  },
  methods: {
    signIn: function () {
      Vue.auth.signIn()
      this.userinfo = Vue.auth.userInfo
    },
    signOut: function () {
      Vue.auth.signOut()
    },
    getUser: function () {
      return Vue.auth.getAuth
    }
  }
  /*
  computed: {
    computeThis: function() {
       return this.item.toLowerCase()
    }
  } */
  /*
  watch: {
    endpoint: function () {
      this.data = []
    }
  }, */
  /*
  destroyed: function() {
    //  code here
  } */
}
</script>
<style scoped> 
</style> 