import http from "k6/http";

const BASE_URL =
  __ENV.BASE_URL || "https://tripstack.doomple.com";

const BUS_ID =
  __ENV.BUS_ID;

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
  },
};

export default function () {

  http.get(
    `${BASE_URL}/api/buses/${BUS_ID}/seats`,
    {
      tags: {
        endpoint: "seatmap",
      },
    }
  );
}