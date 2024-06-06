import { v4 as uuid } from 'uuid'

const isEmptyObject = (obj: object): boolean =>
  !obj || (Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)
const uniqueId = (): string => Date.now().toString(36) + uuid()
export { isEmptyObject, uniqueId }
