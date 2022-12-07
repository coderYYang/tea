<template>
  <div class="edit-address">
    <Header>
      <span>{{ isShow ? '添加地址' : '修改地址' }}</span>
    </Header>
    <div class="content">
      <van-address-edit v-if="isShow" :area-list="areaList" show-set-default @save="onAdd" />
      <van-address-edit v-else :area-list="areaList" show-delete show-set-default show-search-result @save="onUpdate"
        @delete="onDelete" :address-info="addressInfo" />
    </div>
  </div>
</template>

<script>
import Header from './child/Header.vue';
import { areaList } from '@vant/area-data';
import { AddAddress, UpdateAddress, DeleteAddress } from '@/api/api';
export default {
  name: 'EditAddress',
  data() {
    return {
      areaList,
      searchResult: [],
      isShow: false,
      addressInfo: {},
    };
  },
  components: { Header },
  created() {
    let key = JSON.parse(this.$route.params.key);
    if (key == 'add') {
      this.isShow = true;
    } else {
      this.addressInfo = key;
      this.addressInfo.isDefault = this.addressInfo.isDefault === 1 ? true : false;
    }
  },
  methods: {
    // 添加地址
    onAdd(content) {
      let data = {
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        addressDetail: content.addressDetail,
        areaCode: content.areaCode,
        isDefault: content.isDefault === true ? 1 : 0,
      };
      AddAddress(data).then((res) => {
        if (res.data.code === 0) {
          this.$router.push('/address');
          this.$success(res.data.message);
        } else {
          this.$error(res.data.message);
        }
      });
    },
    // 修改地址
    onUpdate(content) {
      content.isDefault = content.isDefault === true ? 1 : 0
      UpdateAddress(content).then((res) => {
        if (res.data.code == 0) {
          this.$router.back();
          this.$success(res.data.message);
        } else {
          this.$error(res.data.message);
        }
      });
    },
    // 删除地址
    onDelete(content) {
      let data = {
        id: content.id,
      }
      DeleteAddress(data).then((res) => {
        if (res.data.code == 0) {
          this.$router.back();
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
.edit-address {
  width: 100%;
  height: 100%;

  .content {
    height: calc(100% - 43px);
    background: #f7f7f7;

    .van-address-edit {
      padding: 0;

      /deep/ .van-address-edit__buttons {
        width: 300px;
        margin: 0 auto;

        .van-button {
          background: #b0352f;
        }

        .van-button:nth-child(2) {
          background: #fff;
        }
      }
    }
  }
}
</style>