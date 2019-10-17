import Vue from 'vue';
// 自定义全局指令，防止表单重复提交
Vue.directive('dbClick', {
    inserted(el, binding) {
        el.addEventListener('click', e => {
            if (!el.disabled) {
                el.disabled = true;
                let timer = setTimeout(() => {
                    el.disabled = false;
                }, 1000)
            }
        })
    }
})

// 自定义全局指令，保留两位小数，自动补全
// Vue.directive('numberFloat', {
//     inserted(el, binding) {
//       el.addEventListener('blur', e => {
//         let reg = /^(-?\d+)(\.\d+)?$/;
//         if(!reg.test(Number(e.target.value))){
//           return false;
//         } else {
//           e.target.value = Number(e.target.value).toFixed(2)
//          console.log(e.target.value)
//         }
//       })
//     }
//   })
Vue.directive('numberInt', {
    bind: function (el, binding, vnode) {
        const element = el.getElementsByTagName('input')[0]
        const len = binding.arg // 初始化设置 
        // element.value = Number(element.value).toFixed(len) //不需默认值
        // 监听失焦时候格式化
        element.addEventListener('blur', function () {
            if (element.value) {
                if (isNaN(element.value)) {
                    vnode.data.model.callback(element.value)
                } else {
                    vnode.data.model.callback(Number(element.value).toFixed(len))
                }
            }
        })
    }
})