// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>,
]


// ============= Your Code Here =============
// 实现 Combs
type Combs<T extends string[]> =
  T extends [infer L extends string, ...infer R extends string[]]
  ? R['length'] extends 0
    ? never
    : `${L} ${R[number]}` | Combs<R>
  : never
