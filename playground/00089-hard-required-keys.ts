// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]


// ============= Your Code Here =============
// Solution 1
// type RequiredKeys<T extends object> = keyof {
//   [k in keyof T as { [p in k]: T[p] } extends { [p in k]-?: T[p] } ? k : never]: 1
// }

// Solution 2
type RequiredKeys<T, U = keyof T> = U extends keyof T ? Pick<T, U> extends Required<Pick<T, U>> ? U : never : never