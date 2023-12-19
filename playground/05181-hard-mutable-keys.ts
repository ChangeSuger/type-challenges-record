// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]


// ============= Your Code Here =============
type MutableKeys<T extends Record<string, any>> = keyof {
  [k in keyof T as Equal<Pick<T, k>,{ -readonly [p in k]: T[p] }> extends true ? k : never] : T[k]
}
