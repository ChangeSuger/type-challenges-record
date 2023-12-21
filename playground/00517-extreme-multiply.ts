// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// Sum
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

type MultiplyWithDigit<A extends number, B extends string, T extends 0[] = [], N extends string = '0'> =
  T['length'] extends A
  ? N
  : MultiplyWithDigit<A, B, [...T, 0], Sum<N, B>>

type MultiplyHander<A extends number[], B extends string> =
  A extends [...infer L extends number[], infer R extends number]
  // @ts-ignore
  ? Sum<MultiplyWithDigit<R, B>, MultiplyHander<L, B extends '0' ? B :`${B}0`>>
  : '0'

// Multiply
type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = MultiplyHander<NumberArray<A>, `${B}`>
