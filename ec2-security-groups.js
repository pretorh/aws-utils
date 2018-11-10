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
