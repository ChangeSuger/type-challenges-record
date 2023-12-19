// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type Camele<S extends string> =
  S extends `${infer L}_${infer R}`
  ? `${Lowercase<L>}${Capitalize<Camele<R>>}`
  : Lowercase<S>

type CamelizeArray<T extends any[], U extends any[] = []> =
  T extends [infer L, ...infer R]
  ? CamelizeArray<R, [...U, Camelize<L>]>
  : U

type Camelize<T> = {
  [k in keyof T as k extends string ? Camele<k> : never]: T[k] extends object ? T[k] extends any[] ? CamelizeArray<T[k]> : Camelize<T[k]> : T[k]
}
