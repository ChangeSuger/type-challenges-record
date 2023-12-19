// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============
type Curry<F> =
  F extends (...args: infer A) => infer U
  ? A extends [infer L, ...infer R]
    ? R['length'] extends 0
      ? (arg: L) => U
      : (arg: L) => Curry<(...args: R) => U>
    : () => U
  : never

declare function Currying<F>(fn: F): Curry<F>
