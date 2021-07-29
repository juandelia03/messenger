<template>
  <div class="wrapper">
    <div class="login">
      <h1 class="title">Register</h1>
      <div class="form">
        <input class="txt" type="text" />
        <input class="txt" type="password" />
        <button>Register</button>
        <router-link to="/login" class="link">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
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
