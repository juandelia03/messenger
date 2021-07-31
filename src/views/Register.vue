<template>
  <div class="wrapper">
    <div class="login">
      <h1 class="title">Register</h1>
      <div class="form">
        <input class="txt" type="text" placeholder="username" v-model="username" />
        <input class="txt" type="text" placeholder="email" v-model="email" />
        <input class="txt" type="password" placeholder="password" v-model="password" />
        <button @click="register">Register</button>
        <router-link to="/login" class="link">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import auth from "firebase/auth";
import firestore from "firebase/firestore";
import router from "vue-router";
import { inject } from "vue";
export default {
  name: "Login",
  components: {},
  setup() {
    const store = inject("store");
    return { store };
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  mounted() {
    this.$emit("test");
  },
  methods: {
    async register() {
      let everyUser = [];
      const db = firebase.firestore();
      const userObject = {
        user: this.username,
        email: this.email,
        profilePic:
          "https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg",
      };
      const usersRef = db.collection("users");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          usersRef
            .get()
            .then((query) => {
              query.forEach((doc) => {
                everyUser.push(doc.data().user);
              });
            })
            .then(() => {
              if (everyUser.indexOf(this.username) == -1) {
                db.collection("users").doc(this.username).set(userObject);
                this.store.state.logged = true;
                this.store.state.currentUser = this.username;
                this.$router.push("/");
              } else {
                console.log("username already taken or missing data");
              }
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
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
