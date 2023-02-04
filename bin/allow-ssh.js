#!/usr/bin/env node
import { publicIpv4 } from 'public-ip';
import * as ec2rules from '../lib/ec2-security-groups.js';

const DESCRIPTION = 'allow incomming ssh from my ip';
const DEFAULT_SSH_GROUP_NAME = process.env.SSH_GROUP_NAME || 'allow ssh';

async function add(groupId) {
  const ip = await publicIpv4();
  console.log('adding rule to allow %s', ip);
  await ec2rules.allowIncomming(groupId, 'tcp', `${ip}/32`, 22, DESCRIPTION);
}

async function removeOld(groupId) {
  const rules = await ec2rules.getIncommingRules(groupId);

  const sshRules = rules.filter((rule) => rule.FromPort === 22 && rule.ToPort === 22);

  const all = sshRules.map((rule) => {
    const ips = rule.IpRanges.filter((range) => range.Description === DESCRIPTION);
    const removeRules = ips.map((ip) => {
      console.log('removing rule for %s', ip.CidrIp);
      return ec2rules.removeIncomming(groupId, 'tcp', ip.CidrIp, 22, DESCRIPTION);
    });
    return Promise.all(removeRules);
  });
  await Promise.all(all);
}

async function perform(action, groupId) {
  if (groupId === undefined) {
    const resolvedGroupId = await ec2rules.findGroupId(DEFAULT_SSH_GROUP_NAME);
    console.log('resolved group "%s" to "%s"', DEFAULT_SSH_GROUP_NAME, groupId);
    return perform(action, resolvedGroupId);
  }

  if (action === 'add' || action === 'a' || !action) {
    return add(groupId)
      .then(() => ec2rules.dumpIncommingRules(groupId));
  }
  if (action === 'remove' || action === 'r') {
    return removeOld(groupId)
      .then(() => ec2rules.dumpIncommingRules(groupId));
  }
  throw new Error(`unknown action ${action}`);
}

perform(process.argv[2], process.argv[3])
  .then(() => process.exit(0))
  .catch((err) => console.error(err.message))
  .then(() => process.exit(1));
