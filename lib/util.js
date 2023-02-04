export default function buildRuleParams(protocol, cidr, port, description) {
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
