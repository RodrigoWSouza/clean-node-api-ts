import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { auth } from '@/main/middlewares'
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController
} from '@/main/factories/controllers/survey-result'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
