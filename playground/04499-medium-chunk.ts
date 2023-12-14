// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
type Chunk<T extends any[], N extends number, A extends any[] = [], B extends any[] = []> =
  T extends [infer L, ...infer R]
  ? A['length'] extends N
    ? Chunk<R, N, [L], [...B, A]>
    : Chunk<R, N, [...A, L], B>
  : [...B, A] extends [[]] ? [] : [...B, A];
