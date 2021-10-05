const mongoose = require('mongoose')
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_URL } = process.env
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_DATABASE}?retryWrites=true&w=majority`

exports.connect = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to db')
    })
    .catch((err) => {
      console.log('Connection to db failed')
      console.error(err)
      process.exit(1)
    })
}
