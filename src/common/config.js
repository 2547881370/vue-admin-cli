/**
 * 通用配置
 */
export const projectAppSysName = `${process.env.VUE_APP_SYS_NAME}`

// 当前系统标识
export const sysCode = {
  appSysName: projectAppSysName
}

/**
 * 初始化系统标识
 */
function initSysCode() {
  sysCode.appSysName = projectAppSysName
}

initSysCode()
