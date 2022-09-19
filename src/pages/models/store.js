// import { useState, useCallback } from 'react'
// export default () => {
//   const [preMenuName, setPreMenuName] = useState('');
//
//   const setPreMenuNameData = useCallback((str) => {
//     setPreMenuName(str)
//   }, []);
//
//   return { preMenuName, setPreMenuNameData }
// }

export default {
  //namespace命名空间，相当于给model取个名字，但是各个model的namespce是不能重复的
  namespace: 'test',
  //state我理解为是数据仓库，就是存数据的地方，model里的数据都是存放在这里的
  state : {
    name: 'wang'
  },
  /*reducers把数据存到仓库（存到state）里的唯一方法，我们修改state里的数据不能直接像this.name='liu'这样去修改，而必须通过调用reducers里的方法，在之后会详细讲到*/
  reducers:{

  },
  /*异步方法，简单来说我们的异步请求就写在这里*/
  effects: {

  },
  /*订阅，在这里我的理解就是监听页面的，比如监听到进入了某某页面就让它执行相关代码之类的*/
  subscriptions: {

  }
}


// import { useState, useCallback } from 'react'
//
// export default function useAuthModel() {
//   const [user, setUser] = useState(null)
//
//   const signin = useCallback((account, password) => {
//     // signin implementation
//     // setUser(user from signin API)
//   }, [])
//
//   const signout = useCallback(() => {
//     // signout implementation
//     // setUser(null)
//   }, [])
//
//   return {
//     user,
//     signin,
//     signout
//   }
// }
