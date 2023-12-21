// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]


// ============= Your Code Here =============
type ParseQueryString<S extends string, U extends Record<string, unknown[]> = {}> =
  S extends `${infer L}&${infer R}`
  ? ParseQueryString<R, QueryString<L, U>>
  : S extends ''
    ? { [k in keyof U]: U[k]['length'] extends 1 ? U[k][0] : U[k] }
    : ParseQueryString<'', QueryString<S, U>>

type QueryString<S extends string, U extends Record<string, unknown[]>> =
  S extends `${infer L}=${infer R}`
  ? AddKeyValue<L, R, U>
  : S extends ''
    ? U
    : AddKeyValue<S, true, U>

type AddKeyValue<K extends string, V extends unknown, U extends Record<string, unknown[]>> =
  K extends keyof U
  ? V extends U[K][number] ? U : Omit<Omit<U, K> & { [k in K]: [...U[K], V] }, never>
  : Omit<U & { [k in K]: [V] }, never>
