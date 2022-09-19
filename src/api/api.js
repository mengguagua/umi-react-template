// request 是默认实例可直接使用, extend为可配置方法, 传入一系列默认参数, 返回一个新的request实例, 用法与request一致.
import { extend } from 'umi-request';
import { message } from 'antd';

const ajax = extend({
  maxCache: 10, // 最大缓存个数, 超出后会自动清掉按时间最开始的一个.
  // prefix: '/api/v1', // prefix
  // suffix: '.json', // suffix
  errorHandler: (error) => {
    // console.log(error);
    // 集中处理错误
  },
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // 给后端用来校验是不是ajax请求
  },
  params: {
    // hello: 'world'   // 每个请求都要带上的query参数
  }
});

// request拦截器, 改变url 或 options.
ajax.interceptors.request.use((url, options) => {
  return (
    {
      url: `${url}`,
      options: { ...options },
    }
  );
});

// response拦截器, 处理response
ajax.interceptors.response.use(async (response, options) => {
  // debugger;
  let result;
  const data = await response.clone().json();
  // 异常处理根据后端接口规范，做调整
  if (data.status === '-1' || data.status === '500') {
    console.log(data.message);
    message.error(data.message);
  } else if(data.status === '-99') {
    message.error(data.message);
    window.location.href = data.payload;
    return;
  }else {
    result = response;
  }
  return result;
});

export default ajax;
