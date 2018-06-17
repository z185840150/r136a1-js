import I18n from 'i18n-nodejs'
import path from 'path'

import config from './config.lib'

const lang = config.language

// console.log(!!global.__i18n)
const __i18n = global.__i18n ? global.__i18n : new I18n(lang, path.join(__dirname, './../../config/locale.json'))

if (!global.__i18n) global.__i18n = __i18n

export default function (string, values) {
  return __i18n.__(string, values)
}
