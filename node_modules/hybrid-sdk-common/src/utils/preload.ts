/**
 * 将服务端动态下发的url，根据平台判断是否需要转换为zybhost私有协议
 * 如果一个前端模块需要接入sparta的动态资源预加载，则需要业务方在每次获取到服务端的动态下发url后，经过此函数进行转换
 * @param {sting} url
 */
export function transformCacheUrl (url:string):string {
    return isTransformUrl() ? transformUrl(url) : url
}
  
/**
 * 转换url得到zybhost自定义协议url
 * @param string url
 * www.baidu.com/aaa
 * //www.baidu.com/aaa
 * http://www.baidu.com/aaa
 * https://www.baidu.com/aaa
 * =>
 * zybhost://www.baidu.com/aaa
 */
function transformUrl (url:string):string {
    if (typeof url !== 'string') throw new Error('url must be string')
    const r = url.match(/^(.*\/\/)?(.*)$/)
    return 'zybhost://' + r[2]
}
  
/**
 * 决定是否转换url为zybhost自定义协议
 */
function isTransformUrl ():boolean {
    const isPageEnabled = (getQueryVariable('zybhost') === '1')
    return isPageEnabled
}
  
/**
 * 解析url，查看是否有对应query参数
 * @param {url} variable
 */
function getQueryVariable (param:string):string|boolean {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=')
        if (pair[0] === param) { return pair[1] }
    }
    return false
}
  