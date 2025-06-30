import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5, // Number of virtual users
    duration: '20s', // Duration of the test
}

export default function () {

    const credentials = {
        username: 'testuser_' + randomString(8),
        password: 'testpassword' + randomString(8),
    };

    // POST request to a public API
    let res = http.post('http://localhost:8000/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json',
            } 
        }
    ); 

    // Check if the response is successful
    if (res.status !== 201) {
        console.error('Failed to POST new user');
    }
}
