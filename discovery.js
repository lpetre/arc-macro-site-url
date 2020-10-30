let aws = require("aws-sdk");

module.exports = function (path) {
  return new Promise((resolve, reject) => {
    let isLocal = process.env.NODE_ENV === "testing" || process.env.ARC_LOCAL;
    if (isLocal) {
      resolve("http://localhost:3333");
      return;
    }

    let Name = `/${process.env.ARC_CLOUDFORMATION}/site-url`;
    let ssm = new aws.SSM();
    ssm.getParameter({ Name }, function done(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result.Parameter.Value);
      }
    });
  });
};
