import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveySchema,
  surveysSchema,
  addSurveyParamsSchema,
  surveyAnswerSchema,
  signUpParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  surveyResultAnswerSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  signUpParams: signUpParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
