// ============= Test Cases =============
const matrix = [
  [3, 4],
  [5, 6],
  [7, 8],
]

assertArrayIndex(matrix, 'rows')

let sum = 0

for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
  const columns: number[] = matrix[i]

  // @ts-expect-error: number | undefined in not assignable to number
  const x: number[] = matrix[0]

  assertArrayIndex(columns, 'columns')

  for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
    sum += columns[j]

    // @ts-expect-error: number | undefined in not assignable to number
    const y: number = columns[i]

    // @ts-expect-error: number | undefined in not assignable to number
    const z: number = columns[0]

    // @ts-expect-error: number[] | undefined in not assignable to number[]
    const u: number[] = matrix[j]
  }
}

const a: string[] = []

assertArrayIndex(a, 'a')

for (let p = 0 as Index<typeof a>; p < a.length; p += 1) {
  const value: string = a[p]

  // @ts-expect-error: string | undefined is not assignable to string
  const z: string = a[2]
}

a.push('qux')
// @ts-expect-error: number is not assignable to string
a.push(3)

for (const value of a) {
  const other: string = value
}

const b: number[] = []

assertArrayIndex(b, 'b')

for (let p = 0 as Index<typeof a>; p < b.length; p += 1) {
  // @ts-expect-error: number | undefined is not assignable to string
  const value: string = b[p]
}

const c: string[] = []

assertArrayIndex(c, 'c')

for (let p = 0; p < c.length; p += 1) {
  // @ts-expect-error: string | undefined is not assignable to string
  let value: string = c[p]

  // @ts-expect-error: string | undefined is not assignable to string
  value = c[0 as Index<typeof a>]
}

const d: readonly number[] = []

assertArrayIndex(d, 'd')

for (let p = 0 as Index<typeof d>; p < d.length; p += 1) {
  const value: number = d[p]

  // @ts-expect-error: only permits reading
  d[2] = 3
}

// @ts-expect-error: push does not exist on readonly
d.push(3)

const e: [number] = [0]

// @ts-expect-error: [number] is not assignable to never
assertArrayIndex(e, 'e')

const f: readonly [boolean] = [false]

// @ts-expect-error: [boolean] is not assignable to never
assertArrayIndex(f, 'f')

const tuple = [5, 7] as const

// @ts-expect-error: readonly [5, 7] is not assignable to never
assertArrayIndex(tuple, 'tuple')


// ============= Your Code Here =============
// https://github.com/type-challenges/type-challenges/issues/17338

// 构造数组
type BuildArray<N extends number, A extends unknown[] = []> = A['length'] extends N ? A : BuildArray<N, [...A, unknown]>

// 映射字母,用于计算字符串的hash值
type HashMap = {
  a: BuildArray<1>
  b: BuildArray<2>
  c: BuildArray<3>
  d: BuildArray<4>
  e: BuildArray<5>
  f: BuildArray<6>
  g: BuildArray<7>
  h: BuildArray<8>
  i: BuildArray<9>
  j: BuildArray<10>
  k: BuildArray<11>
  l: BuildArray<12>
  m: BuildArray<13>
  n: BuildArray<14>
  o: BuildArray<15>
  p: BuildArray<16>
  q: BuildArray<17>
  r: BuildArray<18>
  s: BuildArray<19>
  t: BuildArray<20>
  u: BuildArray<21>
  v: BuildArray<22>
  w: BuildArray<23>
  x: BuildArray<24>
  y: BuildArray<25>
  z: BuildArray<26>
}

// 将哈希字符串转为哈希值
type Hash<HashString extends string, HashArray extends unknown[] = []> = HashString extends `${infer F extends keyof HashMap}${infer rest}`
  ? Hash<rest, [...HashArray, ...HashMap[F]]>
  : HashArray['length']

// 当HashString不为空时,依次判断每个字符是否符合HashMap的key值
type IsHashKeyHelper<HashString extends string> = HashString extends `${infer F}${infer rest}`
  ? F extends keyof HashMap
    ? IsHashKeyHelper<rest>
    : false
  : true

// 当HashString为空时,返回false
type IsHashKey<HashString extends string> = HashString extends '' ? false : IsHashKeyHelper<HashString>

declare const KEY: unique symbol

// 给数组 A 的类型挂载一个唯一的哈希值symbol => hashKey,以及哈希值对应的数组元素类型,hashKey => A[number]
function assertArrayIndex<A extends readonly unknown[], HashString extends string>(
  array: number extends A['length'] ? A : never, // 判断 A 是否是只读元组,是的话 A['length'] 会返回具体数字,则 array: never
  hashString: IsHashKey<HashString> extends true ? HashString : never, // 判断 hashString 是否是有效的哈希字符串
): asserts array is (number extends A['length']  // 如果 A 是只读元组, 则断言 array 为 never 类型
  ? A &
    { readonly [KEY]: Hash<HashString> } & // 暂存 A 的哈希值, 在 Index 工具函数中取出
    { readonly [hashString in Hash<HashString>]: A[number] } // 访问 A[Index],若 Index 为 hashKey, 则能正确访问
  : never)
  {} // 函数体

// 取出Array的哈希值,作为遍历的索引变量的类型,这样后续访问 A[Index]
type Index<Array extends { readonly [KEY]: number }> = Array[typeof KEY]