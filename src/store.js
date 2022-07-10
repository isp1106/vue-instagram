import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "kim",
      age: 20,
      likes: 30,
      likeClicked: false,
    };
  },
  mutations: {
    ageChange(state, data) {
      state.age += data;
    },
    likeUp(state) {
      if (state.likeClicked === false) {
        state.likes++;
        state.likeClicked = true;
      } else {
        state.likes--;
        state.likeClicked = false;
      }
    },
  },
});

export default store;
