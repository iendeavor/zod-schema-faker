import * as z from 'zod'
import { zodFunctionFaker, ZodFunctionFaker } from '../src/zod-function-faker'
import { expectType, TypeEqual } from 'ts-expect'
import { install } from '../src'

test.skip('ZodFunctionFaker should assert parameters', () => {
  const invalidSchema = void 0 as any
  expect(() => zodFunctionFaker(invalidSchema)).toThrow()
})

test.skip('ZodFunctionFaker should accepts a ZodFunction schema', () => {
  const schema = z.function(z.tuple([z.number(), z.string()]), z.boolean())
  expect(() => zodFunctionFaker(schema)).not.toThrow()
})

test.skip('zodFunctionFaker should return a ZodFunctionFaker instance', () => {
  expect(typeof zodFunctionFaker).toBe('function')

  const schema = z.function(z.tuple([z.number(), z.string()]), z.boolean())
  const faker = zodFunctionFaker(schema)
  expect(faker instanceof ZodFunctionFaker).toBe(true)
})

test.skip('ZodFunctionFaker.fake should be a function', () => {
  const schema = z.function(z.tuple([z.number(), z.string()]), z.boolean())
  const faker = zodFunctionFaker(schema)
  expect(typeof faker.fake).toBe('function')
})

test.skip('ZodFunctionFaker.fake should return function type', () => {
  const schema = z.function(z.tuple([z.number(), z.string()]), z.boolean())
  const faker = zodFunctionFaker(schema)
  expectType<TypeEqual<ReturnType<typeof faker.fake>, (_: number, __: string) => boolean>>(true)
})

test.skip('ZodFunctionFaker.fake should return a valid data', () => {
  install()

  const schema = z.function(z.tuple([z.number(), z.string()]), z.boolean())
  const faker = zodFunctionFaker(schema)
  const data = faker.fake()
  expect(schema.safeParse(data).success).toBe(true)
})
