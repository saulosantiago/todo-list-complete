module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/todo-list-backend',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 3001,
  encryption_salt_rounds: process.env.ENCRYPTION_SALT_ROUNDS || 10
}
