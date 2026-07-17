import http from "k6/http";
import { check } from "k6";

const BASE_URL =
  __ENV.BASE_URL || "https://api.tripstack.doomple.com";

const BUS_ID = __ENV.BUS_ID;

export const options = {
  scenarios: {
    seatmap_load: {
      executor: "constant-vus",
      vus: 5,
      duration: "30s",
    },
  },

  thresholds: {
    http_req_duration: [
      "p(95)<2000",
      "p(99)<3000",
    ],

    http_req_failed: [
      "rate<0.01",
    ],

    checks: [
      "rate>0.99",
    ],
  },
};

export default function () {

  const res = http.get(
    `${BASE_URL}/api/buses/${BUS_ID}/seats`
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "seatmap-summary.json":
      JSON.stringify(data, null, 2),

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