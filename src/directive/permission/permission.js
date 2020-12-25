import store from '@/store'

function checkPermission(el, binding) {
  debugger
  const { value } = binding
  const userPermissions = store.state.user.permissions

  if (value) {
      var a = userPermissions.indexOf(value); // 2
      //没有权限

      if (a <= -1) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    
  } else {
    throw new Error(`need roles! Like v-permission="'admin'"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
