<template>
  <NavigationBar/>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
  }
}
</script>

<style>

</style>
