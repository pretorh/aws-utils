const ec2rules = require('../wrapper/lib/ec2-security-groups');
const publicIp = require('public-ip');

const DESCRIPTION = 'allow incomming ssh from my ip';

async function add(groupId) {
  const ip = await publicIp.v4();
  console.log('adding rule to allow %s', ip);
  await ec2rules.allowIncomming(groupId, 'tcp', `${ip}/32`, 22, DESCRIPTION);
}

async function removeOld(groupId) {
  const rules = await ec2rules.getIncommingRules(groupId);

  const sshRules = rules.filter((rule) => rule.FromPort === 22 && rule.ToPort === 22);

  sshRules.forEach((rule) => {
    const ips = rule.IpRanges.filter((range) => range.Description === DESCRIPTION);
    ips.forEach(async (ip) => {
      console.log('removing rule for %s', ip.CidrIp);
      await ec2rules.removeIncomming(groupId, 'tcp', ip.CidrIp, 22, DESCRIPTION);
    });
  });
}

function perform(action, groupId) {
  if (action === 'a') {
    return add(groupId)
      .then(() => ec2rules.dumpIncommingRules(groupId));
  } else {
    return removeOld(groupId);
  }
}

perform(process.argv[2], process.argv[3])
  .then(() => process.exit(0))
  .catch((err) => console.error(err.message))
  .then(() => process.exit(1));
