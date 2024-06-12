const {
  httpRequestCounter,
  httpRequestDuration,
} = require("../metrics/metrics");

const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    httpRequestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
    end({
      method: req.method,
      route: req.path,
      status_code: res.statusCode.toString(),
    });
  });
  next();
};

module.exports = metricsMiddleware;
