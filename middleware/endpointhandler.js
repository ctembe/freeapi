function endpointHandler(req, res) {
    res.json(res.locals.data);
  }

  module.exports = endpointHandler;