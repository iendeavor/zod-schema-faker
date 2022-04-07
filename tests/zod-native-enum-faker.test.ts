import * as z from 'zod'
import { zodNativeEnumFaker, ZodNativeEnumFaker } from '../src/zod-native-enum-faker'
import { expectType, TypeEqual } from 'ts-expect'
import { install } from '../src'

enum NativeEnum {
  Foo,
  Bar,
  Baz = 'baz',
  Qux = 'qux',
}

test('ZodNativeEnumFaker should assert parameters', () => {
  const invalidSchema = void 0 as any
  expect(() => zodNativeEnumFaker(invalidSchema)).toThrow()
})

test('ZodNativeEnumFaker should accepts a ZodNativeEnum schema', () => {
  const schema = z.nativeEnum(NativeEnum)
  expect(() => zodNativeEnumFaker(schema)).not.toThrow()
})

test('zodNativeEnumFaker should return a ZodNativeEnumFaker instance', () => {
  expect(typeof zodNativeEnumFaker).toBe('function')

  const schema = z.nativeEnum(NativeEnum)
  const faker = zodNativeEnumFaker(schema)
  expect(faker instanceof ZodNativeEnumFaker).toBe(true)
})

test('ZodNativeEnumFaker.fake should be a function', () => {
  const schema = z.nativeEnum(NativeEnum)
  const faker = zodNativeEnumFaker(schema)
  expect(typeof faker.fake).toBe('function')
})

test('ZodNativeEnumFaker.fake should return nativeEnum type', () => {
  const schema = z.nativeEnum(NativeEnum)
  const faker = zodNativeEnumFaker(schema)
  expectType<TypeEqual<ReturnType<typeof faker.fake>, NativeEnum>>(false)
})

test('ZodNativeEnumFaker.fake should return a valid data', () => {
  install()

  const schema = z.nativeEnum(NativeEnum)
  const faker = zodNativeEnumFaker(schema)
  const data = faker.fake()
  expect(schema.safeParse(data).success).toBe(true)
})

test('numeric enums', () => {
  enum Fruits {
    Apple,
    Banana,
  }
  const schema = z.nativeEnum(Fruits)
  const faker = zodNativeEnumFaker(schema)
  const data = faker.fake()
  expect(schema.safeParse(data).success).toBe(true)
})

test('string enums', () => {
  enum Fruits {
    Cantaloupe, // you can mix numerical and string enums
    Apple = 'apple',
    Banana = 'banana',
  }
  const schema = z.nativeEnum(Fruits)
  const faker = zodNativeEnumFaker(schema)
  const data = faker.fake()
  expect(schema.safeParse(data).success).toBe(true)
})

test('const enums', () => {
  const Fruits = {
    Apple: 'apple',
    Banana: 'banana',
    Cantaloupe: 3,
  } as const

  const schema = z.nativeEnum(Fruits)
  const faker = zodNativeEnumFaker(schema)
  const data = faker.fake()
  expect(schema.safeParse(data).success).toBe(true)
})
