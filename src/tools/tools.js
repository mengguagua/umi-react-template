let getQueryStringArgs = () => {
  let queryData = '';
  if (location.search) {
    queryData = location.search;
  } else if (location.hash) {
    queryData = '?' + location.hash.split('?')[1];
  }
  let qs = (queryData.length > 0 ? queryData.substring(1) : '');
  let args = [];
  for (let item of qs.split('&').map( kv => kv.split('=') )) {
    let name = decodeURIComponent(item[0]);
    let value = decodeURIComponent(item[1]);
    if (name) {
      args[name] = value;
    }
  }
  return args;
};
function filter(str) { // 特殊字符转义
  str += ''; // 隐式转换
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/\=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
}
function objToParams(paramObj) {
  const data = [];
  for (let attr in paramObj) {
    data.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return data.join('&');
};
export { getQueryStringArgs, objToParams };
