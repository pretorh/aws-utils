#!/usr/bin/env node
import AWS from '../lib/setup.js';

new AWS.S3().listBuckets().promise()
  .then(console.log);
