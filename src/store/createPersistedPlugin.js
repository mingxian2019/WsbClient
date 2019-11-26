// export default function createPersistedPlugin (options = { key: 'store' }) {
//   return store => {
//     console.log(options.key)
//     // 1. 判断`sessionStorage`中是否有`Vuex`快照
//     let sessionStore = JSON.parse(sessionStorage.getItem(options.key))
//     // 若无，则使用初始值, 否则使用快照的值
//     sessionStore && store.replaceState(sessionStore)
//     sessionStore = null
//     store.subscribe((mutation, state) => {
//       // 3. 动态存储`Vuex`快照至`sessionStorage`中
//       sessionStorage.setItem(options.key, state)
//     })
//   }
// }
