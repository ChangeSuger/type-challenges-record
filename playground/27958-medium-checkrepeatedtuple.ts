// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
]


// ============= Your Code Here =============
type CheckRepeatedTuple<T extends unknown[], S extends any[] = []> =
  T extends [infer L, ...infer R]
  ? L extends S[number]
    ? true
    : CheckRepeatedTuple<R, [...S, L]>
  : false

// 想要通过诸如 [1, 2, number, 3] 这种例子的话需要额外做处理
type test = CheckRepeatedTuple<[1, 2, number, 3]>; // true
