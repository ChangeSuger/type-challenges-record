# Type-Challenges-Record

绘的 TypeScript 类型体操训练记录

题目来源：[type-challenges](https://github.com/type-challenges/type-challenges)

## 练习笔记

### 判断非字母字符

判断单个字符是否为字母

``` ts
type IsLetter<S extends string> = Uppercase<S> extends Lowercase<S> ? false : true

type test1 = IsLetter<'1'>; // false
type test2 = IsLetter<'A'>; // true
type test3 = IsLetter<'&'>; // false
type test4 = IsLetter<'🙂'>; // false
```

### Equal 与交叉类型

以下代码中实现的 `Equal` 类型可以用于判断两个类型是否相等，但交叉类型的判断需要使用 `Omit` 工具函数包装一下才能正常判断

```ts
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

type A = { a: string };
type B = { b: number };
type C = { a: string, b: number };
type D = A & B;

type t1 = D extends C ? true : false; // true
type t2 = C extends D ? true : false; // true
type t3 = Equal<C, D>; // false
type t4 = Equal<C, Omit<D, never>>; // true
```

### 尾调用优化

通过尾调用优化可以提升递归性能

```ts
type Sum<N extends number, T extends 0[] = [], S extends 0[] = []> =
  T['length'] extends N
  ? [...S, ...T]
  : Sum<N, [...T, 0], [...S, ...T]>

type _Sum<N extends number, T extends 0[] = []> =
  T['length'] extends N
  ? T
  : [...T, ..._Sum<N, [...T, 0]>]

type t1 = Sum<100>['length']; // 5050

type t2 = _Sum<48>['length']; // 1176
// @ts-expect-error
type t3 = _Sum<49>['length']
```

### 可相互赋值性质

- 如果两个类型具有相同的必选属性，不具有相同的可选属性，那么这两个类型之间可以相互赋值
- 如果两个类型具有相同的必选属性，且存在同名的可选属性，那么这两个类型之间可以相互赋值的条件是该可选属性的类型之间可以相互赋值

```ts
declare let a: { a: string, b: number }
declare let b: { a: string, b: number, c?: boolean }
declare let c: { a: string, b: number, c?: string }
declare let d: { a: string, b: number, c?: string | (string & '') }

a = b = a
a = c = a
//@ts-expect-error
b = c = b
// @ts-expect-error
b = d = b
c = d = c
```