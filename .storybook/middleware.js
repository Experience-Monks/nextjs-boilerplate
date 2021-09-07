const fetch = require('node-fetch');

module.exports = function expressMiddleware(router) {
  router.get('/api', (req, res) => {
    const myHeaders = new fetch.Headers();
    const authHeader = `Basic ${Buffer.from(
      `${process.env?.STORYBOOK_JIRA_USERNAME}:${process.env?.STORYBOOK_JIRA_API_KEY}`
    ).toString('base64')}`;
    myHeaders.append('Authorization', authHeader);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.STORYBOOK_JIRA_API_ENDPOINT}/${req.query?.ticketId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        res.send(result);
      })
      .catch((error) => console.log('error', error));
  });
};
