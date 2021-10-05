const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const auth = require('../middlewares/auth');

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

router.post('/user-posts', auth, async (req, res) => {
  const { userId } = req.body;

  try {
    const posts = await Post.find({ userId });

    res.send(posts);
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/like-post', auth, async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        likes: { $nin: [userId.toString()] },
      },
      { $push: { likes: userId.toString() } },
      { new: true },
    );

    if (!post) {
      throw new Error();
    }

    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

router.post('/dislike-post', auth, async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        likes: { $in: [userId.toString()] },
      },
      { $pull: { likes: userId.toString() } },
      { new: true },
    );

    if (!post) {
      throw new Error();
    }

    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
