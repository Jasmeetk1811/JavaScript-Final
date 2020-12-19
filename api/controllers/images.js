const Image = require('../models/image');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

exports.index = async (req, res, next) => {
  try {
    const images = await Image.find();
    const result = images.map(({id, img}) => ({ id, img }));
    res.status(200).json({ images: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {

    const image = await Image.findById(req.params.id);
    res.status(200).json(image);

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {

    const user = await User.findById(req.user._id);

    const image = {
      author: user.name,
      caption: req.body.caption,
      img: {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        contentType: 'image/png'
      },
      date: new Date(),
    }

    const newImage = await Image.create(image);

    res.status(200).json({ message: "Image created!", image: newImage });

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.update = async (res, req, next) => {
  try {
    const { _id, caption, date } = req.body;

    const image = await Image.findOneAndUpdate({ _id: _id }, {
      caption,
      date: new Date(date)
    });

    res.status(200).json({ message: "Post was updated successfully", image });
  } catch (error) {
    next(error);
  }
}

exports.destroy = async (res, req, next) => {
  try {
    const { _id } = req.body;
    await Image.findOneAndDelete({ _id: _id });

    res.status(200).json({ message: "Your Image was deleted successfully" });
  } catch (error) {
    next(error);
  }
}