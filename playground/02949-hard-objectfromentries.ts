// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


// ============= Your Code Here =============
type UnionToIntersection<T extends readonly [string, any]> =
  (T extends T
  ? (k: { [k in T[0]]: T[1] }) => void
  : never) extends (k: infer I) => void ? I : never

type ObjectFromEntries<T extends readonly [any, any]> = Omit<UnionToIntersection<T>, never>
