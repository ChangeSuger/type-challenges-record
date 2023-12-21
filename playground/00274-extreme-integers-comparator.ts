// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type ComparatorDigit<A extends number, B extends number, T extends 0[] = []> =
  T['length'] extends A
  ? T['length'] extends B
    ? Comparison.Equal
    : Comparison.Lower
  : T['length'] extends B
    ? Comparison.Greater
    : ComparatorDigit<A, B, [...T, 0]>

type StringToNumberArray<S extends string> =
  S extends `${infer L extends Digit}${infer R}`
  ? [L, ...StringToNumberArray<R>]
  : []

type ComparatorPositive<
  A extends number[],
  B extends number[],
  N extends boolean = false,
  C extends Comparison = ComparatorDigit<A['length'], B['length']>,
  AL extends number = A extends [infer L, ...infer _] ? L : -1,
  AR extends number[] = A extends [infer _, ...infer R] ? R : [],
  BL extends number = B extends [infer L, ...infer _] ? L : -1,
  BR extends number[] = B extends [infer _, ...infer R] ? R : [],
> = C extends Comparison.Equal
  ? AL extends -1
    ? Comparison.Equal
    : ComparatorDigit<AL, BL> extends Comparison.Equal
      ? ComparatorPositive<AR, BR, N, Comparison.Equal>
      : N extends true ? NegativeComparison<ComparatorDigit<AL, BL>> : ComparatorDigit<AL, BL>
  : N extends true ? NegativeComparison<C> :C

type Comparator<A extends number, B extends number> =
  `${A}` extends `-${infer N1}`
  ? `${B}` extends `-${infer N2}`
    ? ComparatorPositive<StringToNumberArray<N1>, StringToNumberArray<N2>, true>
    : Comparison.Lower
  : `${B}` extends `-${infer _}`
    ? Comparison.Greater
    : ComparatorPositive<StringToNumberArray<`${A}`>, StringToNumberArray<`${B}`>>

type NegativeComparison<T extends Comparison> =
  T extends Comparison.Equal
  ? T
  : T extends Comparison.Greater
    ? Comparison.Lower
    : Comparison.Greater