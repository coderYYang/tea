<template>
  <div class="register">
    <LoginHeader>注册</LoginHeader>
    <div class="content">
      <div>
        <input type="text" v-model="userInfo.username" placeholder="请输入用户名">
      </div>
      <div>
        <input type="password" v-model="userInfo.password" placeholder="请输入密码">
      </div>
      <div>
        <input type="password" v-model="userInfo.pwd" placeholder="请确认密码" pattern="[0-9]*">
      </div>
      <div class="register" @click="registerUser">注 册</div>
      <div class="other">
        <span>用户协议</span>
        <span @click="$router.push('/login')">返回登入</span>
      </div>
    </div>
  </div>
</template>

<script>
import LoginHeader from './child/LoginHeader';
import { Register } from '@/api/api';
export default {
  name: 'Register',
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
        pwd: '',
      },
    };
  },
  components: { LoginHeader },
  methods: {
    // 注册用户
    registerUser() {
      if (!this.userInfo.username) return this.$warn('用户名不能为空!');
      if (!/^\w{6,12}$/.test(this.userInfo.password)) return this.$warn('密码不能为空，并且为6-12位');
      if (!this.userInfo.pwd) return this.$warn('确认密码不能为空，并且与上面密码一致');
      if (this.userInfo.password != this.userInfo.pwd) return this.$warn('两次密码不一致!');
      Register(this.userInfo).then((res) => {
        if (res.data.code === 0) {
          this.$router.push('/login');
          this.$success(res.data.message);
        } else {
          this.$error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register {
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

    .register {
      background: #b0352f;
      text-align: center;
      line-height: 40px;
      border-radius: 6px;
    }

    .other {
      display: flex;
      justify-content: space-between;

      span {
        color: #666;
      }
    }
  }
}
</style>

