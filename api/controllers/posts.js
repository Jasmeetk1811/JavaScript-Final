const Post = require('../models/post');
const User = require('../models/user');


exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const user = await User.findById(req.user._id);

    const newPost = await Post.create({
      author: user.name,
      title: title,
      content: content
    });

    res.status(200).json({ message: "Post was created successfully", post: newPost });
  } catch (error) {
    next(error);
  }
};


exports.update = async (req, res, next) => {
  try {
    const { _id, title, content } = req.body;
    console.log(req.body);
    const newPost = await Post.findOneAndUpdate({ _id: _id }, {
      title,
      content
    });

    res.status(200).json({ message: "Post was updated successfully", post: newPost });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { _id } = req.body;
    await Post.findOneAndDelete({ _id: _id });

    res.status(200).json({ message: "Your Post was deleted successfully" });
  } catch (error) {
    next(error);
  }
};