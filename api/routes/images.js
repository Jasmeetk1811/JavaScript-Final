const { index, create, show, update, destroy } = require('../controllers/images');
const upload = require('../middlewares');
const passport = require('passport');

module.exports = (router) => {
  router.get('/images', index); // Get all images

  router.get('/images/:id', show); // Get specific image

  router.post('/images',
    upload.single('image'),
    passport.authenticate('jwt', { session: false }),
    create); // Create an image
  
  router.post('/images/update', passport.authenticate('jwt', { session: false }), update);

  router.post('/images/destroy', passport.authenticate('jwt', { session: false }), destroy);

  return router;
};