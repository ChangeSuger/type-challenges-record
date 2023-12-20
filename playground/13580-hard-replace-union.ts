// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null], [Date, Function]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]


// ============= Your Code Here =============
type UnionReplace<T, U extends [any, any][]> =
  U extends [infer L extends [any, any], ...infer R extends [any, any][]]
  ? UnionReplace<
      T extends T ? Equal<T, L[0]> extends true ? L[1] : T : never
      ,R
    >
  : T