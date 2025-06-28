import http from 'k6/http';
import { sleep, check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  stages: [
    {
      duration: '5m',
      target: 1000
    },
    {
      // Key parameter here
      duration: '24h',
      target: 1000
    },
    {
      duration: '5m',
      target: 0
    }
  ]
};

export default function () {
  let res = http.get('https://quickpizza.grafana.com/test.k6.io');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(2);
  let res2 = http.get('https://quickpizza.grafana.com/contacts.php');
  check(res2, { "status is 200": (res) => res.status === 200 }); 
  sleep(2);
  let res3 = http.get('https://quickpizza.grafana.com/news.php');
  check(res3, { "status is 200": (res) => res.status === 200 }); 
  sleep(2);
}  

