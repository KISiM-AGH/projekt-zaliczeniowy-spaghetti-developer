const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

const getUserWithoutPassword = (_user) => {
  _user.password = undefined
  return _user
}

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .send('Body does not contain the required parameters.')
    }

    if (await User.findOne({ email })) {
      return res.status(409).send('User with this email address already exist.')
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      guid: uuid(),
    })
    return res.status(200).send(getUserWithoutPassword(user))
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .send('Body does not contain the required parameters.')
    }

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userGuid: user.guid,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '1h',
        }
      )
      user.token = token
      return res.status(200).send(getUserWithoutPassword(user))
    }
    res.status(400).send('Invalid credentials')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
