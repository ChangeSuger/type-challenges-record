// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]


// ============= Your Code Here =============
type ParseUrl<S extends string, T extends string[] = []> =
  S extends `${infer L}:${infer R}`
  ? ParseUrl<R, [...T, L]>
  : [...T, S]

type Pop<T extends string[]> = T extends [infer _, ...infer R] ? R : []

type ParseUrlParams<T extends string, U extends string[] = ParseUrl<T>, V = Pop<U>[number]> =
  V extends V
  ? V extends `${infer L}/${infer _}`
    ? L
    : V
  : never
