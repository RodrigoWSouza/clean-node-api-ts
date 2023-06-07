import { AuthMiddleware } from '@/presentation/middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '@/main/factories/usecases'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
