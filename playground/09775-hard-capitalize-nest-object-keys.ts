// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
type CapitalizeNestObjectKeysInArray<T> =
  T extends [infer L, ...infer R]
  ? [CapitalizeNestObjectKeys<L>, ...CapitalizeNestObjectKeysInArray<R>]
  : []

type CapitalizeNestObjectKeys<T> =
  T extends object
  ? { [k in keyof T as Capitalize<k extends string ? k : never>]: T[k] extends any[] ? CapitalizeNestObjectKeysInArray<T[k]> : T[k] }
  : T
