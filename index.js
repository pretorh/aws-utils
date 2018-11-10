const AWS = require('aws-sdk');

new AWS.S3().listBuckets().promise()
  .then(console.log);
