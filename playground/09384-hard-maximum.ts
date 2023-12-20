// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============
type ExcludeNumber<T extends number[], N extends number> =
  T extends [infer L, ...infer R extends number[]]
  ? L extends N
    ? ExcludeNumber<R, N>
    : [L, ...ExcludeNumber<R, N>]
  : []

type Maximum<T extends number[], L extends 0[] = []> =
  T['length'] extends 0
  ? never
  : T['length'] extends 1
    ? T extends [infer L, ...infer _] ? L : never
    : Maximum<ExcludeNumber<T, L['length']>, [...L, 0]>

// 这个写法过不了最大数重复的例子，，
// @ts-expect-error
type test = Expect<Equal<Maximum<[0, 2, 2]>, 2>>