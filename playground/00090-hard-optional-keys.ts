// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]


// ============= Your Code Here =============
// Solution 1
// type OptionalKeys<T> = keyof {
//   [k in keyof T as { [p in k]?: T[p] } extends { [p in k]: T[p] } ? k : never]: 1
// }

// Solution 2
type OptionalKeys<T, U = keyof T> = U extends keyof T ? Partial<Pick<T, U>> extends Pick<T, U> ? U : never : never
