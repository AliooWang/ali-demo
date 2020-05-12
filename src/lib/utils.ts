/**
 * 超出隐藏，显示...
 * @param str 
 * @param length 
 * @param showDot 
 */
export const ellipsis = (str: string, length: number, showDot = true) => {
  if (str.length <= length) {
    return str
  } else if (showDot) {
    return str.substr(0, length - 2) + '...'
  } else {
    return str.substr(0, length)
  }
}

/**
 * 异步加载script
 *
 * @param {string} src
 * @param {string} scriptId 必须独特
 * @param {string} [onloadFnName] 链接内传callback时传，最好是独特的
 * @returns
 */
export const loadScript = (src: string, scriptId: string, onloadFnName?: string) => {
  return new Promise((resolve, reject) => {
    const scriptEl = document.getElementById(scriptId)
    if (scriptEl) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.charset = 'utf-8'
    script.id = scriptId
    if (onloadFnName) {
      (window as any)[onloadFnName] = resolve
    } else {
      script.onload = resolve
    }
    script.onerror = reject
    script.src = src
    document.body.appendChild(script)
  })
}

/**
 * @returns {string}
 */
export function createUniqueString(): string {
  const timestamp = +new Date() + ''
  const randomNum = parseInt(((1 + Math.random()) * 65536).toString()) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/** 
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr: any): Array<any> {
  return Array.from(new Set(arr))
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
export function diffArary(arr1: Array<any>, arr2: Array<any>): Array<any> {
  arr1 = uniqueArr(arr1)
  arr2 = uniqueArr(arr2)
  return arr1.concat(arr2).filter(arg => !(arr1.includes(arg)  && arr2.includes(arg)))
}


export const dropUrlOrigin = (str: string) => {
  if (!str) {
    return str || ''
  } else {
    return str.replace(/(https?:)?\/\/[^/]*\//, '/')
  }
}
