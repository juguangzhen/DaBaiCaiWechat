var globalVal = {
  val1: 1
}
function showReminder (title, content, scopeVue) {
  scopeVue.$vux.alert.show({
    title: title || '',
    content: content || ''
  })
  return false
}

export default {
  globalVal,
  showReminder
}
