<template>
  <div class="header">
      <ul class="header-button-left">
        <li>Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li v-if="step === 1" @click="step++">Next</li>
        <li v-if="step === 2" @click="publish">발행</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>
    <PostContainer @write="write = $event" :uploadImage="uploadImage" :postdata="postdata" :step="step" />
    <button @click="more" v-if="step === 0">더 보기</button>
    <div class="footer">
      <ul class="footer-button-plus">
        <input :url="url" @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile" />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>

</template>

<script>
import PostContainer from './components/PostContainer'
import postdata from './assets/postdata.js'
import axios from 'axios'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      step : 0,
      postdata,
      moreBtn : 0,
      uploadImage : '',
      write: '',
      selectedFilter:'',
      카운터 : 0
    }
  },
  computed: {
    ...mapState(['name', 'age', 'likes'])
  },
  mounted(){
    this.emitter.on('filterOn', (a)=> {
      this.selectedFilter = a
    })
  },
  methods:{
    ...mapMutations(['ageChange']),
    now(){
      return new Date();
    },
    publish(){
      let myPost = {
        name: "inseok Park",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.uploadImage,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.write,
        filter: this.selectedFilter
      };
      this.postdata.unshift(myPost);
      this.step = 0;
    },
    more(){
      axios.get(`https://codingapple1.github.io/vue/more${this.moreBtn}.json`)
      .then((res) => {
        console.log(res.data);
        this.postdata.push(res.data);
        this.moreBtn++
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    upload(e){
      let file = e.target.files
      console.log(file[0]);
      let url = URL.createObjectURL(file[0]);
      console.log(url);
      this.uploadImage = url
      this.step = 1;
    }
  },
  components: {
    PostContainer,
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
