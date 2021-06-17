const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVeriff = async( idToken ) => {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  const {name, email, picture: img} = ticket.getPayload();

  return{name, email, img}
}

module.exports = {
    googleVeriff
}