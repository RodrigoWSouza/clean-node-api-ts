import { AddSurveyRepository, LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { AddSurveyModel } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const accountCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await accountCollection.find().toArray()
    return surveys
  }
}
