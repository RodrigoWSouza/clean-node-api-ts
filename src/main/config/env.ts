export default {
  MONGO_URI: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  PORT: process.env.PORT || 5050,
  JWT_SECRET: process.env.JWT_SECRET || 'hgui876876kjb--78723jhsdif@$$%&*^^%',
  SALT: 12,
  ADMIN_ROLE: 'admin'
}
