module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { decoratorsLegacy: true }]],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  }
}
