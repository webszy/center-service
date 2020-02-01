// created by webszy 2020-01-27

const keyNum = obj => Object.keys(obj)
const hasThisProp = val => !['', null, undefined, 'null', 'undefined'].includes(val)
const basicType = type => ['number', 'object', 'array', 'string', 'boolean'].includes(type)
/**
 *
 * vaildator function
 * @function
 * @param {*} data -> req.body
 * @param {*} rules ->[{target:'ONE',required:true,type:'Number'}]
 * @return Boolean
 */
function commonVaildator(data, rules) {
  if (keyNum(data) === 0 || keyNum(rules) === 0) {
    return {
      result: false,
      msg: 'data or rules cannot be empty object'
    }
  }
  for (const k of rules) {
    const item = data[k.target]
    if (k.required === true && !hasThisProp(item)) {
      return {
        result: false,
        msg: `${k.target} is required`
      }
    }
    const type = item.toString().toLowerCase().split(' ')[1].replace(']')
    if (!basicType(type)) {
      return {
        result: false,
        msg: "only allow 'number', 'object', 'array', 'string', 'boolean'"
      }
    } else {
      if (k.type === type) {
        return {
          result: true
        }
      }
    }
  }
}
module.exports = commonVaildator