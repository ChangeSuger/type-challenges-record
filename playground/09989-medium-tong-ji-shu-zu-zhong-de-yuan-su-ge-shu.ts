// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  }
  >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]


// ============= Your Code Here =============
type Fallen<T extends any[], S extends any[] =[]> =
  T extends [infer L, ...infer R]
  ? L extends any[]
    ? Fallen<[...L, ...R], S>
    : Fallen<R, [...S, L]>
  : S

type Count<T extends any[], U, V extends any[] = []> =
  T extends [infer L, ...infer R]
  ? L extends U
    ? Count<R, U, [...V, 0]>
    : Count<R, U, V>
  : V['length']

type CountElementNumberToObject<T extends any[], S extends any[] = Fallen<T>> = {
  [k in S[number]]: Count<S, k>
}
