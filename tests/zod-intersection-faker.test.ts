import * as z from 'zod'
import { zodIntersectionFaker, ZodIntersectionFaker } from '../src/zod-intersection-faker'
import { expectType, TypeEqual } from 'ts-expect'
import { install } from '../src'

const Person = z.object({
  name: z.string(),
})
const Employee = z.object({
  role: z.string(),
})

test('ZodIntersectionFaker should assert parameters', () => {
  const invalidSchema = void 0 as any
  expect(() => zodIntersectionFaker(invalidSchema)).toThrow()
})

test('ZodIntersectionFaker should accepts a ZodIntersection schema', () => {
  const schema = z.intersection(Person, Employee)
  expect(() => zodIntersectionFaker(schema)).not.toThrow()
})

test('zodIntersectionFaker should return a ZodIntersectionFaker instance', () => {
  expect(typeof zodIntersectionFaker).toBe('function')

  const schema = z.intersection(Person, Employee)
  const faker = zodIntersectionFaker(schema)
  expect(faker instanceof ZodIntersectionFaker).toBe(true)
})

test('ZodIntersectionFaker.fake should be a function', () => {
  const schema = z.intersection(Person, Employee)
  const faker = zodIntersectionFaker(schema)
  expect(typeof faker.fake).toBe('function')
})

test('ZodIntersectionFaker.fake should return intersection type', () => {
  const schema = z.intersection(Person, Employee)
  const faker = zodIntersectionFaker(schema)
  expectType<TypeEqual<ReturnType<typeof faker.fake>, { name: string } & { role: string }>>(true)
})

test('ZodIntersectionFaker.fake should return a valid data', () => {
  install()

  const schema = z.intersection(Person, Employee)
  const faker = zodIntersectionFaker(schema)
  const data = faker.fake()
  expect(schema.safeParse(data).success).toBe(true)
})
