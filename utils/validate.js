// created by webszy 2020-01-27



const keyNum = obj => Object.keys(obj)
const hasThisProp =val=>!['',null,undefined,'null','undefined'].includes(val)
/**
 *
 * vaildator function
 * @function
 * @param {*} data -> req.body
 * @param {*} rules ->[{target:'ONE',required:true,type:Number}]
 * @return Boolean
 */
export function commonVaildator(data, rules) {
  if (keyNum(data) === 0 || keyNum(rules) === 0) {
    return {
      result:false,
      msg:'data or rules cannot be empty object'
    }
  }
  for (const k of rules) {
    const item = data[k.target]
    if(k.required === true && !hasThisProp(item)){
      return {
        result:false,
        msg:`${k.target}`
      }
    }
  }
}
