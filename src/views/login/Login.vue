<template>
  <div class="psd-login">
    <LoginHeader></LoginHeader>
    <div class="content">
      <div>
        <input
          type="text"
          v-model="userInfo.username"
          placeholder="请输入用户名"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="userInfo.password"
          placeholder="请输入密码"
          @keyup.enter="loginPwd"
        />
      </div>
      <div class="login-in" @click="loginPwd">登 录</div>
      <div class="other">
        <div class="other-psd" @click="getPsd">找回密码</div>
        <div class="other-register" @click="$router.push('/register')">
          快速注册
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginHeader from "./child/LoginHeader";

import { Login } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: { LoginHeader },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["LOGIN_IN"]),
    // 密码登录
    loginPwd() {
      if (!this.userInfo.username) return this.$warn("用户名不能为空!");
      if (!/^\w{6,12}$/.test(this.userInfo.password))
        return this.$warn("密码不能为空，并且为6-12位");
      Login(this.userInfo).then((res) => {
        if (res.data.code === 0) {
          // 登入成功，储存用户信息到 vuex
          this.LOGIN_IN(res.data.data);
          this.$router.push("/my");
          this.$success(res.data.message);
        } else {
          this.$error(res.data.message);
        }
      });
    },
    // 找回密码
    getPsd() {
      this.$warn("该功能暂未开放!");
    },
  },
};
</script>

<style lang="less" scoped>
.psd-login {
  height: 100%;

  .content {
    box-sizing: border-box;
    padding: 10px;
    background: #f5f5f5;
    height: calc(100% - 44px);

    div {
      width: 100%;
      height: 40px;
      margin: 20px 0;
      color: #fff;

      input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        border-radius: 6px;
        line-height: 40px;
        background: #fff !important;
        border: 1px solid #ccc;
        background: none;
        outline: none;
        color: #000;

        input:focus {
          border: none;
        }
      }
    }

    .login-in {
      background: #b0352f;
      text-align: center;
      line-height: 40px;
      border-radius: 6px;
    }

    .other {
      display: flex;
      justify-content: space-around;
      margin-top: -20px;

      div {
        color: #666;
      }

      .other-register {
        text-align: right;
      }
    }
  }
}
</style>
