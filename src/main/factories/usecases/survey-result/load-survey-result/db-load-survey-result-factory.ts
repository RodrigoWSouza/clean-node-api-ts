import { DbLoadSurveyResult } from '@/data/usecases/load-survey-result'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyMongoRepository, SurveyResultMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
