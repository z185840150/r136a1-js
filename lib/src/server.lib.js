import http from 'http'

/**
 * 服务器
 *
 * @class Server
 * @extends {http.Server}
 */
class Server extends http.Server {
  /**
   * 格式化端口
   *
   * @param {string|number} val 端口
   * @returns
   * @memberof Server
   */
  normalizePort (val) {
    const port = parseInt(val, 10)
    return isNaN(port) ? val : port >= 0 ? port : false
  }
}

export default Server
