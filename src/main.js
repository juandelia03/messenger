import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
var firebaseConfig = {
  apiKey: "AIzaSyA1tWqFGuounDj8vtGYT1GkY39qNEsS8q0",
  authDomain: "vue-chat-c6218.firebaseapp.com",
  databaseURL: "https://vue-chat-c6218-default-rtdb.firebaseio.com",
  projectId: "vue-chat-c6218",
  storageBucket: "vue-chat-c6218.appspot.com",
  messagingSenderId: "414010784857",
  appId: "1:414010784857:web:29e49f2f81c1dccf90c548",
};
firebase.initializeApp(firebaseConfig);
createApp(App).use(router).mount("#app");
