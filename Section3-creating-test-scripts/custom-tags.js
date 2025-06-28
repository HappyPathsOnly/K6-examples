import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{page:order}': ['p(95)<250'],
    http_errors: ['count==0'],
    'http_errors{page:order}': ['count==0'],
    checks: ['rate>=0.99'],
    'checks{page:order}': ['rate>=0.99'],
  }
};

let httpErrors = new Counter('http_errors');

export default function () {
  let res = http.get('https://dbe2276de4a14a50be58f8e4d10ddae5.api.mockbin.io/',
    {
      tags: {
        // Custom tag user defined name that is used in the threshold section for a metric
        page: 'order'
      }
    }
  );

  if (res.error) {
  // check errors are generated
  //if (!res.error) {
    httpErrors.add(1, { page: 'order'});
  }

  check(res, { "status is 200": (res) => res.status === 200 },
             { page: 'order'}
            );
  sleep(1);

}  

