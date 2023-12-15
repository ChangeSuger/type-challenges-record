// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]


// ============= Your Code Here =============
type FindEles<T extends any[], U extends any[] = [], V extends any = never> =
  T extends [infer L, ...infer R]
  ? L extends V
    ? FindEles<R, U, V>
    : L extends R[number]
      ? FindEles<R, U, V | L>
      : FindEles<R, [...U, L], V>
  : U
