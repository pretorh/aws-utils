import { EC2 } from '@aws-sdk/client-ec2';
import { S3 } from '@aws-sdk/client-s3';

export const defaultConfig = {
  region: process.env.AWS_REGION || 'eu-west-1',
};

export default {
  EC2,
  S3,
};
