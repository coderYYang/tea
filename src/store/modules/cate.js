import { ADD_CATE, CATE_ALL, UN_CATE_ALL, CATE_ITEM } from "../mutations";
import { Dialog, Notify } from 'vant'
import { DeletedCart } from '../../api/api'

export default {
  state: {
    cateList: [],
    selectList: [], // 选中数据
  },
  getters: {
    // 长度相等表示全选
    isChecked(state) {
      return state.cateList.length === state.selectList.length;
    },
    // 总计
    total(state) {
      let total = {
        num: 0,
        price: 0
      }
      state.cateList.forEach(val => {
        if (val.checked) {
          total.num += parseInt(val.goodsNum);
          total.price += val.goodsPrice * val.goodsNum;
        }
      })
      return total
    }
  },
  mutations: {
    ADD_CATE(state, cateDate) {
      state.cateList = cateDate;
      // state.selectList = cateDate;
      state.selectList = state.cateList.map(val => {
        return val.id
      });
      // cateDate.forEach(val => {
      //   state.selectList.push(val.id);
      // })
    },
    // 全选
    CATE_ALL(state) {
      state.selectList = state.cateList.map(val => {
        val.checked = true;
        return val.id;
      })
    },
    // 全不选
    UN_CATE_ALL(state) {
      state.cateList.forEach(val => {
        val.checked = false;
      })
      state.selectList = [];
    },
    // 单选
    CATE_ITEM(state, index) {
      // 获取当前点击的 id
      let id = state.cateList[index].id;
      // 能不能找到 id
      let i = state.selectList.indexOf(id);
      // 能找到
      if (i > -1) {
        return state.selectList.splice(i, 1);
      }
      state.selectList.push(id);
    },
    // 删除
    delCateList(state) {
      state.cateList = state.cateList.filter(val => {
        return state.selectList.indexOf(val.id) === -1
      })
    }
  },
  actions: {
    checkAllFn({ commit, getters }) {
      getters.isChecked ? commit('UN_CATE_ALL') : commit('CATE_ALL');
    },
    // 删除商品
    delCates({ state, commit }, goodsId) {
      // 没有选中商品就提示
      if (state.selectList.length === 0) return Notify({
        type: 'warning',
        message: '请选择商品！'
      });
      let arrCatr = [];
      Dialog.confirm({
        message: '确定要删除这些商品吗',
      })
        .then(() => {
          if (typeof goodsId == 'number') {
            // 单选
            arrCatr = [goodsId];
            let index = state.cateList.findIndex(val => {
              return val.id == goodsId
            })
            state.cateList.splice(index, 1);
          } else {
            // 多选
            arrCatr = state.selectList;
            commit('delCateList');
            // commit('UN_CATE_ALL')
          }
          let data = {
            goodsId: arrCatr
          }
          DeletedCart(data).then(res => {
            if (res.data.code === 0) {
              Notify({
                type: 'success',
                message: res.data.message
              })
            } else {
              Notify({
                type: 'error',
                message: res.data.message
              })
            }
          })
        }).catch((err) => {
          return Promise.reject(err)
        });
    }
  }
}