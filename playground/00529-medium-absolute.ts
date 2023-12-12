// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]


// ============= Your Code Here =============
type Sign = '-' | '_' | 'n';
type Absolute<T extends number | string | bigint, S extends string = ''> =
  `${T}` extends `${infer L}${infer R}`
  ? Absolute<R, `${S}${L extends Sign ? '' : L}`>
  : S