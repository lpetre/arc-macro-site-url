/**
 * @param {object} arc - the parsed app.arc file currently executing
 * @param {object} cloudformation - the current AWS::Serverless CloudFormation template
 * @param {object} stage - the application stage (one of `staging` or `production`)
 **/
module.exports = function site_url(arc, cfn, stage) {
  // modify cloudformation.Resources here
  cfn.Resources.SiteUrl = {
    Type: "AWS::SSM::Parameter",
    Properties: {
      Type: "String",
      Name: {
        "Fn::Sub": ["/${AWS::StackName}/site-url", {}],
      },
      Value: {
        "Fn::Sub": [
          "https://${ApiId}.execute-api.${AWS::Region}.amazonaws.com",
          { ApiId: { Ref: "HTTP" } },
        ],
      },
    },
  };

  cfn.Resources.SiteUrlPolicy = {
    Type: "AWS::IAM::Policy",
    DependsOn: "Role",
    Properties: {
      PolicyName: `ArcSiteUrlPolicy`,
      PolicyDocument: {
        Statement: [
          {
            Effect: "Allow",
            Action: "ssm:GetParameter",
            Resource: {
              "Fn::Sub": [
                "arn:aws:ssm:${AWS::Region}:${AWS::AccountId}:parameter/${AWS::StackName}/site-url",
                {},
              ],
            },
          },
        ],
      },
      Roles: [{ Ref: "Role" }],
    },
  };

  return cfn;
};
