// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============
type Combination<T extends string[], S extends string = T[number] | '', A extends string = '', U extends string = S> =
  T extends [infer _, ...infer R extends string[]]
  ? S extends S
    ? Combination<R, Exclude<U, S> | '', `${A}${A extends '' ? '' : S extends '' ? '' : ' '}${S}`>
    : never
  : Exclude<A, ''>
