<template>
  <div class="my-slider">
    <div class="my-slider__tooltip" :style="styleLeft">
      <el-button class="my-slider__tooltip-wrapper" size="mini" style="color:#ff0000"> {{ slider[0] }} </el-button>
    </div>
    <div class="my-slider__tooltip" :style="styleRight">
      <el-button class="my-slider__tooltip-wrapper" size="mini" style="color:#ff0000"> {{ slider[1] }} </el-button>
    </div>
    <el-slider v-model="slider" v-bind="$attrs"></el-slider>
  </div>
</template>

<script>
export default {
  name: 'MySlider',
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    slider: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    },
    styleLeft() {
      const length = this.$attrs.max - this.$attrs.min,
        progress = this.slider[0] - this.$attrs.min,
        left = (progress / length) * 100
      return {
        'padding-left': `${left}%`,
        position: 'relative',
        top: '34px'
      }
    },
    styleRight() {
      const length = this.$attrs.max - this.$attrs.min,
        progress = this.slider[1] - this.$attrs.min,
        left = (progress / length) * 100
      return {
        'padding-left': `${left}%`
      }
    }
  },
  props: {
    value: {
      type: Array
    }
  },
  methods: {},
  created() {
    console.log(this.$attrs)
  }
}
</script>

<style lang="less" scoped>
.my-slider {
  .my-slider__tooltip {
    text-align: left;
    .my-slider__tooltip-wrapper {
      height: 32px;
      transform: translateX(-50%);
      top: -50%;
    }
  }
}
</style>
