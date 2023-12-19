// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


// ============= Your Code Here =============
type UnionToIntersectionFn<T> = (T extends T ? (k: () => T) => void : never) extends (k: infer I) => void ? I : never

type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer I ? I : never

type UnionToIntersection<U, T = unknown, L = GetUnionLast<U>> =
  [U] extends [never]
  ? T
  : UnionToIntersection<Exclude<U, L>, T & L>
