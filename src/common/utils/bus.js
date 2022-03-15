import Vue from 'vue'
export const bus = new Vue()

export const EventLsbridge = {
  eventName: {
    /* 长连接 */
    wsData: 'wsData'
  },
  vueEmit(name, ...obj) {
    bus.$emit(name, obj)
  },
  vueOn(name, fn) {
    bus.$on(name, fn)
  },
  vueRemove(name) {
    bus.$off(name)
  }
}
