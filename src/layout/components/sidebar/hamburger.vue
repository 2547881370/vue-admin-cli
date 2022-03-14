<template>
  <div class="hamburger" @click="toggleClick">
    <img class="img" :class="{ 'is-active': isActive }" :src="hamburgerImg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hamburgerImg: require('@/assets/images/layout/hamburger.png')
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped lang="less">
.hamburger {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(6px, -16px, 0);
  img {
    transition: all 0.2s ease;
    width: 38px;
    cursor: pointer;
  }
}
.is-active {
  transform: rotate(180deg);
}
</style>
