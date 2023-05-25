import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.MONGO_URI)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.PORT, () => console.log(`Server running as http://localhost:${env.PORT}`))
  })
  .catch(console.error)
