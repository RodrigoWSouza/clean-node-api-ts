import { AddSurveyRepository } from '@/data/protocols'
import { AddSurveyModel } from '@/domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.insertOne(surveyData)
  }
}
