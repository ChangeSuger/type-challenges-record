// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type NumberArray<N extends string | number | bigint> =
  `${N}` extends `${infer L extends number}${infer R}`
  ? [L, ...NumberArray<R>]
  : []

type NumberToLengthArray<N extends number, A extends 0[] = []> =
  A['length'] extends N
  ? A
  : NumberToLengthArray<N, [...A, 0]>

type SumOfTwoDigit<A extends number, B extends number, L = [...NumberToLengthArray<A>, ...NumberToLengthArray<B>]['length']> = L extends number ? L : never

type SumByTwoNumberArray<
  A extends number[],
  B extends number[],
  AddOne extends 0 | 1 = 0,
  NA extends number = A extends [...infer _, infer R] ? R : 0,
  LA extends number[] = A extends [...infer L, infer _] ? L : [],
  NB extends number = B extends [...infer _, infer R] ? R : 0,
  LB extends number[] = B extends [...infer L, infer _] ? L : [],
  S extends number = SumOfTwoDigit<SumOfTwoDigit<NA, NB>, AddOne>,
  IsEnd extends boolean = [...LA, ...LB]['length'] extends 0 ? true : false
> = IsEnd extends true
  ? `${S}`
  : `${S}` extends `1${infer N extends Digit}`
    ? `${SumByTwoNumberArray<LA, LB, 1>}${N}`
    : `${SumByTwoNumberArray<LA, LB, 0>}${S}`

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = SumByTwoNumberArray<
  NumberArray<A>,
  NumberArray<B>
>