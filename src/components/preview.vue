<template>
  <div
    :class="{ selected: selec, preview: notselec }"
    @click="$emit('preview', name)"
    v-if="show == true || show == undefined"
  >
    <img :src="img" alt="" class="chat-img" />
    <div class="last-msg">
      <p class="name">{{ name }}</p>
    </div>
    <div class="time-div"></div>
  </div>
</template>

<script>
export default {
  name: "preview",
  props: {
    name: String,
    img: String,
    selectedUser: String,
    show: Boolean,
  },
  data() {
    return {
      back: {},
      selec: false,
      notselec: true,
    };
  },
  methods: {},
  watch: {
    selectedUser: function (newval, old) {
      if (newval == this.name) {
        this.notselec = false;
        this.selec = newval == this.selectedUser;
      } else {
        this.selec = false;
        this.notselec = true;
      }
    },
  },
};
</script>

<style scoped>
.preview {
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: solid;
  border-color: lightgray;
  border-width: 1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
.selected {
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: solid;
  border-color: lightgray;
  border-width: 1px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  background: #ebebeb;
}

.chat-img {
  width: 49px;
  height: 49px;
  border-radius: 25px;
  margin-left: 15px;
}
.last-msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 49px;
  margin-left: 20px;
}
.name {
  font-size: 17px;
  font-weight: 400;
}
.msg {
  font-size: 14px;
  font-weight: 400;
  color: #a4a4a4;
}
.time-div {
  height: 49px;
  display: flex;
  margin-left: auto;
  margin-right: 40px;
  margin-top: 7px;
}
.time {
  color: gray;
  font-weight: 300;
}
.preview:hover {
  background: #f5f5f5;
}
.preview-selected {
  background: #ebebeb;
}
</style>
