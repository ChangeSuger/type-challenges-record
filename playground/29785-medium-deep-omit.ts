// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string; age: {} } }>>,
]


// ============= Your Code Here =============
type DeepOmit<T extends object, S extends string> =
  S extends `${infer L}.${infer R}`
  ? { [k in keyof T]: T[k] extends object ? DeepOmit<T[k], R> : T[k] }
  : { [k in keyof T as k extends S ? never : k]: T[k] }
