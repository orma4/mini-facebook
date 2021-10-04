const router = require('express').Router();
const User = require('../models/user');
const passwordValidator = require('password-validator');
const auth = require('../middlewares/auth');

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(6)
  .is()
  .max(20)
  .has()
  .digits(1)
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );

    if (user) {
      const token = await user.generateAuthToken();
      res.status(200).send({ token });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).send('You entered wrong email or password');
  }
});

router.post('/register', async (req, res) => {
  const body = req.body;

  try {
    if (!passwordSchema.validate(body.password)) {
      throw 'The password must contain at least 6 characters, At least 1 number and at least 1 special character.';
    }

    const user = new User(body);
    await user.save();

    if (user) {
      const token = await user.generateAuthToken();

      res.status(200).send({ token });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .send(
          'The email address you provided is already exist in mini-facebook',
        );
    }

    res.status(400).send(err);
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/search', auth, async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const users = await User.find({
      fullName: { $regex: '^' + searchTerm, $options: 'i' },
    }).exec();

    res.send(users);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
