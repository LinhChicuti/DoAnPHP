export const formatDate = (value: string): string => {
  const date = new Date(value)
  let format = 'DD-MM-YYYY'

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  format = format.replace('YYYY', String(year))
  format = format.replace('MM', month)
  format = format.replace('DD', day)

  return format
}
export const formatDateV2 = (value: string): string => {
  const date = new Date(value)
  let format = 'YYYY-MM-DD'

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  format = format.replace('YYYY', String(year))
  format = format.replace('MM', month)
  format = format.replace('DD', day)

  return format
}
