
// 配置参考：https://v2.umijs.org/zh/config/
export default {
  proxy: {
    "/dfw-operation": {
      "target": "http://192.168.180.122:8082/",
      "changeOrigin": true,
      "pathRewrite": { "^/dfw-operation" : "dfw-operation" }
    },
  },
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/login/login', component: '../pages/login/login' },
        { path: '/taxationCheck/taxationCheck', component: '../pages/taxationCheck/taxationCheck' },
        { path: '/taxationCheck/taxationCheckDetail', component: '../pages/taxationCheck/taxationCheckDetail/taxationCheckDetail' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi-app-template',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
