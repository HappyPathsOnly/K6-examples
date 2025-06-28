import http from 'k6/http';
import { sleep, check } from 'k6';
import exec from 'k6/execution'

export const options = {
  vus: 3,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_duration: ['max<4000'],
    http_req_failed: ['rate<0.10'],
    http_reqs: ['count>20'],
    http_reqs: ['rate>1'],
    vus: ['value>2'],
    checks: ['rate>=0.90']

  }
}

export default function () {
  //const res = http.get('https://quickpizza.grafana.com/test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
  const res = http.get('https://quickpizza.grafana.com/test.k6.io/');
  //console.log(res.body);
  console.log(exec.scenario.iterationInTest);
  check(res, { 
    "status is 200": (r) => r.status === 200,
  //  "page is startpage": (r) => r.body.includes('back to the main QuickPizza page') === true 
  });
  sleep(2);
}  

