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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)[onloadFnName] = resolve
    } else {
      script.onload = resolve
    }
    script.onerror = reject
    script.src = src
    document.body.appendChild(script)
  })
}

export const dropUrlOrigin = (str: string) => {
  if (!str) {
    return str || ''
  } else {
    return str.replace(/(https?:)?\/\/[^/]*\//, '/')
  }
}
