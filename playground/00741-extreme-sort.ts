// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>,
]


// ============= Your Code Here =============
// Tip: 想要增强排序能力，可以提升比较器的性能，目前的比较器只能实现小范围正整数的排序

// if N1 >= N2 => true
type Comparator<N1 extends number, N2 extends number, T extends 0[] = []> =
  T['length'] extends N1
  ? T['length'] extends N2
    ? true
    : false
  : T['length'] extends N2
    ? true
    : Comparator<N1, N2, [...T, 0]>

type Sort<
  N extends number[],
  D extends boolean = false,
  MN extends number = -1,
  S extends number[] = [],
  T extends number[] = [],
> = N extends [infer L extends number, ...infer R extends number[]]
  ? MN extends -1
    ? Sort<R, D, L, S, T>
    : Comparator<L, MN> extends true
      ? Sort<R, D, L, [...S, MN], T>
      : Sort<R, D, MN, [...S, L], T>
  : MN extends -1
    ? T
    : Sort<S, D, -1, [], D extends true ? [...T, MN] : [MN, ...T]>
