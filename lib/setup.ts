import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION || 'eu-west-1',
});

export default AWS;
