import http from 'k6/http';
import { sleep, check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  stages: [
    {
      duration: '2h',
      target: 10000
    },
  ]
};

export default function () {
  // large load check on typically one URL
  let res = http.get('https://quickpizza.grafana.com/test.k6.io');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(2);
}  

