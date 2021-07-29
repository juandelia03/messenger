<template>
  <div class="preview">
    <img
      src="https://www.hola.com/imagenes/estar-bien/20201005176621/perro-husky-raza-perro-lobo/0-874-229/husky-m.jpg"
      alt=""
      class="chat-img"
    />
    <div class="last-msg">
      <p class="name">PUNTO FC</p>
      <p class="msg">Nachito: Mañana jugamos</p>
    </div>
    <div class="time-div">
      <p class="time">1:38 pm.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "preview",
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
</style>
