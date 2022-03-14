import { mapActions, mapState } from 'vuex'
export default {
  watch: {
    $route(to) {
      if (to.path.indexOf('/login') === -1) {
        if (Object.keys(this.allCodeEnmus).length <= 0 && Object.keys(this.allConfigEnmus).length <= 0) {
          this.initSysConfig()
            .then(() => {
              // not todo
              // loading.close()
            })
            .catch(err => {
              console.log('initGlobalEnmu-initSysConfig error: ', err)
            })
        }
      }
    }
  },
  methods: {
    ...mapActions({
      initSysConfig: 'allConfig/initSysConfig',
      initConfig: 'allConfig/initConfig'
    })
  },
  computed: {
    ...mapState({
      allCodeEnmus: state => state.allConfig.allCodeEnmus,
      allConfigEnmus: state => state.allConfig.allConfigEnmus
    })
  }
}
