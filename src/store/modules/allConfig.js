import * as COMMONAPI from '@/api/common.js'

/**
 * 系统所有的配置/字典
 */
const state = {
  // 日期时间选择器快捷键 时间向前
  datePickerOptions: {
    shortcuts: [
      {
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ],
    disabledDate: time => {
      return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000
    }
  },
  // 日期时间选择器快捷键2 时间向后
  datePickerOptions2: {
    shortcuts: [
      {
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ],
    disabledDate: time => {
      return time.getTime() >= Date.now()
    }
  },
  /** ***************************字典代码枚举*********************************** */
  // 所有类型
  allCodeEnmus: {},
  // 性别
  sexArr: []
}

const mutations = {
  setAllCodeEnmus: (state, value) => {
    state.allCodeEnmus = value
    state.sexArr = value['S_' + '00' + '0001']
  }
}

const actions = {
  /**
   * 加载字典
   */
  getAllCode({ commit }) {
    return new Promise((resolve, reject) => {
      COMMONAPI.getAllCode()
        .then(({ data }) => {
          if (data && data.length > 0) {
            let allCodeEnmus = {}
            data.forEach(e => {
              let key = 'S_' + e.systemCategory + e.codeCategory
              let s = allCodeEnmus[key]
              if (s == null || s == undefined) {
                allCodeEnmus[key] = []
                s = allCodeEnmus[key]
              }
              e.id = e.codeVal
              e.name = e.codeExplain1
              s.push(e)
            })
            commit('setAllCodeEnmus', allCodeEnmus)
            resolve()
          }
        })
        .catch(e => {
          console.log('加载字典代码异常：', e)
          reject(e)
        })
    })
  },

  // 初始化所有的系统字典值/参数
  async initSysConfig({ dispatch }) {
    return new Promise(resolve => {
      let promiseArr = [dispatch('getAllCode')]
      Promise.all(promiseArr).then(() => {
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
