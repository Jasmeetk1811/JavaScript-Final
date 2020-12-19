const { index, show, create, update, destroy } = require('../controllers/posts');
const passport = require('passport');

module.exports = (router) => {
	router.get('/posts', index);

	router.get('/posts/:id', show);

	router.post('/posts', passport.authenticate('jwt', { session: false }), create);

	router.post('/posts/update', passport.authenticate('jwt', { session: false }), update);

	router.post('/posts/destroy', passport.authenticate('jwt', { session: false }), destroy);
};
