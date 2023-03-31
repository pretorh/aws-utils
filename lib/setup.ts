import AWS from 'aws-sdk';
import { EC2 } from '@aws-sdk/client-ec2';

export const defaultConfig = {
  region: process.env.AWS_REGION || 'eu-west-1',
};

AWS.config.update(defaultConfig);

export default {
  EC2,
  S3: AWS.S3, // replace with v3 client
};
