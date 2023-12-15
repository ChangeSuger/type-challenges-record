// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
// Step 1: Get unique chars
type UniqueChars<S extends string, T extends string[] = [], U extends string = never> =
  S extends `${infer L}${infer R}`
  ? L extends T[number]
    ? UniqueChars<R, T, U | L>
    : UniqueChars<R, [...T, L], U>
  : Exclude<T[number], U>

// Step 2: Find first unique char and then return its index
type FirstUniqueCharIndex<T extends string, S extends any[] = [], U = UniqueChars<T>> =
  T extends `${infer L}${infer R}`
  ? L extends U
    ? S['length']
    : FirstUniqueCharIndex<R, [...S, 0], U>
  : -1
