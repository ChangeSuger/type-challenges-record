// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type Without<T extends any[], U extends number | any[], A extends any[] =[]> =
  T extends [infer L, ...infer R]
  ? L extends (U extends any[] ? U[number] : U)
    ? Without<R, U, A>
    : Without<R, U, [...A, L]>
  : A;