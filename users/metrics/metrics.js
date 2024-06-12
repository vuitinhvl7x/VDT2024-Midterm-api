const client = require("prom-client");
const register = new client.Registry();

// Thu thập các số liệu mặc định
client.collectDefaultMetrics({ register });

// Định nghĩa một số metric tùy chỉnh (tùy chọn)
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [50, 100, 200, 300, 400, 500, 1000],
});

register.registerMetric(httpRequestDurationMicroseconds);

module.exports = {
  register,
  httpRequestDurationMicroseconds,
};
