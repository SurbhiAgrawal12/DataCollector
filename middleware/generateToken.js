const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

module.exports = async (req, res, next) => {
  const token = btoa(`${TEST_CLIENT_ID}:${TEST_CLIENT_SECRET}`);
  try {
    const { token_type, access_token } = await request({
      uri: `${ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`
      },
      form: {
        grant_type: 'client_credentials',
        scope: DEFAULT_SCOPE
      }
    });

    if (!!token_type && !!access_token) {
      req.headers.authorization = [token_type, access_token].join(' ');
      next();
    }else throw new Error("Unable to generate token");

  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
};