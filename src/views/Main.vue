<template>
  <div class="main">
    <div class="container">
      <div class="side">
        <div class="section-1">
          <i class="fas fa-search"></i>
          <img
            src="https://leaderreaderjournal.com/wp-content/uploads/2021/01/dog.jpg"
            alt=""
            class="profile-pic"
          />
        </div>
        <div class="input-cont">
          <input
            type="text"
            class="chat-search"
            placeholder="Search for a chat or start a new one"
          />
        </div>
        <div class="chat">
          <Preview v-for="user in users" :key="user.user" :name="user.user" />
        </div>
      </div>
      <div class="chat-room">
        <div class="friend">
          <img
            src="https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg"
            alt=""
            class="friends-pic"
          />
          <p class="name">User</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="srch"
            @click="input"
          >
            <path
              d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"
            />
          </svg>
          <input
            type="text"
            :class="{ 'magic-input': searching, 'magic-input2': notS }"
            v-if="hide == false"
          />
        </div>
        <div class="messages">
          <Message :me="false" />
          <Message :me="true" />
        </div>
        <div class="send">
          <input type="text" class="inp" placeholder="Write your message here" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase/app";
import auth from "firebase/auth";
import firestore from "firebase/firestore";
import Preview from "../components/preview.vue";
import Message from "../components/message.vue";
import { inject } from "vue";
export default {
  name: "Main",
  components: { Preview, Message },
  data() {
    return {
      searching: false,
      notS: true,
      hide: true,
      users: [],
    };
  },
  setup() {
    const store = inject("store");
    return { store };
  },
  methods: {
    input() {
      this.searching = !this.searching;
      this.notS = !this.notS;
      if (this.searching == false) {
        setTimeout(() => {
          this.hide = true;
        }, 450);
      } else {
        this.hide = false;
      }
    },
  },
  beforeMount() {
    const db = firebase.firestore();
    const usersRef = db.collection("users");
    if (this.store.state.logged == false) {
      this.$router.push("login");
    }
    usersRef.get().then((query) => {
      query.forEach((doc) => {
        this.users.push(doc.data());
      });
    });
  },
};
</script>
<style scoped>
.main {
  min-height: 100vh;
  background-color: #dddbd1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  height: 95vh;
  width: 80%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.side {
  display: flex;
  flex-direction: column;
  background: white;
  width: 450px;
  border-right: solid lightgray 1px;
}
.section-1 {
  display: flex;
  align-items: center;
  padding-left: 24px;
  min-height: 60px;
  background-color: #f6f6f6;
  border-bottom: solid;
  border-color: lightgray;
  border-width: 1px;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 25px;
}
.input-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f6f6;
  border-bottom: solid;
  border-color: lightgray;
  border-width: 1px;
  min-height: 50px;
}
.chat-search {
  width: 74%;
  height: 35px;
  border-radius: 25px;
  outline: none;
  border: none;
  padding: 0px 40px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuMTcyIDI0bC03LjM4Ny03LjM4N2MtMS4zODguODc0LTMuMDI0IDEuMzg3LTQuNzg1IDEuMzg3LTQuOTcxIDAtOS00LjAyOS05LTlzNC4wMjktOSA5LTkgOSA0LjAyOSA5IDljMCAxLjc2MS0uNTE0IDMuMzk4LTEuMzg3IDQuNzg1bDcuMzg3IDcuMzg3LTIuODI4IDIuODI4em0tMTIuMTcyLThjMy44NTkgMCA3LTMuMTQgNy03cy0zLjE0MS03LTctNy03IDMuMTQtNyA3IDMuMTQxIDcgNyA3eiIvPjwvc3ZnPg==");
  background-repeat: no-repeat;
  background-position: 10px 12px;
  background-size: 3%;
}
.chat {
  overflow-y: auto;
}
.chat::-webkit-scrollbar {
  width: 0px;
}
.chat-room {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.friends-pic {
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-left: 20px;
}
.friend {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f6f6f6;
  height: 60px;
  align-self: stretch;
}
.name {
  margin-left: 20px;
}
.srch {
  margin-left: auto;
  margin-right: 50px;
  fill: #a8a8a8;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.messages {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #e5ddd5;
  overflow-y: auto;
  padding: 50px;
}
.send {
  display: flex;
  justify-content: center;
  align-items: center;
  background: beige;
  height: 65px;
  background-color: #f6f6f6;
}
.messages::-webkit-scrollbar {
  width: 0%;
}
.inp {
  height: 42px;
  width: 80%;
  border-radius: 25px;
  outline: none;
  border: none;
  padding: 0px 20px;
}
.magic-input {
  margin-right: 30px;
  width: 200px;
  animation: magic;
  animation-duration: 0.7s;
  outline: none;
  border: none;
  border-radius: 20px;
  height: 30px;
  padding: 0px 12px;
  border: lightgray 1px solid;
}
.magic-input2 {
  display: block;
  margin-right: 30px;
  width: 0px;
  visibility: none;
  animation: magic2;
  animation-duration: 0.5s;
  outline: none;
  border: none;
  border-radius: 20px;
  height: 30px;
  padding: 0px 12px;
  border: lightgray 1px solid;
}
@keyframes magic {
  from {
    width: 0%;
    display: none;
  }
  to {
    width: 200px;
    display: block;
  }
}
@keyframes magic2 {
  from {
    width: 200px;
    display: block;
  }
  to {
    width: 0px;
    display: none;
    visibility: none;
  }
}
</style>
