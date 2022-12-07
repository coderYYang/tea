<template>
  <div class="my">
    <div class="my-header">
      <div v-if="isLogin">
        <van-uploader ref="uploader" :after-read="afterRead" style="display: none;" />
        <img :src="user.avatar == null ? require('../assets/images/bareheaded.jpg') : user.avatar" alt="光头"
          style="width: 70px; height: 70px; border-radius: 50%; border: 1px solid #eee;" @click="changeAvatar">
        <div style="text-align: center; color:#fff;">{{ user.username }}</div>
      </div>
      <div v-else class="login" @click="goLogin">登录/注册</div>
    </div>
    <div class="content">
      <div>
        <div class="title">个人中心</div>
        <ul>
          <li>我的拼团</li>
          <li>我的茶币</li>
          <li>我的收藏</li>
          <li @click="goPath('/address')">地址管理</li>
        </ul>
      </div>
      <div>
        <div class="title">优惠福利</div>
        <ul>
          <li>优惠券</li>
          <li>茶币商城</li>
        </ul>
      </div>
      <div>
        <div class="title">专属服务</div>
        <ul>
          <li>优惠券</li>
        </ul>
      </div>
      <div class="login-back" @click="loginOut">退出登录</div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar';
import { mapState, mapMutations } from 'vuex';
import { UploadAvatar, UserInfo } from '@/api/api'
export default {
  name: 'My',
  data() {
    return {
      user: {},
      showUploadder: false
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => state.user.isLogin,
    }),
  },
  components: { TabBar },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    ...mapMutations(['loginOut']),
    // 跳转登入页面
    goLogin() {
      this.$router.push('/login');
    },
    // 地址管理
    goPath(path) {
      this.$router.push(path);
    },
    // 获取用户信息
    getUserInfo() {
      UserInfo().then(res => {
        if (res.data.code == 0) {
          this.user = res.data.data
        } else {
          this.$error(re)
        }
      })
    },
    // 更换头像
    changeAvatar() {
      let that = this;
      this.$dialog.confirm({
        title: '提示',
        message: that.user.avatar == null ? '是否上传头像!' : '是否更换头像!'
      }).then(() => {
        that.$refs.uploader.chooseFile()
      }).catch(() => {
        this.$toast('取消上传!')
      })
    },
    // 更换头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      UploadAvatar(file).then(res => {
        if (res.data.code == 0) {
          this.getUserInfo()
          this.$success(res.data.message)
        } else {
          this.$error(res.data.message)
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.my {
  width: 100%;
  height: 100%;

  .my-header {
    background: #b0352f;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      font-size: 18px;
      color: #fff;
      background: #f6ab32;
      border-radius: 6px;
      text-align: center;
      padding: 8px;
    }
  }

  .content {
    padding: 20px;

    .title {
      font-size: 18px;
      border-left: 2px solid #1890ff;
      padding: 0 10px;
      margin-top: 10px;
    }

    li {
      padding: 10px 20px 0;
      position: relative;
      display: flex;
      align-items: center;

      &::before {
        position: absolute;
        display: block;
        content: '';
        width: 10px;
        height: 10px;
        border-top: 1px solid #666;
        border-right: 1px solid #666;
        transform: rotate(45deg);
        right: 0;
      }
    }
  }

  .login-back {
    background: #b0352f;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
    margin-top: 20px;
    color: #fff;
  }
}
</style>
