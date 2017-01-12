<template>
  <div>
  </div>
</template>
<script>
// import Compname from 'components/Compname.vue'

export default {
  // componenents: {compname: Compname},
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
      dataLoading: false
    }
  },
  methods: {
    getData: function () {
      this.data = []
      this.http.get(this.endpoint)
        .then(function (res) {
          this.data = res.body.resource
        })
        .catch(function () {
          // catch error
        })
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