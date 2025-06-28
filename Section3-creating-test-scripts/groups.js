
import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        //only consider passing requests in the threshold below
        'http_req_duration{expected_response:true}': ['p(95)<250'],
        'group_duration{group:::Main page}' : ['p(95)<900'],
        'group_duration{group:::Main page::Assets}' : ['p(95)<900'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css');
            http.get('https://quickpizza.grafana.com/test.k6.io/static/favicon.ico');
        });
    });

    group('News page', function () {
        http.get('https://quickpizza.grafana.com/news.php');
    });

    sleep(1);
}

