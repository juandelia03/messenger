<template>
  <div class="wrapper">
    <div class="login">
      <h1 class="title">Login</h1>
      <div class="form">
        <input class="txt" type="text" placeholder="username" v-model="user" />
        <input class="txt" type="text" placeholder="email" v-model="email" />
        <input class="txt" type="password" placeholder="password" v-model="password" />
        <button @click="login">Login</button>
        <router-link to="/register" class="link">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/app";
import auth from "firebase/auth";
import firestore from "firebase/firestore";
import router from "vue-router";
export default {
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const user = ref("");
    const email = ref("");
    const password = ref("");
    const store = inject("store");
    let emailComp = "";
    const login = () => {
      const db = firebase.firestore();
      const ref = db.collection("users").doc(user.value);
      ref
        .get()
        .then((doc) => {
          emailComp = doc.data().email;
        })
        .then(() => {
          if (emailComp == email.value) {
            firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value)
              .then(() => {
                store.state.logged = true;
                store.state.currentUser = user.value;
                router.push("/");
              });
          }
        });
    };
    return { store, email, password, login, user };
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5ddd5;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: whitesmoke;
  width: 800px;
  height: 800px;
}
.title {
  margin-top: 150px;
}
.form {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.txt {
  margin-top: 20px;
  padding: 0px 10px;
  outline: none;
  border: none;
  width: 300px;
  height: 50px;
  border-radius: 5px;
  font-size: 18px;
}
button {
  font-size: 18px;
  margin-top: 20px;
  height: 50px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: #14b9a9;
  cursor: pointer;
}
.link {
  padding-top: 20px;
  margin: auto;
}
</style>
