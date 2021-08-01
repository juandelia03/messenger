<template>
  <div class="main">
    <div class="container" v-if="ready == true">
      <div class="side">
        <div class="section-1">
          <i class="fas fa-search"></i>
          <img :src="profilePic" alt="" class="profile-pic" />
        </div>
        <div class="input-cont">
          <input
            type="text"
            class="chat-search"
            placeholder="Search for a chat or start a new one"
          />
        </div>
        <div class="chat">
          <Preview
            v-for="user in users"
            :key="user.user"
            :name="user.user"
            :img="user.profilePic"
            :selectedUser="selectedUser"
            @preview="select"
          />
        </div>
      </div>
      <div class="chat-room" v-if="selectedUser != ''">
        <div class="friend">
          <img :src="friendsPic" alt="" class="friends-pic" />
          <p class="name">{{ selectedUser }}</p>
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
          <Message
            v-for="message in messages"
            :key="message.id"
            :me="message.me"
            :msg="message.msg"
          />
        </div>
        <div class="send">
          <input
            type="text"
            class="inp"
            placeholder="Write your message here"
            v-model="msg"
            @keypress.enter="newMsg"
          />
        </div>
      </div>
      <div v-else class="empty"></div>
    </div>
    <div v-else>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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
      profilePic: "",
      selectedUser: "",
      friendsPic: "",
      msg: "",
      ready: false,
      messages: [],
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
    async select(e) {
      if (this.selectedUser != e) {
        this.messages = [];
        let mymsgs = [];
        let hismsgs = [];
        const db = firebase.firestore();
        const usersRef = db.collection("users").doc(e);
        usersRef
          .get()
          .then((doc) => {
            this.selectedUser = e;
            this.friendsPic = doc.data().profilePic;
          })
          .then(() => {
            const myMsgref = db
              .collection("users")
              .doc(this.store.state.currentUser)
              .collection("sentTo")
              .doc(this.selectedUser);
            myMsgref.get().then((doc) => {
              mymsgs = doc.data().msgs.map((e) => {
                mymsgs.push({ ...e, me: true });
                this.messages.push({ ...e, me: true });
              });
            });
          })
          .then(() => {
            const hisMsgref = db
              .collection("users")
              .doc(this.selectedUser)
              .collection("sentTo")
              .doc(this.store.state.currentUser);
            hisMsgref.get().then((doc) => {
              hismsgs = doc.data().msgs.map((e) => {
                hismsgs.push({ ...e, me: false });
                this.messages.push({ ...e, me: false });
              });

              this.messages.sort((a, b) => {
                return a.id - b.id;
              });
            });
          });
      }
    },
    async newMsg() {
      if (this.msg != "") {
        const msg = this.msg;
        this.msg = "";
        const today = new Date();
        const id = today.valueOf();
        const time = String(today.getHours()) + ":" + today.getMinutes();
        const db = firebase.firestore();
        const ref = db
          .collection("users")
          .doc(this.store.state.currentUser)
          .collection("sentTo")
          .doc(this.selectedUser);
        ref.get().then((doc) => {
          if (doc.data() == undefined) {
            ref
              .set({
                msgs: firebase.firestore.FieldValue.arrayUnion({ msg: msg, time: time, id: id }),
              })
              .then(() => {
                this.msg = "";
              });
          } else {
            ref
              .update({
                msgs: firebase.firestore.FieldValue.arrayUnion({ msg: msg, time: time, id: id }),
              })
              .then(() => {
                this.msg = "";
              });
          }
        });
      }
    },
  },
  beforeMount() {
    console.log(this.store.state.currentUser);
    const db = firebase.firestore();
    const usersRef = db.collection("users");
    if (this.store.state.logged == false) {
      this.$router.push("login");
    }
    usersRef.get().then((query) => {
      query.forEach((doc) => {
        if (doc.data().user != this.store.state.currentUser) {
          this.users.push(doc.data());
        } else {
          this.profilePic = doc.data().profilePic;
          this.ready = true;
        }
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
.empty {
  background: #e5ddd5;
  flex: 1;
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
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
