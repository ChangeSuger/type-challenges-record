// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============
type NumberString<S extends string, N extends number, T extends 0[] = [0]> =
  T['length'] extends N
  ? S
  : `${S}${NumberString<S, N, [...T, 0]>}`

type StringToNumber<S extends string> = S extends `${infer N extends number}` ? N : 1

namespace RLE {
  export type Encode<S extends string, T extends string = '', U extends 0[] = [0]> =
    S extends `${infer L}${infer R}`
    ? L extends T
      ? Encode<R, T, [...U, 0]>
      : `${U['length'] extends 1 ? '' : U['length']}${T}${Encode<R, L, [0]>}`
    : `${U['length'] extends 1 ? '' : U['length']}${T}`
  export type Decode<S extends string, N extends string = ''> =
    S extends `${infer L}${infer R}`
    ? Uppercase<L> extends Lowercase<L>
      ? Decode<R, `${N}${L}`>
      : `${NumberString<L, StringToNumber<N>>}${Decode<R>}`
    : ''
}
