import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const userCredentials = new SharedArray ('users with credentials', function () {
    let users = JSON.parse(open('./users.json')).users;
    return users;
});

console.log('Number of users with credentials: ' + userCredentials.length);

export default function () {

    userCredentials.forEach((user) => {

        const credentials = {
            // just so tests don't fail due to duplicate usernames
            username: user.username + randomString(5),
            password: user.password,
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
            'status is 201': (r) => r.status === 201
        });
    })
}

