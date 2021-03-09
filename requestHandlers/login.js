const fetch = require('node-fetch');

const log = require('../log.js');
const config = require('../config');

exports.login = function (req, res) {
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  res.redirect(`https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize/?client_id=${config.CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2FloginSuccess%3Fkey%3D${config.MY_API_KEY}`);
};

exports.success = function (req, res) {
  log.req(req);
  if (req.query.key != config.MY_API_KEY) {
    return res.status(401).send();
  }
  if (req.query.code !== undefined) {
    const accessTokenParameters = new URLSearchParams();
    accessTokenParameters.append('grant_type', 'authorization_code');
    accessTokenParameters.append('client_id', config.CLIENT_ID);
    accessTokenParameters.append('client_secret', config.CLIENT_SECRET);
    accessTokenParameters.append('code', req.query.code);

    fetch('https://api.ua.com/v7.1/oauth2/uacf/access_token/', {
      method: 'POST',
      headers: {
        'Api-Key': config.CLIENT_ID
      },
      body: accessTokenParameters,
    })
    .then(response => response.json())
    .then(json => {
      res.status(200).send(json);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }
};
