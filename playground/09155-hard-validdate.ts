// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]


// ============= Your Code Here =============
type MonthMap = {
  '01': 31;
  '02': 28;
  '03': 31;
  '04': 30;
  '05': 31;
  '06': 30;
  '07': 31;
  '08': 31;
  '09': 30;
  '10': 31;
  '11': 30;
  '12': 31;
}

type DayUnion<M extends keyof MonthMap, L extends 0[] = [0], Less10 extends boolean = true> =
  `${Less10 extends true ? 0 : ''}${L['length']}` | (
    L['length'] extends MonthMap[M]
    ? never
    : DayUnion<M, [...L, 0], Less10 extends true ? [...L, 0]['length'] extends 10 ? false : true : false>
  )

type GetMonth<S extends string> = S extends `${infer L1}${infer L2}${infer _}` ? `${L1}${L2}` extends keyof MonthMap ? `${L1}${L2}` : '' : ''
type GetDay<S extends string> = S extends `${keyof MonthMap}${infer D}` ? D : ''

type ValidDate<T extends string, M = GetMonth<T>, D = GetDay<T>> =
    M extends keyof MonthMap
    ? D extends DayUnion<M>
      ? true
      : false
    : false
