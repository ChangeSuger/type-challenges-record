// ============= Test Cases =============
import type { Equal, Expect, ExpectFalse } from './test-utils'

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    | [any, unknown, never]
    | [unknown, any, never]
    | [unknown, never, any]
    | [any, never, unknown]
    | [never, any, unknown]
    | [never, unknown, any]
  >>,
  Expect<Equal<
    PermutationsOfTuple<[1, number, unknown]>,
    | [1, number, unknown]
    | [1, unknown, number]
    | [number, 1, unknown]
    | [unknown, 1, number]
    | [number, unknown, 1]
    | [unknown, number, 1]
  >>,
  ExpectFalse<Equal<PermutationsOfTuple<[ 1, number, unknown ]>, [unknown]>>,
]


// ============= Your Code Here =============
// https://github.com/type-challenges/type-challenges/issues/29713

type Insert<T extends any[], U extends any> =
  T extends [infer L, ...infer R]
  ? [L, U, ...R] | [L, ...Insert<R, U>]
  : [U]

type PermutationsOfTuple<T extends unknown[], U extends any[] = []> =
  T extends [infer L, ...infer R]
  ? PermutationsOfTuple<R, Insert<U, L> | [L, ...U]>
  : U
