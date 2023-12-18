// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<99>, 9801>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]


// ============= Your Code Here =============
// $n^2 = n + 2\times\sum_{i=0}^{n-1}i$

type Square<N extends number, A extends any[] = [], B extends any[] = []> =
  `${N}` extends `${'-' | ''}${infer S extends number}`
  ? A['length'] extends S
    ? [...B, ...A]['length']
    : Square<S, [...A, 0], [...B, ...A, ...A]>
  : never

// 局限性，N必须小于一百
// @ts-expect-error
type Test = Square<100>;