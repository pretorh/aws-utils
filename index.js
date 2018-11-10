const AWS = require('./lib/setup');

new AWS.S3().listBuckets().promise()
  .then(console.log);
