export const setStorageArray = (name, array) => {
  window.localStorage.setItem(name, JSON.stringify(array))
}

export const getStorageArray = (name) => {
  const string = window.localStorage.getItem(name)
  return (string && JSON.parse(string)) || []
}

export const clearStorageArray = (name) => {
  window.localStorage.setItem(name, JSON.stringify([]))
}
