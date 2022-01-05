<template>
  <div class="bodyContainer">
    <div class="container"
         :class="['container', { 'right-panel-active': active }]">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <div class="form"
             id="form1">
          <h2 class="form__title">注册</h2>
          <input type="text"
                 v-model="user.user_name"
                 placeholder="用户名"
                 class="input" />
          <input type="text"
                 v-model="user.invitation_code"
                 placeholder="邀请码"
                 class="input" />
          <input type="password"
                 v-model="user.password"
                 placeholder="密码"
                 class="input" />
          <button class="btn"
                  @click="handleSignUp">Sign Up</button>
        </div>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <div class="form"
             id="form2">
          <h2 class="form__title">登录</h2>
          <input type="text"
                 placeholder="用户名"
                 v-model="user.user_name"
                 class="input" />
          <input type="password"
                 placeholder="密码"
                 v-model="user.password"
                 class="input" />
          <!-- <a href="#" class="link">Forgot your password?</a> -->
          <button class="btn"
                  @click="handleSignIn">Sign In</button>
        </div>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn"
                    id="signIn"
                    @click="toggleSignInUp">Sign In</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn"
                    id="signUp"
                    @click="toggleSignInUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { Server, User } from '@/server/server';
export default defineComponent({
  name: 'Login',
  data: () => {
    return {
      user: {
        user_name: '',
        password: '',
        invitation_code: '',
      },
      active: false,
    };
  },
  methods: {
    handleSignIn() {
      Server(User.login, this.user)
        .then((res) => {
          sessionStorage.setItem('authorization', res.data.result.token);
          console.log(res.data);
          location.href = location.origin;
        })
        .catch((error) => {
          console.log(error);
          ElMessage({
            message: error.message,
            type: 'warning',
          });
        });
    },
    handleSignUp() {
      Server(User.register, this.user)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem('authorization', res.data.result.token);
        })
        .catch((error) => {
          ElMessage({
            message: error.message,
            type: 'warning',
          });
        });
      console.log('sign up');
    },
    toggleSignInUp() {
      this.active = !this.active;
    },
  },
});
</script>
<style lang="scss" scoped>
$white: #e9e9e9;
$gray: #333;
$blue: #0367a6;
$lightblue: #008997;

/* RADII */
$button-radius: 0.7rem;

/* SIZES */
$max-width: 758px;
$max-height: 420px;

// font-size: 16px;
// font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
// Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

.bodyContainer {
  align-items: center;
  background-color: $white;
  background: url('../../assets/img/bg3.jpg');
  /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。 */
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: $gray;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: $white;
  border-radius: $button-radius;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: $max-height;
  max-width: $max-width;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: $lightblue;
  background: url('../../assets/img/bg3.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: $blue;
  background-image: linear-gradient(90deg, $blue 0%, $lightblue 74%);
  border-radius: 20px;
  border: 1px solid $blue;
  color: $white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>