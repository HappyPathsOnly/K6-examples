import http from 'k6/http';
import { sleep, check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let res = http.get('https://quickpizza.grafana.com/test.k6.io');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}

// This runs after all VUs are done
export function handleSummary(data) {
    return {
        'outputSummary.json': JSON.stringify({
            metrics: data.metrics,
            thresholds: data.thresholds,
        }, null, 2),
        'summary.txt': textSummary(data, { indent: ' ', enableColors: false }),
    };
  }
