<template>
  <div :class="{ me: meClass }">
    <div :class="{ 'bubble-friend': himClass, 'bubble-me': meClass }">
      <p class="main-txt" :style="highlight">{{ msg }}</p>
      <p class="time">{{ time }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    me: Boolean,
    msg: String,
    time: String,
    highlight: String,
  },
  data() {
    return {
      meClass: false,
      himClass: false,
    };
  },
  beforeMount() {
    if (this.me == false) {
      this.himClass = true;
    } else {
      this.meClass = true;
    }
  },
};
</script>

<style>
.bubble-friend {
  margin: 20px 0px;
  width: fit-content;
  max-width: 500px;
  display: flex;
  align-items: center;
  background: white;
  min-height: 35px;
  border-radius: 20px;
  overflow-wrap: unset;
  word-break: break-all;
}
.bubble-me {
  margin: 20px 0px;
  width: fit-content;
  max-width: 500px;
  display: flex;
  align-items: center;
  background: #dcf8c6;
  min-height: 35px;
  border-radius: 20px;
  overflow-wrap: unset;
  word-break: break-all;
}
.main-txt {
  margin: 10px 20px;
}
.me {
  display: flex;
  justify-content: flex-end;
}
.time {
  margin-top: auto;
  margin-bottom: 5px;
  margin-right: 15px;
  font-size: 12px;
  color: gray;
}
</style>
