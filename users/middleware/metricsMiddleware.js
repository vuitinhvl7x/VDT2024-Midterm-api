const { httpRequestDurationMicroseconds } = require("../metrics/metrics");

module.exports = (req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    const route = req.route ? req.route.path : req.path;
    end({ method: req.method, route, code: res.statusCode });
  });
  next();
};
