export function handleSummary(data) {

  return {
    "seatmap-summary.json": JSON.stringify(
      data,
      null,
      2
    ),

    stdout:
      JSON.stringify(
        {
          p95:
            data.metrics.http_req_duration.values["p(95)"],

          p99:
            data.metrics.http_req_duration.values["p(99)"],

          errorRate:
            data.metrics.http_req_failed.values.rate,
        },
        null,
        2
      ),
  };
}