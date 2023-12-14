// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type Fibonacci<T extends number, A extends any[] = [0], B extends any[] = [0], C extends any[] = []> =
  A['length'] extends T
  ? T extends 1 ? 1 : B['length']
  : Fibonacci<T, [...A, 0], [...C, ...B], B>
