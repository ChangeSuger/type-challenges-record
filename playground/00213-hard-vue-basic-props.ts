// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})


// ============= Your Code Here =============
// https://github.com/type-challenges/type-challenges/issues/215
type InferComputed<C extends Record<string, any>> = { [k in keyof C]: ReturnType<C[k]> }

type Prop<T = any> = PropType<T> | { type?: PropType<T> }
type PropType<T> = PropConstructor<T> | PropConstructor<T>[]
type PropConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T }

type InferPropType<P> =
  P extends Prop<infer T>
  ? unknown extends T
    ? any
    : T
  : any

type InferProps<P extends Record<string, any>> = {
  [k in keyof P]: InferPropType<P[k]>
}

declare function VueBasicProps<Props extends Record<string, any>, Data, Computed extends Record<string, any>, Methods, PropsType = InferProps<Props>>(
  options: {
    props?: Props
    data: (this: PropsType) => Data,
    computed: Computed & ThisType<Data & PropsType & InferComputed<Computed> & Methods>,
    methods: Methods & ThisType<Data & PropsType & InferComputed<Computed> & Methods>
  }
): Data & PropsType & InferComputed<Computed> & Methods
