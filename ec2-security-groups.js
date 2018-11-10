const AWS = require('./lib/setup');
const ec2 = new AWS.EC2();

async function findGroupId(groupName) {
  const results = await ec2.describeSecurityGroups().promise();
  const groups = results.SecurityGroups;
  const found = groups.filter((group) => group.GroupName === groupName)[0];
  if (!found) {
    throw new Error('no group found');
  }
  return found.GroupId;
}

async function getIncommingRules(groupId) {
  const params = {
    GroupIds: [ groupId ],
  };
  const results = await ec2.describeSecurityGroups(params).promise();
  const groups = results.SecurityGroups;
  const found = groups[0];
  if (!found) {
    throw new Error('no group found');
  }
  return found.IpPermissions;
}
