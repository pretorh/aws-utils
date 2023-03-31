import AWS from 'aws-sdk';

export const defaultConfig = {
  region: process.env.AWS_REGION || 'eu-west-1',
};

AWS.config.update(defaultConfig);

export default {
  EC2: AWS.EC2, // replace with v3 client
  S3: AWS.S3, // replace with v3 client
};
