

// ref: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export function getCookie(key) {
  if (!key) {
    return null
  }

  let data = null
  try {
    data =
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[.+*-]/g, '\\$&;') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
  } catch (e) {
    console.warn('could not get cookie', e)
  }

  return data
}


export function setCookie(key, val = '', expires = 0) {
  try {
    const expiryDate = new Date(1970, 0, 1)
    expiryDate.setSeconds(expires)

    const cookie = []
    cookie.push(`${key}=${encodeURIComponent(val)}`)
    cookie.push(`expires=${expiryDate.toUTCString()}`)

    if (window.location.protocol === 'https:') {
      cookie.push('secure')
    }

    document.cookie = cookie.join(';')
  } catch (e) {
    console.warn('could not set cookie!', e)
  }
}
