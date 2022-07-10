<template>
  <div @click="fire" :class="`${Filter} filter-item`" :style="`background-image : url(${uploadImage}`">
    {{Filter}}
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  methods:{
    fire(){
      this.emitter.emit('filterOn', this.Filter)
    }
  },
  props:{
    uploadImage : String,
    Filter : String
  }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>