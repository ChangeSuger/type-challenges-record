// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
]


// ============= Your Code Here =============
type BitwiseArray<
  S1 extends string,
  S2 extends string,
  A1 extends string[] = [],
  A2 extends string[] = [],
  L1 extends string = S1 extends `${infer L1}${infer _}` ? L1 : '',
  R1 extends string = S1 extends `${infer _}${infer R1}` ? R1 : '',
  L2 extends string = S2 extends `${infer L2}${infer _}` ? L2 : '',
  R2 extends string = S2 extends `${infer _}${infer R2}` ? R2 : '',
> = L1 extends ''
  ? L2 extends ''
    ? [A1, A2]
    : BitwiseArray<R1, R2, ['0', ...A1], [...A2, L2]>
  : L2 extends ''
    ? BitwiseArray<R1, R2, [...A1, L1], ['0', ...A2]>
    : BitwiseArray<R1, R2, [...A1, L1], [...A2, L2]>

type XOR<
  T extends [string[], string[]],
  T1 extends string[] = T[0],
  T2 extends string[] = T[1],
> = T1 extends [infer L1, ...infer R1 extends string[]]
  ? T2 extends [infer L2, ...infer R2 extends string[]]
    ? `${L1 extends L2 ? 0 : 1}${XOR<[R1, R2]>}`
    : never
  : ''

type BitwiseXOR<S1 extends string, S2 extends string> = XOR<BitwiseArray<S1, S2>>
