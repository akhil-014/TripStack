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
};

export default async function () {
  const page = await browser.newPage();

  try {

    await page.goto(
      'https://tripstack.doomple.com/buses/BUS-BOMDEL-04/seatmap'
    );

    await page.locator('[data-seat]').first().waitFor();

    const metrics = await page.evaluate(() => {
      const nav =
        performance.getEntriesByType('navigation')[0];

      return {
        loadTime: nav.loadEventEnd,
        domContentLoaded: nav.domContentLoadedEventEnd
      };
    });

    console.log(
      `Load Time = ${metrics.loadTime} ms`
    );

    check(metrics.loadTime, {
      'seatmap < 3000ms': (v) => v < 3000,
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