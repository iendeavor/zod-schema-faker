import * as z from 'zod'
import { fake } from './fake'
import { runFake } from './faker'
import { ZodTypeFaker } from './zod-type-faker'

export class ZodArrayFaker<T extends z.ZodArray<any, any>> extends ZodTypeFaker<T> {
  fake(): z.infer<T> {
    let min = this.schema._def.minLength?.value ?? this.schema._def.exactLength?.value ?? 0
    let max =
      this.schema._def.maxLength?.value ??
      this.schema._def.exactLength?.value ??
      runFake(faker => faker.datatype.number({ min, max: min + 2 }))

    return Array(runFake(faker => faker.datatype.number({ min, max })))
      .fill(null)
      .map(() => fake(this.schema._def.type))
  }

  static create<T extends z.ZodArray<any, any>>(schema: T): ZodArrayFaker<T> {
    return new ZodArrayFaker(schema)
  }
}

export const zodArrayFaker = ZodArrayFaker.create
