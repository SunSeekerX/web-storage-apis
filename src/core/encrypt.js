/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2020-04-23 10:49:08
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-23 14:23:39
 */

export function encrypt(Text) {
  let output = new String()
  const alterText = new Array()
  const varCost = new Array()
  const TextSize = Text.length
  for (let i = 0; i < TextSize; i++) {
    const idea = Math.round(Math.random() * 111) + 77
    alterText[i] = Text.charCodeAt(i) + idea
    varCost[i] = idea
  }
  for (let i = 0; i < TextSize; i++) {
    output += String.fromCharCode(alterText[i], varCost[i])
  }
  return output
}

export function unEncrypt(Text) {
  let output = new String()
  const alterText = new Array()
  const varCost = new Array()
  const TextSize = Text.length
  for (let i = 0; i < TextSize; i++) {
    alterText[i] = Text.charCodeAt(i)
    varCost[i] = Text.charCodeAt(i + 1)
  }
  for (let i = 0; i < TextSize; i = i + 2) {
    output += String.fromCharCode(alterText[i] - varCost[i])
  }
  return output
}
