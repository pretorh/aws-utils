const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION || 'eu-west-1',
});

module.exports = AWS;
