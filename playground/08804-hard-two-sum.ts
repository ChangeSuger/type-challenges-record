// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]


// ============= Your Code Here =============
// Step 1: number to length array
type NumbersToArray<T extends number[], A extends 0[] = [], B extends 0[][] = []> =
  T extends [infer L, ...infer R extends number[]]
  ? A['length'] extends L
    ? NumbersToArray<R, [], [...B, A]>
    : NumbersToArray<T, [...A, 0], B>
  : B

// Step 2: first number add one of others to check the sum
type OneAddOne<A extends 0[], B extends 0[][], N extends number> =
  B extends [infer L extends 0[], ...infer R extends 0[][]]
  ? [...A, ...L]['length'] extends N
    ? true
    : OneAddOne<A, R, N>
  : false

type TwoSum<T extends number[], N extends number, A extends 0[][] = NumbersToArray<T>> =
  A extends [infer L extends 0[], ...infer R extends 0[][]]
  ? OneAddOne<L, R, N> extends true
    ? true
    : TwoSum<T, N, R>
  : false
