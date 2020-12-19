module.exports = router => {
  require('./routes/users')(router);
  require('./routes/sessions')(router);
  require('./routes/images')(router);
  require('./routes/posts')(router);

  return router;
};