/**
 * @name:log.js
 * @author: SunSeekerX
 * @Date: 2020-04-23 14:43:58
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-23 15:01:04
 */

export function info() {
  console.log(
    '%c wsa: info ',
    'background-color: #409eff;color: #fff;',
    ...arguments
  )
}

export function success() {
  console.log(
    '%c wsa: success ',
    'color: #fff;background-color: #67c23a;',
    ...arguments
  )
}

export function warn() {
  console.log(
    '%c wsa: warn ',
    'color: #fff;background-color: #e6a23c;',
    ...arguments
  )
}

export function error() {
  console.log(
    '%c wsa: error ',
    'color: #fff;background-color: #f56c6c;',
    ...arguments
  )
}
