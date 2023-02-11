export default function buildRuleParams(
  protocol: string,
  cidr: string,
  port: number,
  description: string,
) {
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
