// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============
// My solution: From right to left
// Step 1: String to Array
type StringToArray<S extends string> =
  S extends `${infer L}${infer R}`
  ? [L, ...StringToArray<R>]
  : []

// Step 2: BinaryArray to Decimal
type BinaryArrayToDecimal<T extends any[], A extends 0[] = [], B extends '1'[]= []> =
  T extends [...infer L, infer R]
  ? R extends '1'
    ? BinaryArrayToDecimal<[...L, '0', ...B], [...A, 0], []>
    : BinaryArrayToDecimal<L, A, [...B, '1']>
  : A['length']

type BinaryToDecimal<S extends string, T extends any[] = StringToArray<S>> = BinaryArrayToDecimal<T>

// A solution from left to right
// https://github.com/type-challenges/type-challenges/issues/6349
// 迭代次数更少，比我的解法更优

// type BinaryToDecimal<
//   S extends string,
//   R extends any[] = []
// > =
//   S extends `${infer F}${infer L}`?
//     F extends '0'? BinaryToDecimal<L,[...R,...R]>:BinaryToDecimal<L,[...R,...R,1]>
//     :R['length']