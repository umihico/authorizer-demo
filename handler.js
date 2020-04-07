'use strict';

module.exports.auth = (event, context, callback) => {
    let Authorization = event.headers.Authorization;
    if (!Authorization) return callback('Unauthorized');
    let [username, password] = (new Buffer(Authorization.split(' ')[1], 'base64')).toString().split(':');
    if (username === 'admin' && password === 'secret4') {
        callback(null, {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: "*",
                }]
            }
        });
    } else {
        callback('Unauthorized');
    }
};

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
