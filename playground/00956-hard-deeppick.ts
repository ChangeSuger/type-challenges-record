// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============
type DeepPickWithOneString<T, S extends string> =
  S extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? { [k in keyof T as k extends L ? k : never]: DeepPickWithOneString<T[L], R> }
    : unknown
  : S extends ''
    ? unknown
    : { [k in keyof T as k extends S ? k : never]: T[k] }

type DeepPick<T, S extends string> = (S extends S ? (k: DeepPickWithOneString<T, S>) => void : never) extends (k: infer I) => void ? I : unknown
