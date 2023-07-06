import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result'
import { Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())

  return makeLogControllerDecorator(controller)
}
