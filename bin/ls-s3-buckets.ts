#!/usr/bin/env node
import AWS, { defaultConfig } from '../lib/setup.js';

new AWS.S3(defaultConfig).listBuckets({})
  .then(console.log);
