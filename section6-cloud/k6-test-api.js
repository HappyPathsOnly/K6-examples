import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from 'k6';

// Note: This script can only be ran locally but the results can be uploaded to Grafana Cloud
//       by using the --o cloud option in the k6 command line
//       e.g. k6 run k6-test-api.js -o cloud 
export const options = {
    stages: [
        {
            duration: '10s',
            target: 5
        },
        {
            duration: '30s',
            target: 5
        },
        {
            duration: '10s',
            target: 5
        }
    ],
    thresholds: {
        http_req_duration: ['p(90)<1250','p(95)<1300'],
        checks: ['rate>=0.99'],
    },
    ext: {
        loadimpact: {
            projectID: 3781415
        }
    }
}

export default function () {

    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    }

    let res = http.post(
        'http://localhost:8000/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 201': (r) => r.status === 201,
        'username': (r) => r.json().username === credentials.username
    });

    sleep(randomIntBetween(0, 5));

    res = http.post(
        'http://localhost:8000/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
           
    check(res, {
        'status is 200': (r) => r.status === 200,
        'has token': (r) => r.json().access !== undefined
    });

    sleep(randomIntBetween(0, 5));

    res = http.get(
        'http://localhost:8000/public/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );


    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(randomIntBetween(0, 5));

    res = http.post(
        'http://localhost:8000/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    const newCrocodileId = res.json().id;

    console.log('New crocodile ID: ' + newCrocodileId);

    sleep(randomIntBetween(0, 5));

    res = http.get(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    if (res.status !== 200){
        console.error('Failed to get single crocodile');
        console.error('status: ' + res.status)
        return;
    }

    sleep(randomIntBetween(0, 5));

    res = http.put(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: 'Updated Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json().name === 'Updated Random croc'
    });

    sleep(randomIntBetween(0, 5));

    res = http.patch(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                sex: 'F'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile sex': (r) => r.json().sex === 'F'
    });

    sleep(randomIntBetween(0, 5));

    res = http.del(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            // This is a way for grafana cloud to understand that it is one request with a paramter
            tags: {
                name: 'DeleteCrocodileURL'
            }
        }
    );

    check(res, {
        'status is 204': (r) => r.status === 204
    });    

    sleep(randomIntBetween(0, 5));
}