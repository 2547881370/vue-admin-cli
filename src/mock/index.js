import Mock from 'mockjs'

Mock.setup({
  timeout: '300-600'
})

const modulesFiles = require.context('./modules', true, /\.js$/)
const mockList = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules.push(value.default)
  return modules
}, [])

mockList.forEach(b => {
  for (let key in b) {
    let { template, url, method, state } = b[key]
    if (state) {
      Mock.mock(RegExp(url + '??.*'), method, template())
    }
  }
})

export default Mock
