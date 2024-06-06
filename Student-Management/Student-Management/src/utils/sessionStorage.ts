const getLocalStorage = (key: string) => localStorage.getItem(key)

const setLocalStorage = (key: string, value: any) => {
  const parsedValue = typeof value === 'object' ? JSON.stringify(value) : value
  localStorage.setItem(key, parsedValue as string)
}

const removeLocalStorage = (key: string) => localStorage.removeItem(key)

export { getLocalStorage, setLocalStorage, removeLocalStorage }
