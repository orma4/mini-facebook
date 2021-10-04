const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const auth = require('../middlewares/auth');

router.post('/create', auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const userDetails = await User.findOne({ _id: userId });

    if (userDetails) {
      const author = userDetails.fullName;
      const newPost = new Post({ ...req.body, userId, author });
      const savedPost = await newPost.save();

      if (savedPost) {
        return res.send(savedPost);
      }

      throw new Error();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      return res.send(posts);
    }

    throw new Error();
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
