const config = require('../config/index.js');
const log = require('../log.js');
const user = require('../user.js')


exports.test = function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  res.status(200).send({ test: 'ok' });

};
