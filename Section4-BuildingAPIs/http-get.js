import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // GET request to a public API
    let res = http.get('http://localhost:8000/public/crocodiles/');

    // Check if the response is successful
    if (res.status !== 200) {
        console.error('Failed to fetch the get');
    }

    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;


    // Use crocodileId variable in the second GET request
    res = http.get(`http://localhost:8000/public/crocodiles/${crocodileId}/`);

    console.log(res.headers['Content-Type']);

    check(res, {
        'is status 200': (r) => r.status === 200,
        'Crocodile name': (r) => r.json().name === crocodileName,
    });
}
