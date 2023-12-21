// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]


// ============= Your Code Here =============
type GetStartArr<Arr extends unknown[], Start extends number, T extends unknown[] = []> =
  `${Start}` extends `-${infer N extends number}`
  ? Arr extends [infer L, ...infer R]
    ? Arr['length'] extends N ? T : GetStartArr<R, Start, [...T, L]>
    : T
  : Arr extends [infer L, ...infer R]
    ? T['length'] extends Start ? T : GetStartArr<R, Start, [...T, L]>
    : T

type GetEndArr<Arr extends unknown[], End extends number, T extends unknown[] = []> =
  `${End}` extends `-${infer N extends number}`
  ? Arr extends [infer L, ...infer R]
    ? Arr['length'] extends N ? Arr : GetEndArr<R, End, [...T, L]>
    : Arr
  : Arr extends [infer L, ...infer R]
    ? T['length'] extends End ? Arr : GetEndArr<R, End, [...T, L]>
    : Arr

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length'],
  StartArr extends unknown[] = GetStartArr<Arr, Start>,
  EndArr extends unknown[] = GetEndArr<Arr, End>
> = Arr extends [...StartArr, ...infer S, ...EndArr] ? S : []