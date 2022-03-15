import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const serverSuccess = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
