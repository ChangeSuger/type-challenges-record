// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]


// ============= Your Code Here =============
type NumberToLengthArray<N extends number, T extends 0[] = []> =
  T['length'] extends N
  ? T
  : NumberToLengthArray<N, [...T, 0]>

// M => minuend, S => subtrahend
type Subtract<M extends number, S extends number> =
  NumberToLengthArray<M> extends [...NumberToLengthArray<S>, ...infer L]
  ? L['length']
  : never
