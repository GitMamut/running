const fetch = require('node-fetch');

const log = require('../../log.js');
const config = require('../../config');
const user = require('../../user.js');

exports.refresh = function () {
  log.info(`Trying to refresh user token...`);

  const accessTokenParameters = new URLSearchParams();
  accessTokenParameters.append('grant_type', 'refresh_token');
  accessTokenParameters.append('client_id', config.CLIENT_ID);
  accessTokenParameters.append('client_secret', config.CLIENT_SECRET);
  accessTokenParameters.append('refresh_token', user.getRefreshToken());

  const tokenRefreshRequest = {
    method: 'POST',
    headers: {
      'Api-Key': config.CLIENT_ID
    },
    body: accessTokenParameters,
  };

  log.info(JSON.stringify(tokenRefreshRequest));
  log.info('Request body: '+ accessTokenParameters.toString());

  return fetch('https://api.ua.com/v7.1/oauth2/uacf/access_token/', tokenRefreshRequest)
  .then(response => {
    log.info(`ua/tokens/refresh response status: ${response.status}`);
    if (response.status != 200) {
      throw new Error(`ua/tokens/refresh response ERROR!`);
    }
    return response.json()
  })
  .then(json => {
    log.info(`ua/tokens/refresh response json: ${JSON.stringify(json)}`);
    const newAccessToken = json.access_token;
    const newRefreshToken = json.refresh_token;
    if (newAccessToken && newRefreshToken) {
      const newTokens = {newAccessToken, newRefreshToken};
      log.info(`New user and access token obtained: ${JSON.stringify(newTokens)}`);
      return newTokens;
    }
    throw new Error(`Could not obtain new tokens!`);
  })
}