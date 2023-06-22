import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories/controllers/survey'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
