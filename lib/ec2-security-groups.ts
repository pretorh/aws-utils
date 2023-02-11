import AWS from './setup.js';
import buildRuleParams from './util.js';

const ec2 = new AWS.EC2();

export const findGroupId = async (groupName: string) => {
  const results = await ec2.describeSecurityGroups().promise();
  const groups = results.SecurityGroups || [];
  const found = groups.filter((group) => group.GroupName === groupName)[0];
  if (!found) {
    throw new Error('no group found');
  }
  return found.GroupId;
};

export const getIncommingRules = async (groupId: string) => {
  const params = {
    GroupIds: [groupId],
  };
  const results = await ec2.describeSecurityGroups(params).promise();
  const groups = results.SecurityGroups || [];
  const found = groups[0];
  if (!found) {
    throw new Error('no group found');
  }
  return found.IpPermissions;
};

export const allowIncomming = async (
  groupId: string,
  protocol: string,
  cidr: string,
  port: number,
  description: string,
) => {
  const params = {
    GroupId: groupId,
    IpPermissions: [
      buildRuleParams(protocol, cidr, port, description),
    ],
  };
  await ec2.authorizeSecurityGroupIngress(params).promise();
};

export const removeIncomming = async (
  groupId: string,
  protocol: string,
  cidr: string,
  port: number,
  description: string,
) => {
  const params = {
    GroupId: groupId,
    IpPermissions: [
      buildRuleParams(protocol, cidr, port, description),
    ],
  };
  await ec2.revokeSecurityGroupIngress(params).promise();
};

export const dumpIncommingRules = async (groupId: string) => {
  const rules = await getIncommingRules(groupId);
  if (!rules) {
    return;
  }
  rules.forEach((rule) => {
    console.log('%s :%s -> :%s', rule.IpProtocol, rule.FromPort, rule.ToPort);
    if (!rule.IpRanges) {
      return;
    }
    rule.IpRanges.forEach((range) => {
      console.log('  %s (%s)', range.CidrIp, range.Description);
    });
  });
};
