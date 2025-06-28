import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{status:200}': ['p(95)<1000'],
    'http_req_duration{status:201}': ['p(95)<1000'],

  }
};

export default function () {
  let res = http.get('https://dbe2276de4a14a50be58f8e4d10ddae5.api.mockbin.io/');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);

  res = http.get('https://8983b0e0bb944791a33d5e3e4ad6635e.api.mockbin.io/');
  check(res, { "status is 201": (res) => res.status === 201 });
  sleep(1);

}  

