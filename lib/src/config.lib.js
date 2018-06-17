/**
 * 服务器配置
 *
 * @class ServerConfig
 */
class ServerConfig {
  /**
   * 服务器语言
   *
   * @type {string}
   * @default 'zh'
   * @memberof ServerConfig
   */
  get language () { return this._language }
  set language (val) { this._language = val }

  /**
   * 服务器监听设置
   *
   * @type {listenConfig}
   * @memberof Server
   *
   * @typedef {object} listenConfig 总服务器监听设置
   * @property {string} [host="0.0.0.0"] 总服务器监听地址，默认："0.0.0.0"
   * @property {number|string|number[]|string[]} [port=8080] 总服务器监听端口，默认：8080，可为数组结构，将在负载均衡中逐一匹配
   * @property {independentListenConfig} adminServer 后台独立服务器监听设置
   * @property {independentListenConfig} webServer 前台独立服务器监听设置
   * @property {independentListenConfig} webServer API独立服务器监听设置
   *
   * @typedef {object} independentListenConfig
   * @property {boolean} [enable=false] 是否启用独立服务器，默认：false
   * @property {string} [host="0.0.0.0"] 独立服务器监听地址，默认："0.0.0.0"
   * @property {number|string|number[]|string[]} [port=8080] 独立服务器监听端口，默认：8080，可为数组结构，将在负载均衡中逐一匹配
   */
  get listen () { return this._listen }
  set listen (val) { this._listen = val }

  /**
   * 网站设置
   *
   * @type {websiteConfig}
   * @memberof ServerConfig
   *
   * @typedef {object} websiteConfig
   * @property {string} [name='R136A1'] 网站名称
   * @property {string} [icp=''] ICP备案
   * @property {string} [gwa=''] 公安备案
   * @property {string} [email=''] 站长邮箱
   * @property {string} [analytics=''] 统计代码
   * @property {string} [url=''] 二级域名
   * @property {websiteSEOConfig} seo SEO设定
   *
   * @typedef {object} websiteSEOConfig
   * @property {string} [title=''] SEO标题
   * @property {string[]} [keywords=['R136A1', 'nodejs', 'cmf', 'rest']] SEO关键字
   * @property {string} [description=''] SEO描述
   */
  get website () { return this._website }
  set website (val) { this._website = val }

  constructor (json) {
    this._language = 'zh'
    this._listen = {
      host: '0.0.0.0',
      port: 8080,
      adminServer: { enable: false, host: '0.0.0.0', port: 8081 },
      webServer: { enable: false, host: '0.0.0.0', port: 8082 },
      apiServer: { enable: false, host: '0.0.0.0', port: 8083 }
    }
    this._website = {
      name: 'R136A1',
      icp: '',
      gwa: '',
      email: '',
      analytics: '',
      seo: {
        title: '',
        keywords: ['R136A1', 'nodejs', 'cmf', 'rest'],
        description: ''
      },
      url: ''
    }
  }
}

/** @type {ServerConfig} */
let config = global.__config ? global.__config : new ServerConfig()

export default config
