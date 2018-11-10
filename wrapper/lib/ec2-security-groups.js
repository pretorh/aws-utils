const AWS = require('./setup');
const ec2 = new AWS.EC2();

module.exports.findGroupId = async (groupName) => {
  const results = await ec2.describeSecurityGroups().promise();
  const groups = results.SecurityGroups;
  const found = groups.filter((group) => group.GroupName === groupName)[0];
  if (!found) {
    throw new Error('no group found');
  }
  return found.GroupId;
};

module.exports.getIncommingRules = async (groupId) => {
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
};

module.exports.allowIncomming = async (groupId, protocol, cidr, port, description) => {
  const params = {
    GroupId: groupId,
    IpPermissions: [
      buildRuleParams(protocol, cidr, port, description),
    ],
  };
  await ec2.authorizeSecurityGroupIngress(params).promise();
};

module.exports.removeIncomming = async (groupId, protocol, cidr, port, description) => {
  const params = {
    GroupId: groupId,
    IpPermissions: [
      buildRuleParams(protocol, cidr, port, description),
    ],
  };
  await ec2.revokeSecurityGroupIngress(params).promise();
};

module.exports.dumpIncommingRules = async (groupId) => {
  const rules = await module.exports.getIncommingRules();
  rules.forEach((rule) => {
    console.log('%s :%s -> :%s', rule.IpProtocol, rule.FromPort, rule.ToPort);
    rule.IpRanges.forEach((range) => {
      console.log('  %s (%s)', range.CidrIp, range.Description);
    });
  });
};

function buildRuleParams(protocol, cidr, port, description) {
  return {
    IpProtocol: protocol,
    FromPort: port,
    ToPort: port,
    IpRanges: [{
      CidrIp: cidr,
      Description: description,
    }],
  };
}
