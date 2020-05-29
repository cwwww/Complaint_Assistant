<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '70%' }"
      @close="close"
    >
      <div class="title" id="title">
        <ul>
          <router-link
            v-for="(route, index) in lists"
            :key="index"
            data-index="0"
            :class="{'active': index === curIndex}"
            class="bigBox"
            :to="{name: route.name}"
            tag="li"
          >
            <!-- <span @click="changeIndex(index)">{{route.title}}</span> -->
          </router-link>
        </ul>
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      curIndex: 0,
      show: true,
      lists: [
        {
          name: "Friend",
          title: "好友列表"
        },
        {
          name: "Bean",
          title: "粉丝列表"
        }
      ]
    };
  },
  props: ["List_show", "broker_id", "robot_id", "token"],
  created() {
    this.show = this.List_show;
  },
  watch: {
    List_show(newValue) {
      this.show = this.newValue;
    }
  },
  mounted() {
    // let name = this.name;
    // if(name == "fensi"){
    //   this.curIndex = 1;
    // }else{
      this.curIndex = 0;
    // }
  },

  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    // showPopup() {
    //   this.show = true;
    // },
    close() {
      this.$emit("ListC", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  > .content {
    width: 100%;
    height: 466px;
    background: rgba(255, 255, 255, 1);
    > img {
      display: block;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      margin-top: -31px;
    }
    .title {
      margin-top: 37px;
      margin-bottom: 34px;
      > ul {
        position: relative;
        display: flex;
        justify-content: space-around;
        padding-left: 108px;
        padding-right: 108px;
        & > li.active {
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: rgba(0, 147, 253, 1);
          position: relative;
          &::after {
            content: "";
            width: 35px;
            height: 3px;
            background: rgba(0, 147, 253, 1);
            border-radius: 2px;
            position: absolute;
            top: 30px;
            left: 13px;
          }
        }
        > .bigBox {
          height: 21px;
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          color: rgba(102, 102, 102, 1);
          line-height: 21px;
        }
      }
    }
  }
}
</style>