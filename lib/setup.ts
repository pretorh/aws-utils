import AWS from 'aws-sdk';

export const defaultConfig = {
  region: process.env.AWS_REGION || 'eu-west-1',
};

AWS.config.update(defaultConfig);
export default AWS;
