function jsonResponse(req, res, next) {
    const result = res.locals.dbresult;
    const data = {
      Message: (result[0].Error ? 'ERROR' : (result.length > 0 ? 'SUCCESS' : 'FAIL')),
      Status: (result[0].Error ? 0 : 1),
      Error: (result[0].Error ? result[0].Error : ''),
      Data: (result[0].Error ? null : (result.length > 0 ? result : null))
    };
    res.locals.data = data;
    next();
  }

  module.exports = jsonResponse;