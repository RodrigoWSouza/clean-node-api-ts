import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import { hash } from 'bcrypt'
import app from '@/main/config/app'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Authentication Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo-w-s@hotmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on success', async () => {
      const password = await hash('123', 12)
      accountCollection.insertOne({
        name: 'Rodrigo',
        email: 'rodrigo-w-s@hotmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo-w-s@hotmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 if called with invalid credentials', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo-w-s@hotmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
