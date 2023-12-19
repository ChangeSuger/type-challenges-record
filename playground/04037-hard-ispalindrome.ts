// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============
type StringToArray<S extends string> =
  S extends `${infer L}${infer R}`
  ? [L, ...StringToArray<R>]
  : []

type IsPalindrome<T extends string | number, U = StringToArray<`${T}`>> =
  U extends [infer L, ...infer M, infer R]
  ? Equal<L, R> extends true
    ? IsPalindrome<T, M>
    : false
  : true
