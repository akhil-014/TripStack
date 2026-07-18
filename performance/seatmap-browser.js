import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    seatmap_render: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 5,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },

  thresholds: {
    checks: ['rate>0.95'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    const start = Date.now();

    await page.goto(
      'https://tripstack.doomple.com/buses/BUS-BOMDEL-04/seatmap',
      {
        waitUntil: 'networkidle',
      }
    );

    await page.locator('[data-seat]').first().waitFor();

    const renderTime = Date.now() - start;

    console.log(`Seat Map Render Time = ${renderTime} ms`);

    check(renderTime, {
      'seat map render under 3000ms': (t) => t < 3000,
    });

  } finally {
    await page.close();
  }
}

export function handleSummary(data) {
  return {
    'seatmap-summary.json': JSON.stringify(data, null, 2),
  };
}