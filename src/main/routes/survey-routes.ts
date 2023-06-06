import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
