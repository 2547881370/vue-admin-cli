<template>
  <div class="panel-map">
    <gaodeMapComponent ref="gaodeMapComponent" @complete="endLoadingEve" @mapmove="mapmove"></gaodeMapComponent>
    <!--  底部伸缩面板   -->
    <div ref="panelBottom" class="panel-bottom" :class="{ 'panel-focus': !focusStatus }" v-show="bottomTemplateStatus">
      <div class="top">
        <i @click="setFocusStatus" class="el-icon-arrow-down" :class="{ 'el-icon-arrow-down-focus': !focusStatus }"></i>
      </div>
      <div class="open" v-show="focusStatus"><slot name="open"></slot></div>
      <div class="zoom" v-show="!focusStatus"><slot name="zoom"></slot></div>
    </div>

    <!--  左上角伸缩面板  -->
    <div class="panel-left-top" :class="{ 'panel-focus-top': !leftTopFocusStatus }" v-show="leftTemplateStatus">
      <div class="top">
        <i
          @click="setLeftTopFocusStatus"
          class="el-icon-arrow-up"
          :class="{ 'el-icon-arrow-down-focus': !leftTopFocusStatus }"
        ></i>
      </div>
      <slot name="leftPanel"></slot>
    </div>
  </div>
</template>

<script>
import gaodeMapComponent from '@/views/sysmng/class/component/gaodeMapComponent.vue'

import { EventLsbridge } from '@/common/eventLsbridge.js'
export default {
  name: 'panel-map',
  components: { gaodeMapComponent },
  props: {
    // 底部模板显示状态
    bottomTemplateStatus: {
      type: Boolean,
      default: () => true
    },

    // 底部面板缩放时高度
    bottomTemplateZoomHeight: {
      tyoe: Number,
      default: () => 100
    },

    // 底部面板展开时的高度
    bottomTemplateOpenHeight: {
      tyoe: Number,
      default: () => 380
    },

    // 左上角模板显示状态
    leftTemplateStatus: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      // true 展开  false 隐藏
      focusStatus: true,
      leftTopFocusStatus: true
    }
  },
  methods: {
    endLoadingEve: async function() {
      this.$emit('complete', this.map)
    },

    // 地图平移
    mapmove() {
      this.$emit('mapmove')
    },

    // 面板(展开 和 收回) 点击事件
    setFocusStatus() {
      if (this.focusStatus != true) {
        this.setFocusToShow()
      } else {
        this.setFocusToHide()
      }
    },
    // 缩放
    setFocusToHide() {
      if (this.focusStatus != false) {
        this.focusStatus = false
        this.$emit('focus', this.focusStatus)
      }
      this.$refs.panelBottom.style.height = this.bottomTemplateZoomHeight + 'px'
    },
    // 展开
    setFocusToShow() {
      if (this.focusStatus != true) {
        this.focusStatus = true
        this.$emit('focus', this.focusStatus)
      }
      this.$refs.panelBottom.style.height = this.$refs.panelBottom._height + 'px'
    },

    // 左上角面板(展开 和 收回) 点击事件
    setLeftTopFocusStatus() {
      this.leftTopFocusStatus = !this.leftTopFocusStatus
      this.$emit('leftTopFocusStatusFn', this.leftTopFocusStatus)
    },

    initEvent() {
      EventLsbridge.vueOn(EventLsbridge.eventName.handlePanelBottomOpen, () => {
        this.focusStatus = true
      })
      EventLsbridge.vueOn(EventLsbridge.eventName.handlePanelBottomZoom, () => {
        this.focusStatus = false
      })
      EventLsbridge.vueOn(EventLsbridge.eventName.handlePanelTopLeftOpen, () => {
        this.leftTopFocusStatus = true
      })
      EventLsbridge.vueOn(EventLsbridge.eventName.handlePanelTopLeftZoom, () => {
        this.leftTopFocusStatus = false
      })
    },
    destroyEvent() {
      EventLsbridge.vueRemove(EventLsbridge.eventName.handlePanelBottomOpen)
      EventLsbridge.vueRemove(EventLsbridge.eventName.handlePanelBottomZoom)
      EventLsbridge.vueRemove(EventLsbridge.eventName.handlePanelTopLeftOpen)
      EventLsbridge.vueRemove(EventLsbridge.eventName.handlePanelTopLeftZoom)
    }
  },
  beforeDestroy() {
    this.destroyEvent()
  },
  mounted() {
    this.initEvent()
    this.$refs.panelBottom.style.height = this.bottomTemplateOpenHeight + 'px'
    this.$refs.panelBottom._height = this.bottomTemplateOpenHeight
  },
  computed: {
    map() {
      return this.$refs.gaodeMapComponent.map
    }
  }
}
</script>

<style lang="less" scoped>
.panel-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .panel-bottom {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 380px;
    background: rgb(5, 44, 102);
    border: 1px solid #285aaa;
    transition: height 0.2s;
    z-index: 2;

    & > .top {
      width: 50px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 10px;
      z-index: 99;
      i {
        cursor: pointer;
        font-size: 38px;
      }
    }

    .open {
      width: 100%;
      position: absolute;
      height: 100%;
    }

    .zoom {
      width: 100%;
      position: absolute;
      height: 100%;
    }
  }

  .panel-focus-top {
    height: 35px !important;
  }
  .el-icon-arrow-down-focus {
    transform: rotate(-180deg);
  }

  .panel-left-top {
    position: absolute;
    top: 10px;
    left: 10px;
    //width: 25%;
    min-width: 300px;
    background: rgb(5, 44, 102);
    border: 1px solid #285aaa;
    transition: height 0.2s;
    z-index: 2;
    width: 410px;
    //overflow: auto;

    & > .top {
      float: right;
      width: 50px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      position: relative;
      right: 10px;
      z-index: 99;
      i {
        cursor: pointer;
        font-size: 38px;
      }
    }
  }

  .panel-right-top {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 70%;
    min-width: 1100px;
    background: rgb(5, 44, 102);
    border: 1px solid #285aaa;
    transition: height 0.2s;
    z-index: 2;
    overflow: hidden;

    & > .top {
      float: right;
      width: 50px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      position: relative;
      right: 10px;
      z-index: 99;
      i {
        cursor: pointer;
        font-size: 38px;
      }
    }
  }
}
</style>
