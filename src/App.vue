<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">

    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        Family Chat
      </q-toolbar-title>
      <q-drawer-link icon="account_circle" to="/login">Sign in</q-drawer-link>
      <button @click="$refs.rightDrawer.open()">
        <i>assignment</i>
      </button>
      <button @click="$refs.layoutModal.open()">
        <i>assignment</i>
      </button>
      
    </div>
 
  
    <router-view class="layout-view"></router-view>

    <!-- Left side Drawer -->
  <q-drawer ref="leftDrawer">
    <div class="list platform-delimiter">
      <div class="list-header">
        Left Side Drawer
      </div>
      <q-drawer-link icon="account_circle" to="/login">Sign in</q-drawer-link>
      <q-drawer-link icon="exit_to_app" to="/login">Sign out</q-drawer-link>

      <q-drawer-link icon="home" to="/">HOME</q-drawer-link>
     
    </div>
  </q-drawer>
  <q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Right-side Drawer
        </q-toolbar-title>
      </div>

      <p style="padding: 25px;" class="text-grey-7">
        This is yet another Drawer that does not gets displayed alongside content on
        bigger screens.
      </p>
    </q-drawer>

<q-modal ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-layout>
        <div slot="header" class="toolbar">
          <button @click="$refs.layoutModal.close()">
            <i>keyboard_arrow_left</i>
          </button>
          <q-toolbar-title :padding="1">
            Header
          </q-toolbar-title>
        </div>

        <div slot="header" class="toolbar primary">
          <q-search class="primary"></q-search>
        </div>

        <div slot="footer" class="toolbar">
          <q-toolbar-title :padding="1">
            Footer
          </q-toolbar-title>
        </div>

        <div class="layout-view">
          <div class="layout-padding">
            <h1>Modal</h1>
            <button class="primary" @click="$refs.layoutModal.close()">Close</button>
            <p class="caption" v-for="n in 15">This is a Modal presenting a Layout.</p>
          </div>
        </div>
      </q-layout>
    </q-modal>

      



 </div>
</template>

<script>
/*
 * Root component
 */
export default {
}
</script>

<style></style>
